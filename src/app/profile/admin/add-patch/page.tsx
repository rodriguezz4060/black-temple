import { prisma } from '@prisma/prisma-client';
import { PatchData } from '../_actions/get-patch-number';
import PatchesPage from '@root/components/shared/profile/admin/patches/patches-page';

export default async function AdminPanel() {
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
    />
  );
}
