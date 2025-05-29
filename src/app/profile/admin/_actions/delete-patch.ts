'use server';

import { prisma } from '@prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@root/components/constants/auth-options';
import { revalidatePath } from 'next/cache';

export async function deletePatch(id: number) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'Только администраторы могут удалять патчи',
    };
  }

  try {
    await prisma.expansion.delete({
      where: { id: Number(id) },
    });

    revalidatePath('/admin/add-patch');
    return { success: true };
  } catch (error) {
    console.error('Ошибка при удалении патча:', error);
    return { success: false, error: 'Произошла ошибка при удалении патча' };
  }
}
