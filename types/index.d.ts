interface Article {
  id: string
  name: string
  sku: string
  barcodes: Barcode[] // Statt eines einzelnen barcode-Strings
  category: string
  price: number
  cost: number
  stock: number
  imageUrl?: string
  description?: string
}

interface Barcode {
  id: string
  code: string
  type: string // z.B. "EAN13", "CODE128", "QR", etc.
  isMain: boolean // Kennzeichnet den Haupt-Barcode
  createdAt: string
}

interface Category {
  id: string
  name: string
  value: string
  description?: string
  color?: string
}

