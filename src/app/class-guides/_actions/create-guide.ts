'use server';

import { SlotType } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { createGuideSchemas } from '@root/components/shared/class-guides/editor/schemas/create-guide-schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function GuideData() {
  const classes = await prisma.classSelection.findMany({
    include: { specializations: true },
  });
  const modes = await prisma.mode.findMany();
  const patchData = await getPatchNumber();
  return {
    classes,
    modes,
    patch: patchData.patch_string,
  };
}

export const getPatchNumber = async () => {
  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;

  try {
    // return JSON.parse("123");
    const tokenRes = await fetch('https://oauth.battle.net/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    const tokenData = await tokenRes.json();
    // console.log(tokenData, tokenData.access_token);

    const patchRes = await fetch(
      'https://eu.api.blizzard.com/data/wow/region/3?namespace=dynamic-eu&locale=en_US',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    const patchData = await patchRes.json();
    // console.log(patchData);
    return patchData;
    // return NextResponse.json({ patchBuildOrTimestamp: data.last_updated_timestamp });
  } catch (e) {
    console.error('Ошибка в API /api/patch:', e);
    // return NextResponse.json({ error: "Ошибка получения патча" }, { status: 500 });
  }
};

export async function createGuideAction(formData: FormData) {
  try {
    // Извлекаем данные из FormData
    const slotTypes = Object.values(SlotType);
    const classId = formData.get('classId');
    const specializationId = formData.get('specializationId');
    const modeId = formData.get('modeId');

    // Получаем актуальный номер патча
    const patchData = await getPatchNumber();
    const patch = patchData?.patch_string;

    // Формируем объект для валидации
    const data = {
      classId: Number(classId),
      specializationId: Number(specializationId),
      modeId: Number(modeId),
      patch,
    };

    // Валидация с помощью Zod
    const validatedData = createGuideSchemas.parse(data);

    // Создаём гайд через Prisma с пустым OverviewGear
    const guide = await prisma.guide.create({
      data: {
        classId: validatedData.classId,
        specializationId: validatedData.specializationId,
        modeId: validatedData.modeId,
        patch: validatedData.patch,
        overviewGears: {
          create: slotTypes.map(slotType => ({
            itemSlot: slotType,
          })),
        },
      },
      include: {
        class: true,
        specialization: true,
        overviewGears: true,
      },
    });

    // Обновляем кэш страницы
    revalidatePath('/class-guides');

    return {
      success: true,
      guide: {
        id: guide.id,
        className: guide.class.name,
        specializationName: guide.specialization.name,
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
