'use server';

import { prisma } from '@prisma/prisma-client';
import { SectionType } from '@prisma/client';

export async function createSection(guideId: number, sectionType: SectionType) {
  try {
    const sectionCount = await prisma.section.count({
      where: { guideId },
    });

    const section = await prisma.section.create({
      data: {
        guideId,
        order: sectionCount + 1,
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

export async function createTextField(sectionId: number) {
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
        order: textFieldCount + 1,
      },
    });

    return { success: true, textField };
  } catch (error) {
    console.error('Error creating text field:', error);
    return { success: false, error: 'Не удалось создать текстовое поле' };
  }
}

export async function createTab(sectionId: number) {
  try {
    const tabGroupCount = await prisma.tabGroup.count({
      where: { sectionId },
    });

    if (tabGroupCount >= 15) {
      return {
        success: false,
        error: 'Достигнут лимит в 15 группы вкладок на секцию',
      };
    }

    const tabGroup = await prisma.tabGroup.create({
      data: {
        sectionId,
        order: tabGroupCount + 1,
      },
    });

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
  data: { label?: string; iconUrl?: string | null; content?: string }
) {
  try {
    const tab = await prisma.tab.update({
      where: { id: tabId },
      data: {
        label: data.label,
        iconUrl: data.iconUrl,
        content: data.content,
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

export async function deleteTextField(textFieldId: number) {
  try {
    await prisma.textField.delete({
      where: { id: textFieldId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting text field:', error);
    return { success: false, error: 'Не удалось удалить текстовое поле' };
  }
}

export async function deleteTabGroup(tabGroupId: number) {
  try {
    await prisma.tab.deleteMany({
      where: { tabGroupId },
    });
    await prisma.tabGroup.delete({
      where: { id: tabGroupId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting tab group:', error);
    return { success: false, error: 'Не удалось удалить группу вкладок' };
  }
}

export async function updateSectionItemOrder(
  sectionId: number,
  items: { id: number; type: 'TEXT' | 'TABS'; order: number }[]
) {
  try {
    // Обновляем порядок для TextField
    await Promise.all(
      items
        .filter(item => item.type === 'TEXT')
        .map(item =>
          prisma.textField.update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
    );

    // Обновляем порядок для TabGroup
    await Promise.all(
      items
        .filter(item => item.type === 'TABS')
        .map(item =>
          prisma.tabGroup.update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating section item order:', error);
    return { success: false, error: 'Не удалось обновить порядок элементов' };
  }
}

export async function deleteSection(sectionId: number) {
  try {
    // Удаляем все связанные TextField и TabGroup (с их Tab) через каскадное удаление
    await prisma.section.delete({
      where: { id: sectionId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting section:', error);
    return { success: false, error: 'Не удалось удалить секцию' };
  }
}
