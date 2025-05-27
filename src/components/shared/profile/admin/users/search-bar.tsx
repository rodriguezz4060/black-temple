'use client';

import { Input } from '@root/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@root/components/ui/select';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (value: string) => void;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  itemsPerPage,
  handleItemsPerPageChange,
}: SearchBarProps) {
  return (
    <div className='mb-4 flex items-center gap-4'>
      <Input
        placeholder='Поиск по имени или email'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className='max-w-sm'
      />
      <Select
        value={itemsPerPage.toString()}
        onValueChange={handleItemsPerPageChange}
      >
        <SelectTrigger className='w-[120px]'>
          <SelectValue placeholder='На странице' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='50'>50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
