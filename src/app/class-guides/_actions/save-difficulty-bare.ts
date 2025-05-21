'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DifficultyData {
  guideId: number;
  item: {
    singleTarget: number;
    multiTarget: number;
    utility: number;
    survivability: number;
    mobility: number;
  };
}

export async function updateDifficulty(data: DifficultyData) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/';
    const url = `${baseUrl}/api/editor/difficulty-bare`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Ошибка сервера' };
    }

    const result = await response.json();
    revalidatePath('/'); // Ревалидируем путь для обновления кэша
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  } finally {
    await prisma.$disconnect();
  }
}
