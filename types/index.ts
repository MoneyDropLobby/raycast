import { MwStSatz, Status, VerkaufsEinheit } from "@prisma/client";

export interface Barcode {
  id: string;
  code: string;
  type: string;
  isMain: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  value: string;
  description?: string;
  color?: string;
}

export interface Article {
  id: string;
  name: string;
  sku: string;
  barcodes: Barcode[];
  category: string;
  price: number;
  cost: number;
  stock: number;
  imageUrl: string;
  description: string;
}

export interface ArticleGroup {
  id: string;
  name: string;
  beschreibung?: string | null;
  parentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  children?: ArticleGroup[];
}

export interface ArticleSubGroup extends ArticleGroup {
  parentId: string;
  articles?: Article[];
}

export interface APIResponse {
  success: boolean;
  data?: {};
  error?: {
    message: string;
    code: number;
  };
}
