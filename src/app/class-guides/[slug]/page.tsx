import { notFound } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { transliterate } from 'transliteration';
import { GuidePageContent } from '@root/components/shared/class-guides/page/guide-page';

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
      class: true, // Подключаем модель Class
      specialization: true, // Подключаем модель Specialization
      modeRelation: true,
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

  return <GuidePageContent guide={guide} />;
}
