"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ArtikelErstellForm from "./artikel-erstell-form";

const ArtikelErstellDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Artikel hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neuen Artikel erstellen</DialogTitle>
        </DialogHeader>
        <ArtikelErstellForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ArtikelErstellDialog;
