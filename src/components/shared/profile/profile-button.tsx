'use client';

import React from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@root/components/ui/button';
import { cn } from '@root/lib/utils';
import { ProfileAvatar } from './profile-avatar';

interface Props {
  name?: string | null;
  avatar?: string | null;
  isAuthenticated: boolean;
  onClickSignIn: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  avatar,
  isAuthenticated,
  onClickSignIn,
  className,
}) => {
  return (
    <div className={cn('flex w-full flex-1 justify-center', className)}>
      {!isAuthenticated ? (
        <Button onClick={onClickSignIn} aria-label='Войти в аккаунт'>
          <LogIn size={16} className='mr-2' />
          Войти
        </Button>
      ) : (
        <Link href='/profile'>
          <ProfileAvatar
            className='h-12 w-12'
            fullName={name ?? ''}
            avatar={avatar ?? ''}
          />
        </Link>
      )}
    </div>
  );
};
