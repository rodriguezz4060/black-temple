import { notFound, redirect } from 'next/navigation';
import { prisma } from '@prisma/prisma-client';
import { GuideEditor } from '@root/components/shared/class-guides/editor/guide-editor';
import { Container } from '@root/components/shared';
import { getUserSession, UserSession } from '@root/lib/get-user-session';

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Получаем сессию текущего пользователя
  const session: UserSession | null = await getUserSession();

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!session?.user?.id) {
    redirect('/login');
  }

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

  // Если гайд не найден, возвращаем 404
  if (!guide) {
    return notFound();
  }

  // Проверяем, является ли текущий пользователь автором гайда
  if (Number(guide.user.id) !== Number(session.user.id)) {
    return redirect('/not-auth');
  }

  return (
    <Container className='secondary max-w-[1250px] px-4 pb-10'>
      <GuideEditor guide={guide} />
    </Container>
  );
}
