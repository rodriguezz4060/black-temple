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

  // Общие метаданные для страницы списка гайдов (/class-guides)
  if (!slug) {
    return {
      metadataBase,
      title: 'Гайды по классам - World of Warcraft',
      description:
        'Список гайдов по классам и специализациям для World of Warcraft',
      keywords: ['World of Warcraft', 'гайды', 'классы', 'специализации'],
      openGraph: {
        title: 'Гайды по классам - World of Warcraft',
        description:
          'Список гайдов по классам и специализациям для World of Warcraft',
        url: '/class-guides',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Гайды по классам - World of Warcraft',
        description:
          'Список гайдов по классам и специализациям для World of Warcraft',
      },
    };
  }

  // Извлекаем ID из slug (предполагается формат, например, warrior-protection-123)
  const slugParts = slug.split('-');
  const id = Number(slugParts.pop());

  // Проверяем, является ли ID числом
  if (isNaN(id)) {
    return {
      metadataBase,
      title: 'Гайд не найден | World of Warcraft',
      description: 'Запрошенный гайд не найден',
      openGraph: {
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
        url: `/class-guides/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
      },
    };
  }

  // Запрашиваем данные гайда из базы
  const guide = await prisma.guide.findFirst({
    where: { id },
    include: {
      class: true,
      specialization: true,
    },
  });

  // Если гайд не найден
  if (!guide) {
    return {
      metadataBase,
      title: 'Гайд не найден | World of Warcraft',
      description: 'Запрошенный гайд не найден',
      openGraph: {
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
        url: `/class-guides/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
      },
    };
  }

  // Формируем заголовок и описание
  const title = `${guide.class.name} ${guide.specialization.name} - Гайд`;
  const description = `Гайд для ${guide.class.name} (${guide.specialization.name}) в World of Warcraft`;

  return {
    metadataBase,
    title,
    description,
    keywords: [
      guide.class.name,
      guide.specialization.name,
      'World of Warcraft',
      'гайд',
      'WoW',
    ],
    openGraph: {
      title,
      description,
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
      description,
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
