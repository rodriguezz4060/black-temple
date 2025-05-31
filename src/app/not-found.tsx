'use client';

import { Button } from '@root/components/ui/button';
import { Title } from '@root/components/ui/title';
import { cn } from '@root/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className='mt-40 flex flex-col items-center justify-center pb-40'>
      <div className='gap-12} flex w-[840px] items-center justify-between'>
        <div className='flex flex-col'>
          <div className='w-[445px]'>
            <Title
              size='lg'
              text='Такой страницы не существует'
              className='font-extrabold'
            />
            <p className='text-lg text-gray-400'>
              Вернитесь на главную или повторите проверьте ваш запрос
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

        <img src={imageUrl} alt={title} width={300} />
      </div>
    </div>
  );
}
