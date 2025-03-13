import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const KategorieVerwaltung = () => {
  return (
    <>
      <DashboardHeader
        heading="Kategorie Verwaltung"
        description="Fügen Sie Kategorien hinzu, bearbeiten und verwalten Sie Ihre Kategorien im System."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Kategorie erstellen
        </Button>
      </DashboardHeader>
    </>
  );
};

export default KategorieVerwaltung;
