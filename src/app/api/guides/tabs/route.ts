import { NextResponse } from 'next/server';
import { prisma } from '@prisma/prisma-client';
import { updateTabsSchemas } from '@root/components/shared/class-guides/editor/schemas/update-tabs-schemas';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const validatedData = updateTabsSchemas.parse(body);
    const { tabs, guideId } = validatedData;

    const result = await prisma.$transaction(async tx => {
      // 1. Проверяем, существует ли HeroTalents для guideId
      let heroTalents = await tx.heroTalents.findUnique({
        where: { guideId },
      });

      // 2. Если HeroTalents не существует, создаем новую запись
      if (!heroTalents) {
        heroTalents = await tx.heroTalents.create({
          data: {
            guideId,
            textArea: null, // Совместимо с createGuideAction
          },
        });
      }

      // 3. Удаляем табы, которых нет в новых данных
      const deleteResult = await tx.tab.deleteMany({
        where: {
          heroTalentsId: heroTalents.id,
          NOT: { value: { in: tabs.map(t => t.value) } },
        },
      });

      // 4. Обновляем или создаем табы
      const upsertResults = await Promise.all(
        tabs.map(tab =>
          tx.tab.upsert({
            where: {
              value_heroTalentsId: {
                value: tab.value,
                heroTalentsId: heroTalents.id,
              },
            },
            create: {
              ...tab,
              heroTalentsId: heroTalents.id,
            },
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
      message: 'Tabs updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating tabs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid data or server error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
