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
import ArtikelErstellDialog from "../artikel-erstell-dialog";

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
  if (!artikel) return null;

  return (
    <>
      <DashboardHeader
        heading="Artikelverwaltung"
        description="Fügen Sie Artikel hinzu, bearbeiten und verwalten Sie Ihren Bestand im System."
      >
        <ArtikelErstellDialog />
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
