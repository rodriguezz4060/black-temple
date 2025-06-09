'use server';

import { prisma } from '@prisma/prisma-client';

export async function createTab(sectionId: number) {
  try {
    // Подсчитываем общее количество элементов в секции
    const sectionItemsCount = await prisma.$transaction([
      prisma.textField.count({ where: { sectionId } }),
      prisma.tabGroup.count({ where: { sectionId } }),
    ]);

    const totalCount = sectionItemsCount[0] + sectionItemsCount[1];

    if (sectionItemsCount[1] >= 15) {
      return {
        success: false,
        error: 'Достигнут лимит в 15 группы вкладок на секцию',
      };
    }

    const tabGroup = await prisma.tabGroup.create({
      data: {
        sectionId,
        order: totalCount + 1, // Новый элемент добавляется в конец
      },
    });

    const newTabValue = `tab-1-${tabGroup.id}`;
    const tab = await prisma.tab.create({
      data: {
        tabGroupId: tabGroup.id,
        value: newTabValue,
        label: `Вкладка 1`,
        content: '',
        importString: '',
      },
    });

    return { success: true, tabGroup, tab };
  } catch (error) {
    console.error('Error creating tab group:', error);
    return { success: false, error: 'Не удалось создать группу вкладок' };
  }
}

export async function createTabInGroup(tabGroupId: number) {
  try {
    const tabCount = await prisma.tab.count({
      where: { tabGroupId },
    });

    if (tabCount >= 15) {
      return {
        success: false,
        error: 'Достигнут лимит в 3 вкладки на группу',
      };
    }

    const newTabValue = `tab-${tabCount + 1}-${tabGroupId}`;
    const tab = await prisma.tab.create({
      data: {
        tabGroupId,
        value: newTabValue,
        label: `Вкладка ${tabCount + 1}`,
        content: '',
        importString: '',
        iconUrl: null,
      },
    });

    return {
      success: true,
      tab: {
        id: tab.id,
        value: tab.value,
        label: tab.label,
        iconUrl: tab.iconUrl,
        content: tab.content,
        importString: tab.importString,
        tabGroupId: tab.tabGroupId,
        createdAt: tab.createdAt,
        updatedAt: tab.updatedAt,
      },
    };
  } catch (error) {
    console.error('Error creating tab in group:', error);
    return { success: false, error: 'Не удалось создать вкладку' };
  }
}

export async function updateTab(
  tabId: number,
  data: {
    label?: string;
    iconUrl?: string | null;
    content?: string;
    importString?: string;
  }
) {
  try {
    const tab = await prisma.tab.update({
      where: { id: tabId },
      data: {
        label: data.label,
        iconUrl: data.iconUrl,
        content: data.content,
        importString: data.importString,
      },
    });
    return {
      success: true,
      tab: {
        id: tab.id,
        value: tab.value,
        label: tab.label,
        iconUrl: tab.iconUrl,
        content: tab.content,
        importString: tab.importString,
        tabGroupId: tab.tabGroupId,
        createdAt: tab.createdAt,
        updatedAt: tab.updatedAt,
      },
    };
  } catch (error) {
    console.error('Error updating tab:', error);
    return { success: false, error: 'Не удалось обновить вкладку' };
  }
}

export async function deleteTab(tabId: number) {
  try {
    await prisma.tab.delete({
      where: { id: tabId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting tab:', error);
    return { success: false, error: 'Не удалось удалить вкладку' };
  }
}
