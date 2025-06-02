'use server';

import { prisma } from '@prisma/prisma-client';
import { TabData } from '@root/@types/prisma';
import { revalidatePath } from 'next/cache';

export async function saveTabs(
  tabs: TabData[],
  sectionId: number
): Promise<TabData[]> {
  try {
    const updatedTabs = await prisma.$transaction(async tx => {
      // Удаляем старые табы, если они не присутствуют в новом списке
      await tx.tab.deleteMany({
        where: {
          sectionId,
          NOT: { value: { in: tabs.map(tab => tab.value) } },
        },
      });

      // Создаем или обновляем табы
      const result: TabData[] = [];
      for (const tab of tabs) {
        const upsertedTab = await tx.tab.upsert({
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
          select: {
            id: true,
            value: true,
            label: true,
            iconUrl: true,
            content: true,
            sectionId: true,
          },
        });
        result.push({ ...upsertedTab, isNew: false });
      }
      return result;
    });

    revalidatePath(`/guides/${sectionId}`);
    return updatedTabs;
  } catch (error) {
    console.error('Error saving tabs:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Не удалось сохранить табы: ${errorMessage}`);
  }
}

export async function deleteTab(tabId: number, sectionId: number) {
  try {
    console.log('Attempting to delete tab:', { tabId, sectionId });

    const tab = await prisma.tab.findFirst({
      where: { id: tabId, sectionId },
    });

    if (!tab) {
      console.error('Tab not found:', { tabId, sectionId });
      throw new Error('Таб не найден в базе данных');
    }

    await prisma.tab.delete({
      where: { id: tabId, sectionId },
    });

    revalidatePath(`/guides/${sectionId}`);
    console.log('Tab deleted successfully:', { tabId, sectionId });
    return { success: true };
  } catch (error) {
    console.error('Server-side delete error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Не удалось удалить таб: ${errorMessage}`);
  }
}
