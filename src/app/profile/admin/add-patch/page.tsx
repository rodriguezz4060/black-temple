import { prisma } from '@prisma/prisma-client';
import { getUserSession } from '@root/lib/get-user-session';
import { redirect } from 'next/navigation';
import { PatchData } from '../_actions/get-patch-number';
import PatchesPage from '@root/components/shared/profile/admin/patches/patches-page';

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

  const isAdmin = user.role === 'ADMIN';

  const currentPatch = await PatchData();
  const expansions = await prisma.expansion.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <PatchesPage
      currentPatch={currentPatch.patch}
      initialExpansions={expansions || []}
      isAdmin={isAdmin}
    />
  );
}
