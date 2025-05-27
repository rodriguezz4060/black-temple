'use client';

import React from 'react';
import { DarkModeToggle } from '@root/components/shared';
import { AuthModal } from '../auth-form/auth-modal';
import { ProfileButton } from '../profile/profile-button';

interface Props {
  isAuthenticated: boolean;
}

export const HeaderRight: React.FC<Props> = ({ isAuthenticated }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <div className='flex items-center gap-3'>
      <DarkModeToggle />
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton
        isAuthenticated={isAuthenticated}
        onClickSignIn={() => setOpenAuthModal(true)}
      />
    </div>
  );
};
