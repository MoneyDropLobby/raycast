import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Kategorieverwaltung | Kassensystem",
  description: "Erstellen und verwalten Sie hierarchische Kategorien für Ihre Artikel",
}

export default function CategoriesPage() {
  redirect("/")
}

