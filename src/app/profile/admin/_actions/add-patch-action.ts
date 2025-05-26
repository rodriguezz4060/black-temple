'use server';

import { prisma } from '@prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@root/components/constants/auth-options';
import {
  addPatchWowSchema,
  TAddPatchWowSchema,
} from '@root/components/shared/profile/admin/schemas/add-patch';

export async function addPatchAction(data: TAddPatchWowSchema) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'Только администраторы могут добавлять патчи',
    };
  }

  try {
    const validatedData = addPatchWowSchema.parse(data);

    const existingPatch = await prisma.expansion.findFirst({
      where: {
        name: validatedData.name,
        patchVersion: validatedData.patchVersion,
      },
    });

    if (existingPatch) {
      return {
        success: false,
        error: 'Патч с таким названием и версией уже существует',
      };
    }

    await prisma.expansion.create({
      data: {
        name: validatedData.name,
        patchName: validatedData.patchName,
        patchVersion: validatedData.patchVersion,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: 'Произошла ошибка при добавлении патча' };
  }
}
