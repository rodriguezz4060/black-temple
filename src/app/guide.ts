"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@prisma/prisma-client";

export async function getClasses() {
  return await prisma.classSelection.findMany({
    include: {
      specializations: true,
    },
  });
}

export async function getModes() {
  return await prisma.mode.findMany();
}

export async function createGuide({
  classId,
  specializationId,
  modeId,
  patch,
}: {
  classId: number;
  specializationId: number;
  modeId: number;
  patch: string;
}) {
  const guide = await prisma.guide.create({
    data: {
      classId,
      specializationId,
      modeId,
      patch,
      heroTalents: {
        create: {
          tabs: {
            create: [
              {
                value: "tab1",
                label: "Таланты",
                content: "Здесь будет ваш контент...",
              },
              {
                value: "tab2",
                label: "Ротация",
                content: "Описание ротации...",
              },
            ],
          },
        },
      },
    },
    include: {
      class: true,
      specialization: true,
      modeRelation: true,
    },
  });

  revalidatePath("/guides");
  return guide;
}
