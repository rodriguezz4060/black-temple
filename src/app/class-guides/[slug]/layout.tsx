import { prisma } from '@prisma/prisma-client';

// Определяем базовый URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return {
      metadataBase: new URL(baseUrl),
      title: 'Гайды по классам - World of Warcraft',
      description:
        'Список гайдов по классам и специализациям для World of Warcraft',
      keywords: ['World of Warcraft', 'гайды', 'классы', 'специализации'],
      openGraph: {
        title: 'Гайды по классам - World of Warcraft',
        description:
          'Список гайдов по классам и специализациям для World of Warcraft',
        url: `${baseUrl}/class-guides`,
        images: [
          {
            url: `${baseUrl}/assets/meta/class-guides.png`,
            width: 1200,
            height: 630,
            alt: 'Гайды по классам WoW',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Гайды по классам - World of Warcraft',
        description:
          'Список гайдов по классам и специализациям для World of Warcraft',
        images: [`${baseUrl}/assets/meta/class-guides.png`],
      },
    };
  }

  // Извлекаем ID из slug
  const slugParts = slug.split('-');
  const id = slugParts.pop();

  if (!id || isNaN(Number(id))) {
    return {
      metadataBase: new URL(baseUrl),
      title: 'Гайд не найден | World of Warcraft',
      description: 'Запрошенный гайд не найден',
      openGraph: {
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
        url: `${baseUrl}/class-guides/${slug}`,
      },
      twitter: {
        card: 'summary',
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден',
      },
    };
  }

  // Запрашиваем данные гайда
  const guide = await prisma.guide.findUnique({
    where: { id: Number(id) },
    include: {
      class: true,
      specialization: true,
      modeRelation: true,
      expansion: true,
    },
  });

  if (!guide || guide.status !== 'PUBLISHED') {
    return {
      metadataBase: new URL(baseUrl),
      title: 'Гайд не найден | World of Warcraft',
      description: 'Запрошенный гайд не найден или не опубликован',
      openGraph: {
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден или не опубликован',
        url: `${baseUrl}/class-guides/${slug}`,
      },
      twitter: {
        card: 'summary',
        title: 'Гайд не найден',
        description: 'Запрошенный гайд не найден или не опубликован',
      },
    };
  }

  // Формируем метаданные для конкретного гайда
  const title = `${guide.class.name} ${guide.specialization.name} - Гайд | Black Temple`;
  const description = `Подробный гайд для ${guide.class.name} (${guide.specialization.name}) в World of Warcraft для ${guide.modeRelation.name} (Patch ${guide.expansion.patchVersion})`;
  const imageUrl = guide.specialization.specBackground.startsWith('http')
    ? guide.specialization.specBackground
    : `${baseUrl}${guide.specialization.specBackground}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      guide.class.name,
      guide.specialization.name,
      guide.modeRelation.name,
      'World of Warcraft',
      'гайд',
      'WoW',
      'Black Temple',
      guide.expansion.patchVersion,
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/class-guides/${slug}`,
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/class-guides/${slug}`,
    },
  };
}

export default async function ClassGuidesLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>;
}) {
  return <div className='container mx-auto px-4'>{children}</div>;
}
