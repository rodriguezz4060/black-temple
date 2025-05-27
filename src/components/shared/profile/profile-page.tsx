import React from 'react';
import { Container } from '@root/components/shared/container';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import { Button } from '@root/components/ui/button';
import Link from 'next/link';
import { User } from '@prisma/client';

interface Props {
  user: User | null;
  data: {
    id: string;
    role: string;
  };
}

export const ProfilePage: React.FC<Props> = ({ data, user }) => {
  const canAccessAdmin = data.role === 'ADMIN';

  return (
    <Container className='my-5 max-w-[1000px]'>
      <div className='mx-2 rounded-xl bg-[#F0F4F8] leading-5 lg:mx-0 dark:bg-[#171717]'>
        <div>
          <Image
            src={'/assets/profile/covers/profile-cover-silvana.jpg'}
            alt={''}
            width={1100}
            height={170}
            className='h-[170px] rounded-t-xl object-cover object-center'
          />
          <div className='mx-4 -mt-10 lg:mx-6'>
            <div className='mb-2 flex w-full justify-between'>
              <span className='hover:border-theme bg-secondary hover:bg-secondary relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-none border-transparent'>
                <Image
                  src={'/assets/wow-retail-icon-v3.webp'}
                  alt={''}
                  width={92}
                  height={92}
                  className='m-auto aspect-square h-full w-full rounded-full'
                  priority
                />
              </span>
              <div className='flex items-center'>
                <div className='mt-16'></div>
                <div className='hover:text-theme mt-auto flex cursor-pointer items-center gap-2 font-bold'>
                  {canAccessAdmin && (
                    <Link href={'/profile/admin'}>
                      <Button>Admin</Button>
                    </Link>
                  )}
                  <Settings width={24} hanging={24} />
                </div>
              </div>
            </div>
            <span className='text-2xl font-bold'>Rodriguez</span>
          </div>
        </div>
        <div className='mx-4 lg:mx-6'>
          <p className='text-md mt-2 text-justify'></p>
          <div className='bg-primary/5 mt-4 rounded-xl p-4'>social</div>
          <div className='mt-2 flex'>
            <button
              className='ring-offset-background text-foreground inline-flex h-10 w-26 items-center justify-center rounded-none border-b-4 bg-transparent p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:outline-none active:translate-y-[1px] disabled:pointer-events-none disabled:bg-transparent disabled:opacity-50'
              type='button'
            >
              Мои гайды
            </button>
            <button
              className='ring-offset-background text-foreground inline-flex h-10 w-26 items-center justify-center rounded-none bg-transparent p-0 text-sm font-medium whitespace-nowrap transition-colors hover:bg-transparent focus-visible:outline-none active:translate-y-[1px] disabled:pointer-events-none disabled:bg-transparent disabled:opacity-50'
              type='button'
            >
              Черновики
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
