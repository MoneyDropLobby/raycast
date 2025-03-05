import { ArticleManagement } from "@/components/article-management";

// export const metadata: Metadata = {
//   title: "Article Management | Cash Register System",
//   description: "Manage your inventory items in the cash register system",
// }

export default function ArtikelVerwaltung() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1">
          <ArticleManagement />
        </main>
      </div>
    </div>
  );
}
