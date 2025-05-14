import { prisma } from "@prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const modes = await prisma.mode.findMany();
    return NextResponse.json(modes);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch modes" },
      { status: 500 }
    );
  }
}
