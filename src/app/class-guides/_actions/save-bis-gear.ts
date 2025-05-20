'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GearData {
  guideId: number;
  slot: string;
  item: {
    itemName: string;
    itemImg: string;
    itemLink: string;
    itemSockets: { socketName: string; socketImg: string; socketUrl: string }[];
    itemEnchantImg: string | null;
    itemEnchantName: string | null;
    itemEnchantUrl: string | null;
  };
}

export async function updateGearSlot(data: GearData) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/';
    const url = `${baseUrl}/api/editor/bis-gear-editor`;

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
