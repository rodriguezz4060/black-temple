import { notFound } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { GuideEditor } from '@root/components/shared/class-guides/editor/guide-editor';
import { Container } from '@root/components/shared';

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

  return (
    <Container className='secondary max-w-[1250px] px-4 pb-10'>
      <GuideEditor guide={guide} />
    </Container>
  );
}
