import type { Metadata } from "next";
import { DashboardTabs } from "@/components/tabs";

export const metadata: Metadata = {
  title: "Kassensystem | Verwaltung",
  description: "Verwalten Sie Ihre Artikel und Kategorien im Kassensystem",
};

export default function Artikel_KategorienVerwaltung() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1">
          <DashboardTabs />
        </main>
      </div>
    </div>
  );
}
