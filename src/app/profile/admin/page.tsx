import { prisma } from '@prisma/prisma-client';
import AdminPage from '@root/components/shared/profile/admin/admin-page';
import { getUserSession } from '@root/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function AdminPanel() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  if (user.role !== 'ADMIN') {
    return redirect('/not-auth');
  }

  return <AdminPage />;
}
