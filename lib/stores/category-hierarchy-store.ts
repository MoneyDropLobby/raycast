import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface HierarchicalCategory {
  id: string
  name: string
  value: string
  description?: string
  color?: string
  parentId?: string | null
  sortOrder?: number
}

interface CategoryHierarchyState {
  categories: HierarchicalCategory[]
  addCategory: (category: HierarchicalCategory) => void
  updateCategory: (category: HierarchicalCategory) => void
  removeCategory: (id: string) => void
  getCategoryPath: (categoryId: string) => HierarchicalCategory[]
  getCategoryChildren: (categoryId: string) => HierarchicalCategory[]
  getCategoryFullPath: (categoryId: string) => string
  reorderCategories: (categories: HierarchicalCategory[]) => void
}

export const useCategoryHierarchyStore = create<CategoryHierarchyState>()(
  persist(
    (set, get) => ({
      categories: [
        { id: "1", name: "Bistro", value: "bistro", description: "Bistro-Produkte", color: "#4CAF50", sortOrder: 0 },
        {
          id: "2",
          name: "Kleinbrot",
          value: "kleinbrot",
          description: "Kleinbrot-Produkte",
          color: "#2196F3",
          parentId: "1",
          sortOrder: 0,
        },
        {
          id: "3",
          name: "Brötchen",
          value: "broetchen",
          description: "Verschiedene Brötchen",
          color: "#FF9800",
          parentId: "2",
          sortOrder: 0,
        },
        {
          id: "4",
          name: "Baguette",
          value: "baguette",
          description: "Baguette-Produkte",
          color: "#9C27B0",
          parentId: "2",
          sortOrder: 1,
        },
        {
          id: "5",
          name: "Getränke",
          value: "getraenke",
          description: "Getränke-Produkte",
          color: "#607D8B",
          parentId: "1",
          sortOrder: 1,
        },
        {
          id: "6",
          name: "Kaffee",
          value: "kaffee",
          description: "Kaffee-Produkte",
          color: "#795548",
          parentId: "5",
          sortOrder: 0,
        },
        {
          id: "7",
          name: "Kaltgetränke",
          value: "kaltgetraenke",
          description: "Kaltgetränke-Produkte",
          color: "#00BCD4",
          parentId: "5",
          sortOrder: 1,
        },
        {
          id: "8",
          name: "Backwaren",
          value: "backwaren",
          description: "Backwaren-Produkte",
          color: "#FF5722",
          sortOrder: 1,
        },
        {
          id: "9",
          name: "Brot",
          value: "brot",
          description: "Brot-Produkte",
          color: "#8BC34A",
          parentId: "8",
          sortOrder: 0,
        },
        {
          id: "10",
          name: "Kuchen",
          value: "kuchen",
          description: "Kuchen-Produkte",
          color: "#FFC107",
          parentId: "8",
          sortOrder: 1,
        },
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

      removeCategory: (id) => {
        const state = get()
        // Get all descendant category IDs
        const descendantIds = getDescendantIds(state.categories, id)
        // Remove the category and all its descendants
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id && !descendantIds.includes(category.id)),
        }))
      },

      getCategoryPath: (categoryId) => {
        const state = get()
        const path: HierarchicalCategory[] = []
        let currentId: string | null | undefined = categoryId

        while (currentId) {
          const category = state.categories.find((c) => c.id === currentId)
          if (category) {
            path.unshift(category)
            currentId = category.parentId
          } else {
            currentId = null
          }
        }

        return path
      },

      getCategoryChildren: (categoryId) => {
        const state = get()
        return state.categories
          .filter((c) => c.parentId === categoryId)
          .sort((a, b) => {
            // Sort by sortOrder if available, otherwise by name
            if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
              return a.sortOrder - b.sortOrder
            }
            return a.name.localeCompare(b.name)
          })
      },

      getCategoryFullPath: (categoryId) => {
        const state = get()
        const path = state.getCategoryPath(categoryId)
        return path.map((c) => c.name).join(" > ")
      },

      reorderCategories: (updatedCategories) => {
        set((state) => {
          // Create a map of the updated categories for easy lookup
          const updatedMap = new Map(updatedCategories.map((cat) => [cat.id, cat]))

          // Update only the categories that were reordered, leave others unchanged
          return {
            categories: state.categories.map((cat) => {
              const updated = updatedMap.get(cat.id)
              return updated ? { ...cat, sortOrder: updated.sortOrder } : cat
            }),
          }
        })
      },
    }),
    {
      name: "category-hierarchy-storage",
    },
  ),
)

// Helper function to get all descendant category IDs
function getDescendantIds(categories: HierarchicalCategory[], parentId: string): string[] {
  const directChildren = categories.filter((c) => c.parentId === parentId)
  const descendantIds: string[] = directChildren.map((c) => c.id)

  directChildren.forEach((child) => {
    const childDescendants = getDescendantIds(categories, child.id)
    descendantIds.push(...childDescendants)
  })

  return descendantIds
}

