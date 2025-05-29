'use server';

import { SlotType } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { createGuideSchemas } from '@root/components/shared/class-guides/editor/schemas/create-guide-schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { transliterate } from 'transliteration';

export async function GuideData() {
  const classes = await prisma.classSelection.findMany({
    include: { specializations: true },
  });
  const modes = await prisma.mode.findMany();
  const expansions = await prisma.expansion.findMany();
  return {
    classes,
    modes,
    expansions,
  };
}

export async function createGuideAction(formData: FormData) {
  try {
    const slotTypes = Object.values(SlotType);
    const classId = formData.get('classId');
    const specializationId = formData.get('specializationId');
    const modeId = formData.get('modeId');
    const expansionId = formData.get('expansionId');
    const title = formData.get('title');

    const data = {
      classId: Number(classId),
      specializationId: Number(specializationId),
      modeId: Number(modeId),
      expansionId: Number(expansionId),
      title: title ? String(title) : null,
      slug: '',
    };

    const validatedData = createGuideSchemas.parse(data);

    const classData = await prisma.classSelection.findUnique({
      where: { id: validatedData.classId },
    });
    const specData = await prisma.classSpecialization.findUnique({
      where: { id: validatedData.specializationId },
    });
    const modeData = await prisma.mode.findUnique({
      where: { id: validatedData.modeId },
    });

    if (!classData || !specData || !modeData) {
      throw new Error(
        'Не удалось найти данные о классе, специализации или режиме'
      );
    }

    const guide = await prisma.guide.create({
      data: {
        classId: validatedData.classId,
        specializationId: validatedData.specializationId,
        modeId: validatedData.modeId,
        expansionId: validatedData.expansionId,

        title: validatedData.title, // Используем валидированное значение
        slug: '',
        overviewGears: {
          create: slotTypes.map(slotType => ({
            itemSlot: slotType,
          })),
        },
        overviewDifficulty: {
          create: {
            singleTarget: null,
            multiTarget: null,
            utility: null,
            survivability: null,
            mobility: null,
          },
        },
      },
      include: {
        class: true,
        specialization: true,
        modeRelation: true,
        overviewGears: true,
        overviewDifficulty: true,
      },
    });

    const slug =
      `${transliterate(classData.name)}-${transliterate(specData.name)}-${transliterate(modeData.name)}-${guide.id}`
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    await prisma.guide.update({
      where: { id: guide.id },
      data: { slug },
    });

    revalidatePath('/class-guides');

    return {
      success: true,
      guide: {
        id: guide.id,
        className: guide.class.name,
        specializationName: guide.specialization.name,
        modeName: guide.modeRelation.name,
        slug,
      },
    };
  } catch (error) {
    console.error('Ошибка в createGuideAction:', error);
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join(', ');
      return { success: false, error: `Ошибка валидации: ${errorMessages}` };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Не удалось создать гайд',
    };
  }
}
