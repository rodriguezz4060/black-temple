import { prisma } from '@prisma/prisma-client';
import ProfileSettingsSocial from '@root/components/shared/profile/settings/social/profile-settings-social';
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

  return <ProfileSettingsSocial data={user} />;
}
