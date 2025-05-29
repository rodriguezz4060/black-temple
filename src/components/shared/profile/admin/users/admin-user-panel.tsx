'use client';

import { useAdminUsers } from '@root/components/hooks/admin-panel/user-manager/use-admin-users';
import { SearchBar } from './search-bar';
import { UserTable } from './user-table';
import { PaginationControls } from './pagination-controls';

export interface AdminUsersPanelProps {
  users: {
    id: number;
    fullName: string;
    email: string;
    role: string;
  }[];
}

export default function AdminUsersPanel({ users }: AdminUsersPanelProps) {
  const {
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
  } = useAdminUsers(users);

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Управление пользователями</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
      <UserTable
        paginatedUsers={paginatedUsers}
        selectedRoles={selectedRoles}
        pendingStates={pendingStates}
        handleRoleChange={handleRoleChange}
        handleSaveRole={handleSaveRole}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <div className='mt-2 text-sm'>
        Всего пользователей: {filteredUsers.length}
      </div>
    </div>
  );
}
