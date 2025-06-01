'use server';

import { prisma } from '@prisma/prisma-client';
import { authOptions } from '@root/components/constants/auth-options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

type GuideStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

const statusTranslations: Record<GuideStatus, string> = {
  DRAFT: 'Черновик',
  PUBLISHED: 'Опубликован',
  ARCHIVED: 'Архив',
};

export async function updateGuideStatus(guideId: number, status: GuideStatus) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Неавторизованный доступ');
    }

    // Проверка валидности userId
    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      throw new Error('Невалидный идентификатор пользователя');
    }

    // Проверка существования гайда
    const guide = await prisma.guide.findUnique({
      where: { id: guideId },
      select: {
        id: true,
        status: true,
        userId: true,
        slug: true,
        updatedAt: true,
      },
    });

    if (!guide) {
      throw new Error('Гайд не найден');
    }

    // Проверка прав доступа (автор или админ)
    if (guide.userId !== userId && session.user.role !== 'ADMIN') {
      throw new Error('Недостаточно прав для изменения статуса гайда');
    }

    // Проверка, если статус не изменился
    if (guide.status === status) {
      throw new Error(
        `Гайд уже находится в статусе: ${statusTranslations[status]}`
      );
    }

    // Проверка валидности slug
    if (!guide.slug) {
      throw new Error('Гайд не имеет корректного slug');
    }

    // Обновление статуса
    const updatedGuide = await prisma.guide.update({
      where: { id: guideId },
      data: {
        status,
        updatedAt: new Date(),
        ...(status === 'PUBLISHED' && !guide.updatedAt
          ? { publishedAt: new Date() }
          : {}),
      },
      select: { id: true, slug: true, status: true },
    });

    // Инвалидация кэша
    try {
      revalidatePath('/class-guides', 'page');
      revalidatePath(`/class-guides/${updatedGuide.slug}`, 'page');
    } catch (cacheError) {
      console.error('Ошибка при инвалидации кэша:', cacheError);
    }

    return {
      message: `Гайд успешно переведен в статус: ${statusTranslations[status]}`,
      guide: updatedGuide,
    };
  } catch (error) {
    console.error('Ошибка в updateGuideStatus:', {
      guideId,
      status,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Ошибка при обновлении статуса гайда'
    );
  }
}
