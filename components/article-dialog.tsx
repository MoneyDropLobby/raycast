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
import { mockArticles } from "@/lib/mock-data";

const articleSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  sku: z.string().min(3, { message: "SKU must be at least 3 characters" }),
  barcode: z
    .string()
    .min(8, { message: "Barcode must be at least 8 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  cost: z.coerce.number().positive({ message: "Cost must be positive" }),
  stock: z.coerce
    .number()
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
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
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
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
        barcode: article.barcode,
        category: article.category,
        price: article.price,
        cost: article.cost,
        stock: article.stock,
        imageUrl: article.imageUrl || "",
        description: article.description || "",
      });
    } else if (mode === "add") {
      form.reset({
        name: "",
        sku: "",
        barcode: "",
        category: "",
        price: 0,
        cost: 0,
        stock: 0,
        imageUrl: "",
        description: "",
      });
    }
  }, [mode, article, form]);

  const onSubmit = (data: ArticleFormValues) => {
    if (mode === "add") {
      const newArticle: Article = {
        id: Math.random().toString(36).substring(2, 9),
        ...data,
      };
      setArticles([...articles, newArticle]);
    } else if (mode === "edit" && article) {
      setArticles(
        articles.map((a) => (a.id === article.id ? { ...a, ...data } : a))
      );
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Article" : "Edit Article"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new article to your inventory. Fill in all the required fields."
              : "Update the article information. All changes will be saved immediately."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Article name" {...field} />
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
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock keeping unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Barcode number" {...field} />
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
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                    <FormLabel>Price</FormLabel>
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
                    <FormLabel>Cost</FormLabel>
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
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty to use a placeholder image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter article description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === "add" ? "Add Article" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
