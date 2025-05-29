'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import { getUserSession } from '@root/lib/get-user-session';
import { revalidatePath } from 'next/cache';

export async function updateSocialInfo(body: Prisma.UserUpdateInput) {
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
        battleTag: body.battleTag,
        discord: body.discord,
        discordServer: body.discordServer,
        twitch: body.twitch,
        youtube: body.youtube,
        website: body.website,
        telegram: body.telegram,
        twitter: body.twitter,
        patreon: body.patreon,
        boosty: body.boosty,
      },
    });
    revalidatePath('/settings/social');
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}
