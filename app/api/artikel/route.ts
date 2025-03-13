import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello GET" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Hello POST" });
}
