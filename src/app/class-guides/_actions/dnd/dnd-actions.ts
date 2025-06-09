'use server';

import { prisma } from '@prisma/prisma-client';
import { handlePrismaError } from '@root/utils/error-handler';

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
