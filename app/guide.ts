// app/actions/guide.ts
'use server';

import { prisma } from '@/prisma/prisma-client';
import { revalidatePath } from 'next/cache';

export async function getClasses() {
  return await prisma.classSelection.findMany({
    include: {
      specializations: true,
    },
  });
}

export async function createGuide({
  classId,
  specializationId,
  patch,
}: {
  classId: number;
  specializationId?: number;
  patch: string;
}) {
  const guide = await prisma.guide.create({
    data: {
      classId,
      specializationId: specializationId || null,
      patch,
      heroTalents: {
        create: {
          tabs: {
            create: [
              {
                value: 'tab1',
                label: 'Таланты',
                content: 'Здесь будет ваш контент...',
              },
              {
                value: 'tab2',
                label: 'Ротация',
                content: 'Описание ротации...',
              },
            ],
          },
        },
      },
    },
    include: {
      class: true,
      specialization: true,
    },
  });

  revalidatePath('/guides');
  return guide;
}
