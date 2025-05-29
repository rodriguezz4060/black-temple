'use server';

import { prisma } from '@prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@root/components/constants/auth-options';
import {
  addPatchWowSchema,
  TAddPatchWowSchema,
} from '@root/components/shared/profile/admin/schemas/add-patch';
import { revalidatePath } from 'next/cache';

export async function updatePatchAction(id: number, data: TAddPatchWowSchema) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'Только администраторы могут редактировать патчи',
    };
  }

  try {
    const validatedData = addPatchWowSchema.parse(data);

    const updatedPatch = await prisma.expansion.update({
      where: { id: Number(id) },
      data: {
        name: validatedData.name,
        patchName: validatedData.patchName,
        patchVersion: validatedData.patchVersion,
      },
    });

    revalidatePath('/admin/add-patch'); // Ревалидируем страницу админ-панели
    return { success: true, data: updatedPatch };
  } catch (error) {
    console.error('Ошибка при обновлении патча:', error);
    return { success: false, error: 'Произошла ошибка при обновлении патча' };
  }
}
