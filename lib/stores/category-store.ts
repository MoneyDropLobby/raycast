import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Category {
  id: string
  name: string
  value: string
  description?: string
  color?: string
}

interface CategoryState {
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  removeCategory: (id: string) => void
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [
        { id: "1", name: "Lebensmittel", value: "food", description: "Essbare Produkte", color: "#4CAF50" },
        { id: "2", name: "Getränke", value: "beverage", description: "Flüssige Produkte", color: "#2196F3" },
        { id: "3", name: "Elektronik", value: "electronics", description: "Elektronische Geräte", color: "#FF9800" },
        { id: "4", name: "Kleidung", value: "clothing", description: "Bekleidungsartikel", color: "#9C27B0" },
        { id: "5", name: "Sonstiges", value: "other", description: "Andere Produkte", color: "#607D8B" },
      ],
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      updateCategory: (updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          ),
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        })),
    }),
    {
      name: "category-storage",
    },
  ),
)

