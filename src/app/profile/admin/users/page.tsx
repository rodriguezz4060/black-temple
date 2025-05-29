import { prisma } from '@prisma/prisma-client';
import AdminUsersPanel from '@root/components/shared/profile/admin/users/admin-user-panel';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });

  return <AdminUsersPanel users={users} />;
}
