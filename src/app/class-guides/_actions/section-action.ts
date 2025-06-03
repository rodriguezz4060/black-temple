'use server';

import { prisma } from '@prisma/prisma-client';
import { SectionType } from '@prisma/client';

export async function createSection(guideId: number, sectionType: SectionType) {
  try {
    const maxOrder = await prisma.section.findFirst({
      where: { guideId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = (maxOrder?.order ?? 0) + 1;

    const section = await prisma.section.create({
      data: {
        guideId,
        order: newOrder,
        type: sectionType,
        contentType: 'MIXED',
      },
    });

    return { success: true, section };
  } catch (error) {
    console.error('Error creating section:', error);
    return { success: false, error: 'Не удалось создать секцию' };
  }
}

export async function createTextField(sectionId: number, guideId: number) {
  try {
    const textFieldCount = await prisma.textField.count({
      where: { sectionId },
    });

    if (textFieldCount >= 3) {
      return {
        success: false,
        error: 'Достигнут лимит в 3 текстовых поля на секцию',
      };
    }

    const textField = await prisma.textField.create({
      data: {
        sectionId,
        content: '',
      },
    });

    return { success: true, textField };
  } catch (error) {
    console.error('Error creating text field:', error);
    return { success: false, error: 'Не удалось создать текстовое поле' };
  }
}

export async function createTabInGroup(tabGroupId: number, sectionId: number) {
  try {
    const tabCount = await prisma.tab.count({
      where: { tabGroupId },
    });

    if (tabCount >= 3) {
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
      },
    });

    return { success: true, tab };
  } catch (error) {
    console.error('Error creating tab in group:', error);
    return { success: false, error: 'Не удалось создать вкладку' };
  }
}

export async function createTab(sectionId: number, guideId: number) {
  try {
    const tabGroupCount = await prisma.tabGroup.count({
      where: { sectionId },
    });

    if (tabGroupCount >= 3) {
      return {
        success: false,
        error: 'Достигнут лимит в 3 группы вкладок на секцию',
      };
    }

    // Создаем новую группу табов
    const tabGroup = await prisma.tabGroup.create({
      data: {
        sectionId,
      },
    });

    // Создаем первый таб в новой группе
    const newTabValue = `tab-1-${tabGroup.id}`;
    const tab = await prisma.tab.create({
      data: {
        tabGroupId: tabGroup.id,
        value: newTabValue,
        label: `Вкладка 1`,
        content: '',
      },
    });

    return { success: true, tabGroup, tab };
  } catch (error) {
    console.error('Error creating tab group:', error);
    return { success: false, error: 'Не удалось создать группу вкладок' };
  }
}
