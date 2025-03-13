import { z } from "zod";

export const artikelErstellSchema = z.object({
  name: z
    .string()
    .min(3, "Der Name muss mindestens 3 Zeichen lang sein")
    .max(255, "Der Name darf maximal 255 Zeichen lang sein"),
  beschreibung: z.string().min(3).max(255).optional(),
  preis: z.number().min(0, "Der Preis muss mindestens 0 sein"),
  einkaufspreis: z
    .number()
    .min(0, "Der Einkaufspreis muss mindestens 0 sein")
    .optional(),
  bestand: z.number().min(0, "Der Bestand muss mindestens 0 sein").optional(),
  categoryId: z.string().optional(),
  barcode: z.array(z.string().min(3).max(255)).optional(),
});
