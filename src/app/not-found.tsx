'use client';

import { Button } from '@root/components/ui/button';
import { Title } from '@root/components/ui/title';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className='mt-20 flex flex-col items-center justify-center pb-20 md:mt-40 md:pb-40'>
      <div className='flex w-full max-w-[840px] flex-col items-center gap-12 px-4 md:flex-row md:justify-between md:px-0'>
        {/* Изображение - теперь сверху на мобильных */}
        <Image
          src={'/assets/non-found.png'}
          alt='Страница не найдена'
          width={300}
          height={400}
          className='order-1 w-full max-w-[250px] md:order-2 md:max-w-[300px]'
        />

        {/* Текст и кнопки - теперь снизу на мобильных */}
        <div className='order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left'>
          <div className='w-full max-w-[445px]'>
            <Title
              size='lg'
              text='Такой страницы не существует'
              className='font-extrabold'
            />
            <p className='text-lg text-gray-400'>
              Вернитесь на главную или проверьте ваш запрос
            </p>
          </div>

          <div className='mt-11 flex gap-5'>
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
