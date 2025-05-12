import { prisma } from "@prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const classes = await prisma.classSelection.findMany({
      include: {
        specializations: true, // Включаем связанные специализации
      },
    });
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}
