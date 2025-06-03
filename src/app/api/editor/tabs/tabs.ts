'use server';

import { TabData } from '@root/@types/prisma';
import {
  saveTabs,
  deleteTab,
} from '@root/app/class-guides/_actions/tabs-actions';
import { prisma } from '@prisma/prisma-client';

export const fetchTabs = async (sectionId: number): Promise<TabData[]> => {
  try {
    const tabs = await prisma.tab.findMany({
      where: { sectionId },
      select: {
        id: true,
        value: true,
        label: true,
        iconUrl: true,
        content: true,
        sectionId: true,
      },
    });
    return tabs.map(tab => ({ ...tab, isNew: false }));
  } catch (error) {
    console.error('Error fetching tabs:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    throw new Error(`Не удалось загрузить табы: ${errorMessage}`);
  }
};

export const saveTabsApi = async (
  tabs: TabData[],
  sectionId: number
): Promise<TabData[]> => {
  try {
    // Проверяем уникальность value перед сохранением
    const existingValues = new Set(tabs.map(tab => tab.value));
    if (existingValues.size !== tabs.length) {
      throw new Error('Обнаружены дублирующиеся значения value в табах');
    }
    return await saveTabs(tabs, sectionId);
  } catch (error) {
    console.error('Error saving tabs:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    throw new Error(`Не удалось сохранить табы: ${errorMessage}`);
  }
};

export const deleteTabApi = async (
  tabId: number,
  sectionId: number
): Promise<{ success: boolean }> => {
  return deleteTab(tabId, sectionId);
};
