import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";
import ArtikelDataTable from "./artikel-data-table";
import { prisma } from "@/lib/prisma";

const Artikelverwaltung = async () => {
  const artikel = await prisma.artikel.findMany({
    select: {
      id: true,
      name: true,
      ean: true,
      untergruppe: {
        select: {
          name: true,
        },
      },
      verkaufspreis: true,
      status: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <DashboardHeader
        heading="Artikelverwaltung"
        description="Fügen Sie Artikel hinzu, bearbeiten und verwalten Sie Ihren Bestand im System."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Artikel hinzufügen
        </Button>
      </DashboardHeader>
      <div className="w-full">
        <div className="flex gap-2">
          <Input placeholder="Artikel suchen..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Kategorien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ArtikelDataTable artikel={artikel} />
      </div>
    </>
  );
};

export default Artikelverwaltung;
