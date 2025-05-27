'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@root/components/ui/table';
import { UserRow } from './user-row';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

interface UserTableProps {
  paginatedUsers: User[];
  selectedRoles: { [key: string]: string };
  pendingStates: { [key: string]: boolean };
  handleRoleChange: (userId: number, role: string) => void;
  handleSaveRole: (userId: number) => void;
}

export function UserTable({
  paginatedUsers,
  selectedRoles,
  pendingStates,
  handleRoleChange,
  handleSaveRole,
}: UserTableProps) {
  return (
    <Table className='max-w-[90%] border'>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Никнейм</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map(user => (
            <UserRow
              key={user.id}
              user={user}
              selectedRoles={selectedRoles}
              pendingStates={pendingStates}
              handleRoleChange={handleRoleChange}
              handleSaveRole={handleSaveRole}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className='text-center'>
              Пользователи не найдены
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
