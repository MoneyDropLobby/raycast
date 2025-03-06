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

export interface Barcode {
  id: string;
  code: string;
  type: string;
  isMain: boolean;
  createdAt: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    name: "Kaffeetasse",
    sku: "MUG001",
    barcodes: [
      {
        id: "bc1",
        code: "1234567890123",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "beverage",
    price: 12.99,
    cost: 5.5,
    stock: 25,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Keramik-Kaffeetasse, 350ml Fassungsvermögen",
  },
  {
    id: "2",
    name: "T-Shirt",
    sku: "TS001",
    barcodes: [
      {
        id: "bc2",
        code: "2345678901234",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
      {
        id: "bc3",
        code: "2345678901235",
        type: "CODE128",
        isMain: false,
        createdAt: "2023-01-02T12:00:00Z",
      },
    ],
    category: "clothing",
    price: 19.99,
    cost: 8.75,
    stock: 42,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Baumwoll-T-Shirt, in verschiedenen Größen erhältlich",
  },
  {
    id: "3",
    name: "Wireless Mouse",
    sku: "WM001",
    barcodes: [
      {
        id: "bc4",
        code: "3456789012345",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "electronics",
    price: 29.99,
    cost: 15.25,
    stock: 18,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Ergonomic wireless mouse with long battery life",
  },
  {
    id: "4",
    name: "Chocolate Bar",
    sku: "CB001",
    barcodes: [
      {
        id: "bc5",
        code: "4567890123456",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "food",
    price: 3.99,
    cost: 1.5,
    stock: 75,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Premium dark chocolate bar, 100g",
  },
  {
    id: "5",
    name: "Water Bottle",
    sku: "WB001",
    barcodes: [
      {
        id: "bc6",
        code: "5678901234567",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "beverage",
    price: 15.99,
    cost: 7.25,
    stock: 30,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Stainless steel water bottle, 750ml capacity",
  },
  {
    id: "6",
    name: "Notebook",
    sku: "NB001",
    barcodes: [
      {
        id: "bc7",
        code: "6789012345678",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "other",
    price: 8.99,
    cost: 3.75,
    stock: 50,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Hardcover notebook with 200 pages",
  },
  {
    id: "7",
    name: "Headphones",
    sku: "HP001",
    barcodes: [
      {
        id: "bc8",
        code: "7890123456789",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "electronics",
    price: 89.99,
    cost: 45.0,
    stock: 12,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Over-ear wireless headphones with noise cancellation",
  },
  {
    id: "8",
    name: "Protein Bar",
    sku: "PB001",
    barcodes: [
      {
        id: "bc9",
        code: "8901234567890",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "food",
    price: 2.99,
    cost: 1.25,
    stock: 100,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "High protein snack bar, 60g",
  },
  {
    id: "9",
    name: "Desk Lamp",
    sku: "DL001",
    barcodes: [
      {
        id: "bc10",
        code: "9012345678901",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "electronics",
    price: 34.99,
    cost: 18.5,
    stock: 15,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "LED desk lamp with adjustable brightness",
  },
  {
    id: "10",
    name: "Socks",
    sku: "SK001",
    barcodes: [
      {
        id: "bc11",
        code: "0123456789012",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "clothing",
    price: 9.99,
    cost: 4.25,
    stock: 60,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Cotton blend socks, pack of 3 pairs",
  },
  {
    id: "11",
    name: "Energy Drink",
    sku: "ED001",
    barcodes: [
      {
        id: "bc12",
        code: "1234567890124",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "beverage",
    price: 3.49,
    cost: 1.75,
    stock: 48,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Caffeinated energy drink, 250ml",
  },
  {
    id: "12",
    name: "Smartphone Case",
    sku: "SC001",
    barcodes: [
      {
        id: "bc13",
        code: "2345678901235",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "electronics",
    price: 24.99,
    cost: 10.5,
    stock: 35,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Protective case for smartphones, various models available",
  },
  {
    id: "13",
    name: "Granola Bar",
    sku: "GB001",
    barcodes: [
      {
        id: "bc14",
        code: "3456789012346",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "food",
    price: 1.99,
    cost: 0.85,
    stock: 120,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Oats and honey granola bar, 40g",
  },
  {
    id: "14",
    name: "USB Cable",
    sku: "UC001",
    barcodes: [
      {
        id: "bc15",
        code: "4567890123457",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "electronics",
    price: 14.99,
    cost: 6.25,
    stock: 45,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "USB-C to USB-A cable, 2m length",
  },
  {
    id: "15",
    name: "Baseball Cap",
    sku: "BC001",
    barcodes: [
      {
        id: "bc16",
        code: "5678901234568",
        type: "EAN13",
        isMain: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    category: "clothing",
    price: 17.99,
    cost: 7.5,
    stock: 28,
    imageUrl: "/placeholder.svg?height=48&width=48",
    description: "Adjustable cotton baseball cap",
  },
];
