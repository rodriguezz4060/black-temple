'use client';

import { Button } from '@root/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@root/components/ui/select';
import { TableCell, TableRow } from '@root/components/ui/table';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

interface UserRowProps {
  user: User;
  selectedRoles: { [key: string]: string };
  pendingStates: { [key: string]: boolean };
  handleRoleChange: (userId: number, role: string) => void;
  handleSaveRole: (userId: number) => void;
}

export function UserRow({
  user,
  selectedRoles,
  pendingStates,
  handleRoleChange,
  handleSaveRole,
}: UserRowProps) {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Select
          value={selectedRoles[user.id] || user.role}
          onValueChange={value => handleRoleChange(user.id, value)}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Выберите роль' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='USER'>Пользователь</SelectItem>
            <SelectItem value='WRITER'>Редактор</SelectItem>
            <SelectItem value='MODERATOR'>Модератор</SelectItem>
            <SelectItem value='ADMIN'>Администратор</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className='relative w-[120px]'>
        <Button
          onClick={() => handleSaveRole(user.id)}
          disabled={
            selectedRoles[user.id] === user.role || pendingStates[user.id]
          }
          loading={pendingStates[user.id] || false}
        >
          Сохранить
        </Button>
      </TableCell>
    </TableRow>
  );
}
