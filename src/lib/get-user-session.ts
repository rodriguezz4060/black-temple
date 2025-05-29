import { authOptions } from '@root/components/constants/auth-options';
import { getServerSession } from 'next-auth';
import { prisma } from '@prisma/prisma-client';

interface UserSession {
  user: {
    id: string;
    role: string;
    image: string | null;
  };
}

export const getUserSession = async (): Promise<UserSession | null> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const user = await prisma.user.findFirst({
    where: { id: Number(session.user.id) },
    select: { id: true, role: true, avatar: true },
  });

  if (!user) return null;

  return {
    ...session,
    user: {
      ...session.user,
      role: user.role,
      image: user.avatar || null,
    },
  };
};
