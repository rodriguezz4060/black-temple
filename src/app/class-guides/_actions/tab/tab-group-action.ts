'use server';

import { prisma } from '@prisma/prisma-client';
import { handlePrismaError } from '@root/utils/error-handler';

export async function createTabGroup(sectionId: number) {
  const tabGroupCount = await prisma.tabGroup.count({
    where: { sectionId },
  });

  if (tabGroupCount >= 15) {
    return {
      success: false,
      error: 'Достигнут лимит в 15 группы вкладок на секцию',
    };
  }

  return handlePrismaError('создать группу вкладок')(async () => {
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
        importString: '',
      },
    });

    return { tabGroup, tab };
  });
}

export async function deleteTabGroup(tabGroupId: number) {
  return handlePrismaError('удалить группу вкладок')(async () => {
    await prisma.tab.deleteMany({
      where: { tabGroupId },
    });
    await prisma.tabGroup.delete({
      where: { id: tabGroupId },
    });
    return {};
  });
}
