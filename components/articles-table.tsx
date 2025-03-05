"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash2, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatCurrency } from "@/lib/utils";
import { mockArticles } from "@/lib/mock-data";

interface Article {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  imageUrl: string | null;
  category: string;
  price: number;
  stock: number;
}

interface ArticlesTableProps {
  searchQuery: string;
  categoryFilter: string;
  onEdit: (article: Article) => void;
}

export function ArticlesTable({
  searchQuery,
  categoryFilter,
  onEdit,
}: ArticlesTableProps) {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const itemsPerPage = 10;

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.barcode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA, valueB;

    switch (sortColumn) {
      case "name":
        valueA = a.name;
        valueB = b.name;
        break;
      case "sku":
        valueA = a.sku;
        valueB = b.sku;
        break;
      case "price":
        valueA = a.price;
        valueB = b.price;
        break;
      case "stock":
        valueA = a.stock;
        valueB = b.stock;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate articles
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = sortedArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = (article: Article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      setArticles(articles.filter((a) => a.id !== articleToDelete.id));
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("sku")}
                  className="flex items-center"
                >
                  SKU
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="flex items-center"
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("stock")}
                  className="flex items-center"
                >
                  Stock
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <img
                        src={
                          article.imageUrl ||
                          `/placeholder.svg?height=48&width=48`
                        }
                        alt={article.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{article.name}</TableCell>
                  <TableCell>{article.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(article.price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        article.stock > 10
                          ? "success"
                          : article.stock > 0
                          ? "warning"
                          : "destructive"
                      }
                      className="font-medium"
                    >
                      {article.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(article)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(article)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the article &quot;
              {articleToDelete?.name}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
