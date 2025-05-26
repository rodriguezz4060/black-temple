'use server';

import { prisma } from '@prisma/prisma-client';
import { authOptions } from '@root/components/constants/auth-options';
import { getServerSession } from 'next-auth';

export async function deletePatchAction(id: number) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'Только администраторы могут удалять патчи',
    };
  }

  try {
    await prisma.expansion.delete({
      where: {
        id: id,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: 'Произошла ошибка при удалении патча' };
  }
}
