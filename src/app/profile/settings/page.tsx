import { prisma } from '@prisma/prisma-client';
import ProfileSettingsPage from '@root/components/shared/profile/settings/profile-settings-page';
import { getUserSession } from '@root/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function ProfileSettings() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.user.id) },
  });

  if (!user) {
    return redirect('/not-found');
  }

  return <ProfileSettingsPage data={user} />;
}
