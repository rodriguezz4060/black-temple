import { notFound } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { GuidePageContent } from '@root/components/shared/class-guides/page/guide-page';
import { getUserSession } from '@root/lib/get-user-session';

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getUserSession();

  const { slug } = await params;

  // Ищем гайд по slug
  const guide = await prisma.guide.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          avatar: true,
        },
      },
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
      sections: {
        include: {
          tabGroups: {
            include: {
              tabs: true,
            },
          },
          textFields: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!guide) {
    return notFound();
  }

  // Проверяем, если гайд в статусе DRAFT и пользователь не автор
  if (
    guide.status === 'DRAFT' &&
    (!session?.user?.id || Number(guide.user.id) !== Number(session.user.id))
  ) {
    return notFound();
  }

  return <GuidePageContent guide={guide} />;
}
