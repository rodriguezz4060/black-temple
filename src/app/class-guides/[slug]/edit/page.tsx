import { notFound } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { transliterate } from 'transliteration';
import { GuideEditor } from '@root/components/shared/class-guides/editor/guide-editor';
import { Container } from '@root/components/shared';

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Разделяем slug на части
  const slugParts = slug.split('-');
  const id = slugParts.pop(); // Последняя часть — это ID

  // Ищем гайд по ID
  const guide = await prisma.guide.findFirst({
    where: { id: Number(id) },
    include: {
      heroTalents: {
        include: {
          tabs: true,
        },
      },
      class: true,
      specialization: true,
      modeRelation: true,
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

  // Проверяем, что slug соответствует ожидаемому формату
  const expectedSlug = `${transliterate(guide.class.name)}-${transliterate(
    guide.specialization.name
  )}-${guide.id}`
    .toLowerCase()
    .replace(/\s+/g, '-');

  if (slug !== expectedSlug) {
    // Если slug не совпадает, делаем редирект на правильный
    return {
      redirect: {
        destination: `/class-guides/${expectedSlug}`,
        permanent: true,
      },
    };
  }

  return (
    <Container className='secondary max-w-[1250px] px-4 pb-10'>
      <GuideEditor guide={guide} />
    </Container>
  );
}
