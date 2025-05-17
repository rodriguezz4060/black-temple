import { prisma } from '@prisma/prisma-client';

// Экспортируем generateMetadata для динамического заголовка
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;

  // Если slug отсутствует (например, для /class-guides), возвращаем общий заголовок
  if (!slug) {
    return {
      title: 'Гайды по классам - World of Warcraft',
      description:
        'Список гайдов по классам и специализациям для World of Warcraft',
    };
  }

  // Извлекаем ID из slug
  const slugParts = slug.split('-');
  const id = Number(slugParts.pop());

  if (isNaN(id)) {
    return {
      title: 'Гайд не найден',
    };
  }

  // Запрашиваем данные гайда
  const guide = await prisma.guide.findFirst({
    where: { id },
    include: {
      class: true,
      specialization: true,
    },
  });

  if (!guide) {
    return {
      title: 'Гайд не найден',
      description: 'Запрошенный гайд не найден',
    };
  }

  // Формируем заголовок
  const title = `${guide.class.name} ${guide.specialization.name} - Гайд`;

  return {
    title,
    description: `Гайд для ${guide.class.name} (${guide.specialization.name}) в World of Warcraft`,
    openGraph: {
      title,
      description: `Гайд для ${guide.class.name} (${guide.specialization.name})`,
      url: `/class-guides/${slug}`,
      images: [guide.specialization.specBackground || '/default-image.jpg'],
    },
  };
}

// Компонент Layout
export default async function ClassGuidesLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>;
}) {
  return <div>{children}</div>;
}
