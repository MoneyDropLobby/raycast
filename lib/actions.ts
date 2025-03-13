"use server";

import { z } from "zod";
import { artikelErstellSchema } from "./validation-schema";
import { NextResponse } from "next/server";

export default async function ArtikelErstellen(
  values: z.infer<typeof artikelErstellSchema>
) {
  // safeparse against zod schema
  const data = artikelErstellSchema.safeParse(values);
  if (!data || !data.success) return { message: "Error" };
  return;
}
