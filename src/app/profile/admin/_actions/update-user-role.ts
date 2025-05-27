'use server';

import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: number, role: string) {
  try {
    const { prisma } = await import('@prisma/prisma-client');
    await prisma.user.update({
      where: { id: userId },
      data: { role: role as UserRole },
    });
    revalidatePath('/admin/users');
    return { success: true };
  } catch {
    return { success: false, error: 'Ошибка при обновлении роли' };
  }
}
