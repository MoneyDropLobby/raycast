import ArtikelErstellen from "@/lib/actions";
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
  console.log(req.headers);
  // return NextResponse.json({ message: "Hello POST" });
}
