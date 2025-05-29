import { Button } from '@root/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface Props {
  setType: React.Dispatch<React.SetStateAction<'login' | 'email' | 'register'>>;
}

export const LoginForm: React.FC<Props> = ({ setType }) => {
  return (
    <div className='flex w-[80%] flex-col gap-4'>
      <p className='text-center text-xl font-bold'>Вход</p>

      {/* <Button
        variant='blue'
        onClick={() =>
          signIn('google', {
            callbackUrl: '/',
            redirect: true,
          })
        }
        type='button'
        className='bg-secondary flex cursor-pointer items-center gap-2 text-sm font-bold'
      >
        <Image
          className='h-6 w-6'
          src='/google24px.svg'
          width={24}
          height={24}
          alt='Google'
        />
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
        className='bg-secondary flex cursor-pointer items-center gap-2 text-sm font-bold'
      >
        <Github size={24} />
        GitHub
      </Button> */}

      <Button
        variant='blue'
        onClick={() => setType('email')}
        type='button'
        className='bg-secondary flex cursor-pointer items-center gap-2 text-sm font-bold'
      >
        <Mail size={24} />
        Войти по E-Mail
      </Button>
    </div>
  );
};
