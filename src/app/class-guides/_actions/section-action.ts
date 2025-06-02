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
        contentType: 'MIXED', // Устанавливаем MIXED, так как секция может содержать и табы, и текст
      },
    });

    return { success: true, section };
  } catch (error) {
    console.error('Error creating section:', error);
    return { success: false, error: 'Failed to create section' };
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
        error: 'Maximum of 3 text fields per section reached',
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
    return { success: false, error: 'Failed to create text field' };
  }
}

export async function createTab(sectionId: number, guideId: number) {
  try {
    const tabCount = await prisma.tab.count({
      where: { sectionId },
    });

    const newTabValue = `tab-${tabCount + 1}-${sectionId}`;
    const tab = await prisma.tab.create({
      data: {
        sectionId,
        value: newTabValue,
        label: `Tab ${tabCount + 1}`,
        content: '',
      },
    });

    return { success: true, tab };
  } catch (error) {
    console.error('Error creating tab:', error);
    return { success: false, error: 'Failed to create tab' };
  }
}
