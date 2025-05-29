import { cn } from '@root/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Container } from '@root/components/shared';
import { HeaderRight } from './header-right';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('bg-[#F0F8FF] dark:bg-black', className)}>
      <Container className='flex items-center justify-between py-3 dark:bg-black'>
        {/* Левая часть */}
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={42}
              height={42}
              className='h-auto w-auto'
              priority
            />
            <div>
              <h1 className='text-2xl font-black uppercase'>Black Temple</h1>
            </div>
          </Link>
        </div>

        {/* Правая часть */}
        <HeaderRight />
      </Container>
    </header>
  );
};
