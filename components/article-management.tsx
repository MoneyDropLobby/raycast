"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticlesTable } from "@/components/articles-table";
import { ArticleDialog } from "@/components/article-dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import { useCategoryHierarchyStore } from "@/lib/stores/category-hierarchy-store";
import { Article } from "@/types/index";

export function ArticleManagement() {
  const { categories, getCategoryFullPath } = useCategoryHierarchyStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleAddArticle = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsEditDialogOpen(true);
  };

  // Flatten categories for the dropdown
  const flattenedCategories = categories
    .map((category) => ({
      id: category.id,
      name: getCategoryFullPath(category.id),
      value: category.value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <DashboardHeader
        heading="Artikelverwaltung"
        description="Fügen Sie Artikel hinzu, bearbeiten und verwalten Sie Ihren Bestand im System."
      >
        <Button onClick={handleAddArticle}>
          <Plus className="mr-2 h-4 w-4" />
          Artikel hinzufügen
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Artikel suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              {flattenedCategories.map((category) => (
                <SelectItem key={category.id} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ArticlesTable
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          onEdit={handleEditArticle}
        />
      </div>
      <ArticleDialog
        mode="add"
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      {currentArticle && (
        <ArticleDialog
          mode="edit"
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          article={currentArticle}
        />
      )}
    </>
  );
}
