import { z } from "zod";

// EAN-Code Validierung (EAN-8, EAN-13 oder UPC-Formate)

export const artikelErstellSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  beschreibung: z.string().optional(),
  verkaufspreis: z
    .number({ message: "Nur Zahlen sind erlaubt" })
    .min(0, "Preis kann nicht negativ sein"),
  einkaufspreis: z.number().min(0, "Preis kann nicht negativ sein"),
  mwstSatz: z.enum(["8.1", "2.6", "3.8", "0"]),
  verkaufsEinheit: z
    .enum([
      "STUECK",
      "GRAMM",
      "KILOGRAMM",
      "LITER",
      "MILLILITER",
      "METER",
      "ZENTIMETER",
      "PACKUNG",
      "KARTON",
      "PALETTE",
    ])
    .default("STUECK"),
  bestand: z.number().int().min(0, "Bestand kann nicht negativ sein"),
  categoryId: z.string().optional(),
  eanCodes: z.array(
    z.object({
      label: z.string().min(3, "EAN-Code-Label ist erforderlich"),
      value: z.string(),
    })
  ),
});
