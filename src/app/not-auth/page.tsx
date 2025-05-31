'use client';

import { Button } from '@root/components/ui/button';
import { Title } from '@root/components/ui/title';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className='mt-20 flex flex-col items-center justify-center md:mt-40'>
      <div className='flex w-full max-w-[840px] flex-col items-center px-4 md:flex-row md:justify-between md:gap-12 md:px-0'>
        {/* Картинка теперь первой в DOM для мобильных */}
        <div className='mb-8 md:order-2 md:mb-0'>
          <Image
            src={'/assets/lock.png'}
            alt='Доступ запрещен'
            width={300}
            height={400}
            className='w-full max-w-[300px]'
          />
        </div>

        {/* Текстовый блок */}
        <div className='flex flex-col items-center text-center md:items-start md:text-left'>
          <div className='w-full max-w-[445px]'>
            <Title
              size='lg'
              text='Доступ запрещен'
              className='font-extrabold'
            />
            <p className='text-lg text-gray-400'>
              Для просмотра данной страницы необходимо авторизоваться
            </p>
          </div>

          <div className='mt-8 flex gap-5 md:mt-11'>
            <Link href='/'>
              <Button variant='outline' className='gap-2'>
                <ArrowLeft />
                На главную
              </Button>
            </Link>
            <a href=''>
              <Button
                variant='outline'
                className='border-gray-400 text-gray-500 hover:bg-gray-50'
              >
                Обновить
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
