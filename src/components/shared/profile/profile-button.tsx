'use client';

import React from 'react';
import { CircleUser, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@root/components/ui/button';
import { cn } from '@root/lib/utils';

interface Props {
  isAuthenticated: boolean;
  onClickSignIn: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
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
          <Button aria-label='Перейти в профиль'>
            <CircleUser size={18} className='mr-2' />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
