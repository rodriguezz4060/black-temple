'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { getUserSession } from '@root/lib/get-user-session';
import { hashSync } from 'bcrypt';

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.user.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.user.id),
      },
      data: {
        fullName: body.fullName,
        bio: body.bio,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}
