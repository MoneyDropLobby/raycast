import { z } from "zod";

// EAN-Code Validierung (EAN-8, EAN-13 oder UPC-Formate)
const eanCodeSchema = z
  .string()
  .refine((code) => /^\d+$/.test(code), {
    message: "EAN-Code darf nur Zahlen enthalten",
  })
  .refine((code) => [8, 12, 13, 14].includes(code.length), {
    message: "EAN-Code muss 8, 12, 13 oder 14 Stellen lang sein",
  });

export const artikelErstellSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  beschreibung: z.string().optional(),
  preis: z.number().min(0, "Preis muss mindestens 0 sein"),
  einkaufspreis: z.number().min(0, "Einkaufspreis muss mindestens 0 sein"),
  bestand: z.number().int().min(0, "Bestand kann nicht negativ sein"),
  categoryId: z.string().optional(),
  eanCodes: z.array(eanCodeSchema), // Verbesserte Validierung für EAN-Codes
});
