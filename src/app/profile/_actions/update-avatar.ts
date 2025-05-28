'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { getUserSession } from '@root/lib/get-user-session';
import { revalidatePath } from 'next/cache';

export async function updateUserAvatar(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.user.id),
      },
      data: {
        avatar: body.avatar,
      },
    });

    revalidatePath('/settings');
    return { success: true };
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}
