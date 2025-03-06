"use client";

import React from "react";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  FolderPlus,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryHierarchyStore } from "@/lib/stores/category-hierarchy-store";
import { cn } from "@/lib/utils";

interface HierarchicalCategory {
  id: string;
  name: string;
  value: string;
  description?: string;
  color?: string;
  parentId?: string | null;
}

const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  value: z
    .string()
    .min(2, { message: "Wert muss mindestens 2 Zeichen lang sein" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Wert darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten",
    }),
  description: z.string().optional(),
  color: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryHierarchyManager() {
  const {
    categories,
    addCategory,
    updateCategory,
    removeCategory,
    getCategoryPath,
    getCategoryChildren,
  } = useCategoryHierarchyStore();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<HierarchicalCategory | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<HierarchicalCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<HierarchicalCategory[]>(
    []
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Get current level categories
  const currentCategories = currentParentId
    ? getCategoryChildren(currentParentId)
    : categories.filter((c) => !c.parentId);

  // Filter categories based on search
  const filteredCategories = searchQuery
    ? categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategories;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      value: "",
      description: "",
      color: "#000000",
    },
  });

  const editForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      value: "",
      description: "",
      color: "#000000",
    },
  });

  // Update breadcrumb path when parent changes
  useEffect(() => {
    if (currentParentId) {
      setBreadcrumbPath(getCategoryPath(currentParentId));
    } else {
      setBreadcrumbPath([]);
    }
  }, [currentParentId, getCategoryPath]);

  const handleAddCategory = () => {
    form.reset({
      name: "",
      value: "",
      description: "",
      color: "#000000",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubcategory = (parentCategory: HierarchicalCategory) => {
    setCurrentParentId(parentCategory.id);
    form.reset({
      name: "",
      value: "",
      description: "",
      color: parentCategory.color || "#000000",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditCategory = (category: HierarchicalCategory) => {
    setCurrentCategory(category);
    editForm.reset({
      name: category.name,
      value: category.value,
      description: category.description || "",
      color: category.color || "#000000",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: HierarchicalCategory) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      removeCategory(categoryToDelete.id);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const onAddSubmit = (data: CategoryFormValues) => {
    addCategory({
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      value: data.value,
      description: data.description,
      color: data.color,
      parentId: currentParentId,
    });
    setIsAddDialogOpen(false);
  };

  const onEditSubmit = (data: CategoryFormValues) => {
    if (currentCategory) {
      updateCategory({
        ...currentCategory,
        name: data.name,
        value: data.value,
        description: data.description,
        color: data.color,
      });
      setIsEditDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const navigateToCategory = (categoryId: string) => {
    setCurrentParentId(categoryId);
    setSearchQuery("");
  };

  const navigateUp = () => {
    if (breadcrumbPath.length > 0) {
      const parentCategory = breadcrumbPath[breadcrumbPath.length - 2];
      setCurrentParentId(parentCategory?.id || null);
    } else {
      setCurrentParentId(null);
    }
    setSearchQuery("");
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const hasChildren = (categoryId: string) => {
    return categories.some((c) => c.parentId === categoryId);
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kategorieverwaltung"
        description="Erstellen und verwalten Sie hierarchische Kategorien für Ihre Artikel."
      >
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Kategorie hinzufügen
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        {/* Breadcrumb navigation */}
        <div className="flex items-center space-x-2">
          {currentParentId && (
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={navigateUp}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Zurück
            </Button>
          )}

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentParentId(null);
                  }}
                  className={cn(currentParentId === null ? "font-bold" : "")}
                >
                  Hauptkategorien
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbPath.map((category) => (
                <React.Fragment key={category.id}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCategory(category.id);
                      }}
                      className={cn(
                        currentParentId === category.id ? "font-bold" : "",
                        "max-w-[150px] truncate"
                      )}
                    >
                      {category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Kategorien suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Categories table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Wert</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Farbe</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {hasChildren(category.id) && !searchQuery ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 mr-2"
                            onClick={() => toggleExpand(category.id)}
                          >
                            {expandedCategories[category.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        ) : hasChildren(category.id) ? (
                          <div className="w-8 mr-2" />
                        ) : (
                          <div className="w-8 mr-2" />
                        )}
                        <span
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() => navigateToCategory(category.id)}
                        >
                          {category.name}
                        </span>
                      </div>

                      {/* Expanded subcategories */}
                      {expandedCategories[category.id] && !searchQuery && (
                        <div className="mt-2 ml-8 pl-2 border-l-2 border-gray-200">
                          {getCategoryChildren(category.id).map(
                            (subCategory) => (
                              <div
                                key={subCategory.id}
                                className="py-1 flex items-center"
                              >
                                <span
                                  className="cursor-pointer hover:underline"
                                  onClick={() =>
                                    navigateToCategory(subCategory.id)
                                  }
                                >
                                  {subCategory.name}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.value}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: category.color || "#000000",
                          }}
                        />
                        {category.color || "#000000"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menü öffnen</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleAddSubcategory(category)}
                          >
                            <FolderPlus className="mr-2 h-4 w-4" />
                            Unterkategorie hinzufügen
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCategory(category)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    {searchQuery
                      ? "Keine Kategorien gefunden."
                      : "Keine Kategorien auf dieser Ebene. Fügen Sie eine neue Kategorie hinzu."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentParentId
                ? `Neue Unterkategorie hinzufügen`
                : "Neue Kategorie hinzufügen"}
            </DialogTitle>
            <DialogDescription>
              {currentParentId
                ? `Erstellen Sie eine neue Unterkategorie für "${
                    breadcrumbPath[breadcrumbPath.length - 1]?.name
                  }".`
                : "Erstellen Sie eine neue Hauptkategorie für Ihre Artikel."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Kategoriename" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wert</FormLabel>
                    <FormControl>
                      <Input placeholder="kategorie-wert" {...field} />
                    </FormControl>
                    <FormDescription>
                      Dieser Wert wird in der Datenbank verwendet und sollte
                      eindeutig sein.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beschreibung</FormLabel>
                    <FormControl>
                      <Input placeholder="Kategoriebeschreibung" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farbe</FormLabel>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        {...field}
                        className="w-10 h-10 rounded-md cursor-pointer"
                      />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit">
                  {currentParentId
                    ? "Unterkategorie hinzufügen"
                    : "Kategorie hinzufügen"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kategorie bearbeiten</DialogTitle>
            <DialogDescription>
              Aktualisieren Sie die Informationen der Kategorie.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Kategoriename" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wert</FormLabel>
                    <FormControl>
                      <Input placeholder="kategorie-wert" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beschreibung</FormLabel>
                    <FormControl>
                      <Input placeholder="Kategoriebeschreibung" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farbe</FormLabel>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        {...field}
                        className="w-10 h-10 rounded-md cursor-pointer"
                      />
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit">Änderungen speichern</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Dies wird die Kategorie &quot;{categoryToDelete?.name}&quot;
              {hasChildren(categoryToDelete?.id || "")
                ? " und alle Unterkategorien"
                : ""}{" "}
              dauerhaft löschen. Diese Aktion kann nicht rückgängig gemacht
              werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardShell>
  );
}
