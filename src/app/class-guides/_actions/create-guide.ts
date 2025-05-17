'use server';

import { prisma } from '@prisma/prisma-client';
import { createGuideSchemas } from '@root/components/shared/class-guides/editor/schemas/create-guide-schemas';
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

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/guides`;

    // Вызываем API route для создания гайда
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Не удалось создать гайд');
    }

    return { success: true, guideId: result.guide.id };
  } catch (error) {
    console.error('Ошибка в createGuideAction:', error);
    if (error instanceof z.ZodError) {
      // Формируем читаемые сообщения об ошибках
      const errorMessages = error.errors.map(err => err.message).join(', ');
      return { success: false, error: `Ошибка валидации: ${errorMessages}` };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Не удалось создать гайд',
    };
  }
}
