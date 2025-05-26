'use client';

import { cn } from '@root/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Container, DarkModeToggle } from '.';
import { AuthModal } from './auth-form/auth-modal';
import { ProfileButton } from './profile/profile-button';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  return (
    <header className={cn('bg-[#F0F8FF] dark:bg-black', className)}>
      <Container className='flex items-center justify-between py-3 dark:bg-black'>
        {/* Левая часть */}

        <div className='flex items-center gap-2'>
          <Image src='/logo.png' alt='Logo' width={50} height={50} />
          <div>
            <h1 className='text-2xl font-black uppercase'>Black Temple</h1>
          </div>
        </div>

        {/* Правая часть */}

        <div className='flex items-center gap-3'>
          <DarkModeToggle />

          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSingIn={() => setOpenAuthModal(true)} />
        </div>
      </Container>
    </header>
  );
};
