import ArtikelErstellen from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello GET" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await ArtikelErstellen(body);
  // return NextResponse.json({ message: "Hello POST" });
}
