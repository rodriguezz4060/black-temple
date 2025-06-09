'use server';

import { prisma } from '@prisma/prisma-client';
import { handlePrismaError } from '@root/utils/error-handler';

export async function createTextField(sectionId: number) {
  const textFieldCount = await prisma.textField.count({
    where: { sectionId },
  });

  if (textFieldCount >= 3) {
    return {
      success: false,
      error: 'Достигнут лимит в 3 текстовых поля на секцию',
    };
  }

  return handlePrismaError('создать текстовое поле')(async () => {
    const textField = await prisma.textField.create({
      data: {
        sectionId,
        content: '',
        order: textFieldCount + 1,
      },
    });

    return { textField };
  });
}

export async function deleteTextField(textFieldId: number) {
  return handlePrismaError('удалить текстовое поле')(async () => {
    await prisma.textField.delete({
      where: { id: textFieldId },
    });
    return {};
  });
}
