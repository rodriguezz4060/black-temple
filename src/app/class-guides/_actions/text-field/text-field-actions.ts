'use server';

import { prisma } from '@prisma/prisma-client';
import { handlePrismaError } from '@root/utils/error-handler';

export async function createTextField(sectionId: number) {
  try {
    // Подсчитываем общее количество элементов в секции (текстовые поля + группы вкладок)
    const sectionItemsCount = await prisma.$transaction([
      prisma.textField.count({ where: { sectionId } }),
      prisma.tabGroup.count({ where: { sectionId } }),
    ]);

    const totalCount = sectionItemsCount[0] + sectionItemsCount[1];

    if (sectionItemsCount[0] >= 3) {
      return {
        success: false,
        error: 'Достигнут лимит в 3 текстовых поля на секцию',
      };
    }

    const textField = await prisma.textField.create({
      data: {
        sectionId,
        content: '',
        order: totalCount + 1,
      },
    });

    return { success: true, textField };
  } catch (error) {
    console.error('Error creating text field:', error);
    return { success: false, error: 'Не удалось создать текстовое поле' };
  }
}

export async function deleteTextField(textFieldId: number) {
  return handlePrismaError('удалить текстовое поле')(async () => {
    await prisma.textField.delete({
      where: { id: textFieldId },
    });
    return {};
  });
}
