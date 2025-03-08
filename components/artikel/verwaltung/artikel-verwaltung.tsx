import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import React from "react";

const Artikelverwaltung = () => {
  return (
    <DashboardHeader
      heading="Artikelverwaltung"
      description="Fügen Sie Artikel hinzu, bearbeiten und verwalten Sie Ihren Bestand im System."
    >
      <Button>Artikel hinzufügen</Button>
    </DashboardHeader>
  );
};

export default Artikelverwaltung;
