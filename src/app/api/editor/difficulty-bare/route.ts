import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const { guideId, item } = data;

    if (!guideId || !item) {
      return NextResponse.json(
        { message: 'guideId, slot и item обязательны' },
        { status: 400 }
      );
    }

    // Проверяем, существует ли запись OverviewGear для данного guideId и slot
    const existingDifficulty = await prisma.overviewDifficulty.findFirst({
      where: { guideId },
    });

    // Формируем данные для обновления или создания
    const difficultyData = {
      singleTarget: item.singleTarget,
      multiTarget: item.multiTarget,
      utility: item.utility,
      survivability: item.survivability,
      mobility: item.mobility,
      guideId,
    };

    const updatedDifficulty = existingDifficulty
      ? await prisma.overviewDifficulty.update({
          where: { id: existingDifficulty.id },
          data: difficultyData,
        })
      : await prisma.overviewDifficulty.create({
          data: difficultyData,
        });

    return NextResponse.json(updatedDifficulty, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
