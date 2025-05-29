import { notFound } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { GuidePageContent } from '@root/components/shared/class-guides/page/guide-page';

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Ищем гайд по slug
  const guide = await prisma.guide.findUnique({
    where: { slug },
    include: {
      class: true,
      specialization: true,
      modeRelation: true,
      expansion: true,
      overviewDifficulty: true,
      overviewGears: {
        include: {
          itemSockets: true,
        },
      },
    },
  });

  if (!guide) {
    return notFound();
  }

  // Передаем данные в компонент GuidePageContent
  return <GuidePageContent guide={guide} />;
}
