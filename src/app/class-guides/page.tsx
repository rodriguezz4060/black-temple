import { ClassGuidesPage, Container } from '@root/components/shared';
import { prisma } from '@prisma/prisma-client';
import { GuideData } from './_actions/create-guide';
import { unstable_cache } from 'next/cache';
import { cn } from '@root/lib/utils';

// Кэшируем запрос гайдов
const getCachedGuides = unstable_cache(
  async () => {
    return prisma.guide.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        slug: true,
        user: { select: { fullName: true } },
        class: { select: { name: true, classColor: true, classIcon: true } },
        specialization: {
          select: {
            name: true,
            specIcon: true,
            specBackground: true,
            specRole: { select: { name: true, roleIcon: true } },
          },
        },
        modeRelation: {
          select: { name: true, activityIcon: true, activityBg: true },
        },
        expansion: {
          select: { name: true, patchName: true, patchVersion: true },
        },
      },
      take: 100, // Ограничиваем до 100 гайдов для начальной загрузки
    });
  },
  ['guides'],
  { revalidate: 3600 }
);

// Кэшируем modeFilter
const getCachedModeFilter = unstable_cache(
  async () => {
    return prisma.mode.findMany({
      select: { id: true, name: true, activityIcon: true, activityBg: true },
    });
  },
  ['modeFilter'],
  { revalidate: 3600 }
);

// Кэшируем specFilter
const getCachedSpecFilter = unstable_cache(
  async () => {
    return prisma.classSpecialization.findMany({
      select: {
        id: true,
        name: true,
        specIcon: true,
        specBackground: true,
        class: { select: { name: true, classColor: true, classIcon: true } },
        specRole: { select: { name: true, roleIcon: true } },
      },
    });
  },
  ['specFilter'],
  { revalidate: 3600 }
);

// Метаданные для SEO
export const metadata = {
  title: 'Гайды по классам | Название сайта',
  description:
    'Ознакомьтесь с лучшими гайдами по классам и специализациям для вашей игры.',
};

// Основная страница
export default async function Page() {
  try {
    const [guides, modeFilter, specFilter, initialData] = await Promise.all([
      getCachedGuides(),
      getCachedModeFilter(),
      getCachedSpecFilter(),
      GuideData(),
    ]);

    return (
      <Container className={cn('px-5 md:pr-6 md:pl-[120px]')}>
        <ClassGuidesPage
          guides={guides}
          specFilter={specFilter}
          modeFilter={modeFilter}
          initialData={initialData}
        />
      </Container>
    );
  } catch (error) {
    console.error('Ошибка при загрузке данных страницы:', error);
    return (
      <Container className={cn('px-5 md:pr-6 md:pl-[120px]')}>
        <div className='py-4 text-center text-red-400'>
          Ошибка при загрузке данных. Попробуйте перезагрузить страницу.
        </div>
      </Container>
    );
  }
}
