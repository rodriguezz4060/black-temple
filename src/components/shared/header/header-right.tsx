'use client';

import React from 'react';
import { DarkModeToggle } from '@root/components/shared';
import { AuthModal } from '../auth-form/auth-modal';
import { ProfileButton } from './profile-button';
import { useSession } from 'next-auth/react';
import { Button } from '@root/components/ui/button';
import { Loader2 } from 'lucide-react';

export const HeaderRight: React.FC = () => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const { data: session, status } = useSession();
  console.log(session);
  if (status === 'loading') {
    return (
      <div className='flex items-center gap-3'>
        <DarkModeToggle />
        <Button variant='ghost' disabled className='flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin' />
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <DarkModeToggle />
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton
        avatar={session?.user?.image}
        name={session?.user?.name}
        isAuthenticated={status === 'authenticated'}
        onClickSignIn={() => setOpenAuthModal(true)}
      />
    </div>
  );
};
