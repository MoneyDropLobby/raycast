import { z } from "zod";

// EAN-Code Validierung (EAN-8, EAN-13 oder UPC-Formate)

export const artikelErstellSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  beschreibung: z.string().optional(),
  preis: z.number().min(0, "Preis muss mindestens 0 sein"),
  einkaufspreis: z.number().min(0, "Einkaufspreis muss mindestens 0 sein"),
  bestand: z.number().int().min(0, "Bestand kann nicht negativ sein"),
  categoryId: z.string().optional(),
  eanCodes: z.array(
    z.object({
      label: z.string().min(3, "EAN-Code-Label ist erforderlich"),
      value: z.string(),
    })
  ),
});
