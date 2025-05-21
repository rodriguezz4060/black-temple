import { prisma } from '@prisma/prisma-client';

// Задаем metadataBase в зависимости от окружения
const metadataBase = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
  : new URL('http://localhost:3000');

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;

  // Если slug отсутствует (например, для /class-guides), возвращаем общий заголовок
  if (!slug) {
    return {
      metadataBase,
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
      metadataBase,
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
      metadataBase,
      title: 'Гайд не найден',
      description: 'Запрошенный гайд не найден',
    };
  }

  // Формируем заголовок
  const title = `${guide.class.name} ${guide.specialization.name} - Гайд`;

  return {
    metadataBase, // Указываем metadataBase
    title,
    description: `Гайд для ${guide.class.name} (${guide.specialization.name}) в World of Warcraft`,
    openGraph: {
      title,
      description: `Гайд для ${guide.class.name} (${guide.specialization.name})`,
      url: `/class-guides/${slug}`,
      images: [
        {
          url: guide.specialization.specBackground,
          width: 1200,
          height: 630,
          alt: `${guide.class.name} ${guide.specialization.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Гайд для ${guide.class.name} (${guide.specialization.name})`,
      images: [guide.specialization.specBackground],
    },
  };
}

// Layout
export default async function ClassGuidesLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>;
}) {
  return <div>{children}</div>;
}
