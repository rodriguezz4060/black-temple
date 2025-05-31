'use client';

import React, { useState } from 'react';
import { LogIn, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@root/components/ui/button';
import { cn } from '@root/lib/utils';
import { ProfileAvatar } from '../profile/profile-avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@root/components/ui/popover';
import { useProfileForm } from '@root/components/hooks/profile/use-profile-form';
import { Separator } from '@root/components/ui/separator';

interface Props {
  name?: string | null;
  avatar?: string | null;
  isAuthenticated: boolean;
  onClickSignIn: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  avatar,
  name,
  isAuthenticated,
  onClickSignIn,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onClickSignOut } = useProfileForm();

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn('flex w-full flex-1 justify-center', className)}>
      {!isAuthenticated ? (
        <Button onClick={onClickSignIn} aria-label='Войти в аккаунт'>
          <LogIn size={16} className='mr-2' />
          Войти
        </Button>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <ProfileAvatar
              className='h-11 w-11 cursor-pointer text-[26px] ring-2 ring-transparent transition-all hover:ring-blue-400 dark:hover:ring-blue-500'
              fullName={name ?? ''}
              avatar={avatar ?? ''}
            />
          </PopoverTrigger>
          <PopoverContent align='end' className='w-36 p-0'>
            <div className='grid gap-1 p-2'>
              <Link
                href='/profile'
                onClick={handleItemClick}
                className='flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <User className='h-4 w-4' />
                <span>Профиль</span>
              </Link>
              <Link
                href='/profile/settings'
                onClick={handleItemClick}
                className='flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <Settings className='h-4 w-4' />
                <span>Настройки</span>
              </Link>
              <Separator />
              <Link
                href='#'
                onClick={e => {
                  e.preventDefault();
                  handleItemClick();
                  onClickSignOut();
                }}
                className='flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <LogOut className='h-4 w-4' />
                <span>Выход</span>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
