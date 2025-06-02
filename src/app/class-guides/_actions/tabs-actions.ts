'use server';

import { prisma } from '@prisma/prisma-client';
import { TabData } from '@root/@types/prisma';
import { revalidatePath } from 'next/cache';

export async function saveTabs(tabs: TabData[], sectionId: number) {
  try {
    await prisma.$transaction(async tx => {
      // Удаляем старые табы, если они не присутствуют в новом списке
      await tx.tab.deleteMany({
        where: {
          sectionId,
          NOT: { value: { in: tabs.map(tab => tab.value) } },
        },
      });

      // Создаем или обновляем табы
      for (const tab of tabs) {
        await tx.tab.upsert({
          where: { value_sectionId: { value: tab.value, sectionId } },
          update: {
            label: tab.label,
            iconUrl: tab.iconUrl || null,
            content: tab.content,
          },
          create: {
            value: tab.value,
            label: tab.label,
            iconUrl: tab.iconUrl || null,
            content: tab.content,
            sectionId,
          },
        });
      }
    });

    revalidatePath(`/guides/${sectionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error saving tabs:', error);
    throw new Error('Не удалось сохранить табы');
  }
}

export async function deleteTab(tabId: number, sectionId: number) {
  try {
    await prisma.tab.delete({
      where: { id: tabId, sectionId },
    });
    revalidatePath(`/guides/${sectionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting tab:', error);
    throw new Error('Не удалось удалить таб');
  }
}
