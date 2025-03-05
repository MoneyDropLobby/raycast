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
import { DashboardShell } from "@/components/dashboard-shell";
import type { Article } from "@/types"; // Import the Article type

export function ArticleManagement() {
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

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Article Management"
        description="Add, edit, and manage your inventory items in the system."
      >
        <Button onClick={handleAddArticle}>
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="beverage">Beverage</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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
    </DashboardShell>
  );
}
