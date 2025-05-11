import { createGuideSchemas } from "@/components/shared/guide/editor/schemas/create-guide-schemas";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const guide = await prisma.guide.findMany();

  return NextResponse.json(guide);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createGuideSchemas.parse(body);

    // Создаем гайд с пустыми табами по умолчанию
    const newGuide = await prisma.guide.create({
      data: {
        ...validatedData,
        heroTalents: {
          create: {
            tabs: {
              create: [
                {
                  value: "tab1",
                  label: "Основное",
                  iconUrl: "",
                  content: "**Редактируйте этот контент**",
                },
              ],
            },
          },
        },
      },
      include: {
        heroTalents: {
          include: {
            tabs: true,
          },
        },
      },
    });

    return NextResponse.json(newGuide, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create guide" },
      { status: 500 }
    );
  }
}
