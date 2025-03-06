"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleManagement } from "@/components/article-management"
import { CategoryManagement } from "@/components/category-management"
import { DashboardShell } from "@/components/dashboard-shell"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("articles")

  return (
    <DashboardShell>
      <Tabs defaultValue="articles" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="articles">Artikelverwaltung</TabsTrigger>
          <TabsTrigger value="categories">Kategorieverwaltung</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticleManagement />
        </TabsContent>
        <TabsContent value="categories">
          <CategoryManagement />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

