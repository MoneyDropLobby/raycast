import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ArtikelErstellForm from "./artikel-erstell-form";

const ArtikelErstellDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Artikel erstellen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Neuen Artikel hinzufügen</DialogTitle>
          <DialogDescription>
            Fügen Sie einen neuen Artikel zu Ihrem Bestand hinzu. Füllen Sie
            alle erforderlichen Felder aus.
          </DialogDescription>
        </DialogHeader>

        <ArtikelErstellForm />
      </DialogContent>
    </Dialog>
  );
};

export default ArtikelErstellDialog;
