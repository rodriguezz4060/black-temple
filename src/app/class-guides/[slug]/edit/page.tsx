import { Container } from '@root/components/shared';
import { prisma } from '@prisma/prisma-client';
import { notFound } from 'next/navigation';
import { CreateGuide } from '@root/components/shared/class-guides/editor/create-guide';

export default async function EditGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const guide = await prisma.guide.findFirst({
    where: { id: Number(id) },
    include: {
      heroTalents: {
        include: {
          tabs: true,
        },
      },
    },
  });

  if (!guide) {
    return notFound();
  }

  return (
    <>
      <Container className='secondary px-4 pb-10'>
        <CreateGuide guide={guide} />
      </Container>
    </>
  );
}
