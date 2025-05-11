import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateTabsSchemas } from "@/components/shared/guide/editor/schemas/update-tabs-schemas";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const validatedData = updateTabsSchemas.parse(body);
    const { tabs, guideId } = validatedData;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Удаляем табы, которых нет в новых данных
      const deleteResult = await tx.tab.deleteMany({
        where: {
          heroTalentsId: guideId,
          NOT: { value: { in: tabs.map((t) => t.value) } },
        },
      });

      // 2. Обновляем или создаем табы
      const upsertResults = await Promise.all(
        tabs.map((tab) =>
          tx.tab.upsert({
            where: {
              value_heroTalentsId: {
                value: tab.value,
                heroTalentsId: tab.heroTalentsId,
              },
            },
            create: tab,
            update: {
              label: tab.label,
              iconUrl: tab.iconUrl,
              content: tab.content,
            },
          })
        )
      );

      return {
        deletedCount: deleteResult.count,
        upsertedCount: upsertResults.length,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Tabs updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating tabs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid data or server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
