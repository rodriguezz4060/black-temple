'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { updateUserRole } from '@root/app/profile/admin/_actions/update-user-role';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export const useAdminUsers = (initialUsers: User[]) => {
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pendingStates, setPendingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [, startTransition] = useTransition();

  const filteredUsers = initialUsers.filter(
    user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRoleChange = (userId: number, role: string) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: role }));
  };

  const handleSaveRole = (userId: number) => {
    setPendingStates(prev => ({ ...prev, [userId]: true }));
    startTransition(async () => {
      const result = await updateUserRole(userId, selectedRoles[userId]);
      if (result.success) {
        toast.success('Роль пользователя успешно обновлена');
      } else {
        toast.error('Ошибка');
      }
      setPendingStates(prev => ({ ...prev, [userId]: false }));
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return {
    searchQuery,
    setSearchQuery,
    itemsPerPage,
    currentPage,
    totalPages,
    paginatedUsers,
    filteredUsers,
    selectedRoles,
    pendingStates,
    handleRoleChange,
    handleSaveRole,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
