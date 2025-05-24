'use client';

import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { EmailForm } from './forms/email-form';
import { Dialog, DialogContent } from '@root/components/ui/dialog';

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
      <DialogContent className='min-h-[700px] min-w-[700px] p-0'>
        <div className='flex w-full'>
          <div className='w-[40%]'>
            <img
              className='h-full rounded-l-md object-cover'
              src='/assets/images/login.jpg'
              alt='logo'
            />
          </div>
          <div className='flex h-full w-[60%] items-center justify-center'>
            {type === 'login' && (
              <LoginForm onClose={handleClose} setType={setType} />
            )}
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
