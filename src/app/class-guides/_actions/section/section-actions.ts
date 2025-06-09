'use server';

import { prisma } from '@prisma/prisma-client';
import { SectionType } from '@prisma/client';
import { handlePrismaError } from '@root/utils/error-handler';

export async function createSection(guideId: number, sectionType: SectionType) {
  return handlePrismaError('создать секцию')(async () => {
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

    return { section };
  });
}

export async function deleteSection(sectionId: number) {
  return handlePrismaError('удалить секцию')(async () => {
    await prisma.section.delete({
      where: { id: sectionId },
    });
    return {};
  });
}

export async function updateSectionItemOrder(
  sectionId: number,
  items: { id: number; type: 'TEXT' | 'TABS'; order: number }[]
) {
  return handlePrismaError('обновить порядок элементов')(async () => {
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

    return {};
  });
}
