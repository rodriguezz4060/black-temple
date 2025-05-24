'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { hashSync } from 'bcrypt';

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error('Такой пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
    return createdUser;
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
