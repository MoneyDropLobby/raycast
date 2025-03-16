import { prisma } from "@/lib/prisma";
import { artikelErstellSchema } from "@/lib/validation-schema";
import { APIResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: { message: "Hey" },
  } as APIResponse);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const parsed = artikelErstellSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Invalid data provided.",
        },
      } as APIResponse,
      { status: 400 }
    );
  }

  // Save the data to the database with prisma
  const savedData = prisma.artikel.create({
    data: parsed.data,
  });
  return NextResponse.json(
    {
      success: true,
      data: { message: "Hello POST" },
    } as APIResponse,
    { status: 201 }
  );
}
