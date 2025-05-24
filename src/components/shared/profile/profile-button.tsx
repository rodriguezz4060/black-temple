'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import { CircleUser, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@root/components/ui/button';
import { cn } from '@root/lib/utils';

interface Props {
  onClickSingIn: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSingIn,
  className,
}) => {
  const { data: session } = useSession();

  return (
    <div className={cn('flex w-full flex-1 justify-center', className)}>
      {!session ? (
        <Button onClick={onClickSingIn}>
          <LogIn size={16} className='mr-2' />
          Войти
        </Button>
      ) : (
        <Link href='/profile'>
          <Button>
            <CircleUser size={18} className='mr-2' />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
