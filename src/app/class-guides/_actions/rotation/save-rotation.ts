'use server';

import { PrismaClient } from '@prisma/client';
import { Ability, VerticalRow } from '@root/@types/prisma';

const prisma = new PrismaClient();

// Интерфейс для входных данных серверного экшена
interface SaveRotationInput {
  tabId: number;
  rotationId: number | null;
  abilities: Ability[];
  verticalRows: VerticalRow[];
}

// Интерфейс для ответа
interface SaveRotationResponse {
  success: boolean;
  message?: string;
  rotationId?: number;
}

// Серверный экшен для сохранения ротации
export async function saveRotation({
  tabId,
  rotationId,
  abilities,
  verticalRows,
}: SaveRotationInput): Promise<SaveRotationResponse> {
  try {
    let rotation;

    // Начинаем транзакцию для атомарного сохранения
    await prisma.$transaction(async tx => {
      // Создаем или обновляем ротацию
      if (rotationId) {
        rotation = await tx.rotation.update({
          where: { id: rotationId },
          data: { order: 0 }, // Порядок можно настроить
        });
      } else {
        rotation = await tx.rotation.create({
          data: {
            order: 0,
            tab: { connect: { id: tabId } },
          },
        });
      }

      // Удаляем старые способности и ряды
      await tx.ability.deleteMany({ where: { rotationId: rotation.id } });
      await tx.verticalRow.deleteMany({ where: { rotationId: rotation.id } });

      // Создаем новые вертикальные ряды
      for (const row of verticalRows) {
        const newRow = await tx.verticalRow.create({
          data: {
            rotationId: rotation.id,
            positionAfter: row.positionAfter || null,
            order: verticalRows.indexOf(row),
          },
        });

        // Создаем способности для ряда
        for (const ability of row.abilities) {
          await tx.ability.create({
            data: {
              id: ability.id,
              rotationId: rotation.id,
              url: ability.url,
              isPrepull: ability.isPrepull ?? false, // Сохраняем isPrepull, по умолчанию false
              verticalRowId: newRow.id,
              order: row.abilities.indexOf(ability),
            },
          });
        }
      }

      // Создаем способности для горизонтальных зон
      for (const ability of abilities) {
        await tx.ability.create({
          data: {
            id: ability.id,
            rotationId: rotation.id,
            url: ability.url,
            isPrepull: ability.isPrepull ?? false, // Сохраняем isPrepull, по умолчанию false
            order: abilities.indexOf(ability),
          },
        });
      }
    });

    return {
      success: true,
      rotationId: rotation!.id,
    };
  } catch {
    console.error('Ошибка сохранения ротации');
    return {
      success: false,
      message: 'Ошибка при сохранении ротации',
    };
  } finally {
    await prisma.$disconnect();
  }
}
