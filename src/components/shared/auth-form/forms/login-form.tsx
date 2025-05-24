import { Button } from '@root/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React from 'react';

interface Props {
  onClose?: VoidFunction;
  setType: React.Dispatch<React.SetStateAction<'login' | 'email' | 'register'>>;
}

export const LoginForm: React.FC<Props> = ({ setType, onClose }) => {
  return (
    <div className='flex w-[80%] flex-col gap-4'>
      <p className='text-center text-xl font-bold'>Вход</p>

      <Button
        variant='blue'
        onClick={() =>
          signIn('google', {
            callbackUrl: '/',
            redirect: true,
          })
        }
        type='button'
        className='bg-secondary flex items-center gap-2 text-sm font-bold'
      >
        <img className='h-6 w-6' src='/google24px.svg' alt='Google' />
        Google
      </Button>

      <Button
        variant='blue'
        onClick={() =>
          signIn('github', {
            callbackUrl: '/',
            redirect: true,
          })
        }
        type='button'
        className='bg-secondary flex items-center gap-2 text-sm font-bold'
      >
        <Github size={24} />
        GitHub
      </Button>

      <Button
        variant='blue'
        onClick={() => setType('email')}
        type='button'
        className='bg-secondary flex items-center gap-2 text-sm font-bold'
      >
        <Mail size={24} />
        Войти по E-Mail
      </Button>
    </div>
  );
};
