import { ProfilePage } from '@root/components/shared/profile/profile-page';
import { getUserSession } from '@root/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  return <ProfilePage data={session.user} />;
}
