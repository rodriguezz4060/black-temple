'use client';

import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { EmailForm } from './forms/email-form';
import { Dialog, DialogContent, DialogTitle } from '@root/components/ui/dialog';
import Image from 'next/image';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'email' | 'register'>(
    'login'
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent
        className='aria-describedby={undefined} min-h-[700px] min-w-[700px] p-0'
        aria-describedby={undefined}
      >
        <div className='flex w-full'>
          <div className='w-[40%]'>
            <Image
              className='h-full rounded-l-md object-cover'
              src='/assets/login.jpg'
              alt='logo'
              width={700}
              height={700}
            />
          </div>
          <div className='flex h-full w-[60%] items-center justify-center'>
            {type === 'login' && <LoginForm setType={setType} />}
            {type === 'register' && (
              <RegisterForm onClose={handleClose} setType={setType} />
            )}
            {type === 'email' && (
              <EmailForm onClose={handleClose} setType={setType} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
