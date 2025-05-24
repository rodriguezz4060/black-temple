import { authOptions } from '@root/components/constants/auth-options';
import { getServerSession } from 'next-auth';

export const getUserSession = async function () {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
