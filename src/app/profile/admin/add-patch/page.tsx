import { prisma } from '@prisma/prisma-client';
import AddPatchWow from '@root/components/shared/profile/admin/add-patch-wow';
import { getUserSession } from '@root/lib/get-user-session';
import { redirect } from 'next/navigation';
import { PatchData } from '../_actions/get-patch-number';

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

  const currentPatch = await PatchData();
  const expansions = await prisma.expansion.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <AddPatchWow
      currentPatch={currentPatch.patch}
      expansions={expansions || []}
    />
  );
}
