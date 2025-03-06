"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockArticles, type Article, type Barcode } from "@/lib/mock-data";
import { useCategoryHierarchyStore } from "@/lib/stores/category-hierarchy-store";
import { BarcodeManager } from "@/components/barcode-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const articleSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  sku: z
    .string()
    .min(3, { message: "Artikelnummer muss mindestens 3 Zeichen lang sein" }),
  category: z
    .string()
    .min(1, { message: "Bitte wählen Sie eine Kategorie aus" }),
  price: z.coerce.number().positive({ message: "Preis muss positiv sein" }),
  cost: z.coerce.number().positive({ message: "Kosten müssen positiv sein" }),
  stock: z.coerce
    .number()
    .int({ message: "Bestand muss eine ganze Zahl sein" })
    .nonnegative({ message: "Bestand kann nicht negativ sein" }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleDialogProps {
  mode: "add" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: Article;
}

export function ArticleDialog({
  mode,
  open,
  onOpenChange,
  article,
}: ArticleDialogProps) {
  const { categories, getCategoryFullPath } = useCategoryHierarchyStore();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
      imageUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && article) {
      form.reset({
        name: article.name,
        sku: article.sku,
        category: article.category,
        price: article.price,
        cost: article.cost,
        stock: article.stock,
        imageUrl: article.imageUrl || "",
        description: article.description || "",
      });
      setBarcodes(article.barcodes || []);
    } else if (mode === "add") {
      form.reset({
        name: "",
        sku: "",
        category: "",
        price: 0,
        cost: 0,
        stock: 0,
        imageUrl: "",
        description: "",
      });
      setBarcodes([]);
    }
  }, [mode, article, form]);

  // const onSubmit = (data: ArticleFormValues) => {
  //   if (mode === "add") {
  //     const newArticle: Article = {
  //       id: Math.random().toString(36).substring(2, 9),
  //       ...data,
  //       barcodes: barcodes,
  //     }
  //     setArticles([...articles, newArticle])
  //   } else if (mode === "edit" && article) {
  //     setArticles(articles.map((a) => (a.id === article.id ? { ...a, ...data, barcodes: barcodes } : a)))
  //   }

  //   onOpenChange(false)
  // }

  // Flatten categories for the dropdown
  const flattenedCategories = categories
    .map((category) => ({
      id: category.id,
      name: getCategoryFullPath(category.id),
      value: category.value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Neuen Artikel hinzufügen" : "Artikel bearbeiten"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Fügen Sie einen neuen Artikel zu Ihrem Bestand hinzu. Füllen Sie alle erforderlichen Felder aus."
              : "Aktualisieren Sie die Artikelinformationen. Alle Änderungen werden sofort gespeichert."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic">Grunddaten</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="barcodes">Barcodes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Artikelname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artikelnummer</FormLabel>
                      <FormControl>
                        <Input placeholder="Artikelnummer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategorie</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategorie auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {flattenedCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.value}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preis</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kosten</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bestand</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bild-URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://beispiel.de/bild.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Leer lassen, um ein Platzhalterbild zu verwenden
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
                      <Textarea
                        placeholder="Artikelbeschreibung eingeben"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="barcodes">
              <BarcodeManager
                barcodes={barcodes}
                onBarcodesChange={setBarcodes}
                articleId={article?.id || "new"}
              />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit">
              {mode === "add" ? "Artikel hinzufügen" : "Änderungen speichern"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
