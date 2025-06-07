'use client';

import { Button } from '@root/components/ui/button';
import { Title } from '@root/components/ui/title';
import { cn } from '@root/lib/utils';
import { Facebook, LinkIcon, Twitter } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface GuideTitleProps {
  characterClass: string;
  classColor: string;
  spec: string;
  patch: string;
  mode: string;
  slug: string;
  authorId: number;
  updateDate: string;
  className?: string;
}

export const GuideTitle = ({
  characterClass,
  classColor,
  spec,
  patch,
  mode,
  slug,
  authorId,
  updateDate,
  className,
}: GuideTitleProps) => {
  const { data: session } = useSession();

  const handleCopy = async () => {
    try {
      // Получаем текущий URL страницы
      const currentUrl = window.location.href;

      // Копируем URL в буфер обмена
      await navigator.clipboard.writeText(currentUrl);

      // Показываем уведомление об успешном копировании
      toast.success('Ссылка скопирована в буфер обмена');
    } catch (err) {
      console.error('Ошибка при копировании URL: ', err);
      toast.error('Ошибка при копировании ссылки');
    }
  };

  // Проверяем, является ли текущий пользователь автором
  const isAuthor = Number(session?.user?.id) === authorId;

  return (
    <div>
      <div className='container mt-0 flex w-full flex-1 origin-top flex-col gap-y-4'>
        <div className='flex flex-row justify-between gap-4'>
          <div className='flex flex-col gap-6'>
            <Title
              text={`${spec} ${characterClass} Гайд ${mode}`}
              size='sm'
              className={cn(
                'font-title mt-0 md:text-3xl lg:mt-[-4px] lg:text-5xl lg:leading-tight',
                className
              )}
            />
            <div className='text-grey-275 mb-4 flex flex-wrap gap-x-4 gap-y-2 font-sans text-lg font-semibold'>
              <span className='flex h-9 items-center gap-6 rounded-sm bg-[#057AF0] pr-2.5 pl-2.5'>
                <span>Patch {patch}</span>
              </span>
              {isAuthor && (
                <Link href={`/class-guides/${slug}/edit`}>
                  <Button>Редактировать</Button>
                </Link>
              )}
            </div>
          </div>
          <div className='hidden lg:block'>
            <div>
              <div className='mt-4 lg:w-[300px]'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='border-dark-5 mb-3 flex flex-wrap items-center justify-between gap-2 border-b pb-3'>
        <div>
          <div className='text-grey-3 flex flex-col font-sans text-sm leading-tight md:text-base lg:text-lg'>
            <p className='flex flex-wrap items-center gap-2 whitespace-nowrap text-[#95989B]'>
              <span className='italic'>Последнее обновление:</span>
              <span className='italic'>
                {new Date(updateDate).toLocaleDateString('ru-RU')}
              </span>
              <span className='flex items-center gap-2'>
                <span>|</span>
                <a
                  href='#changelog-header'
                  className='inline cursor-pointer text-blue-500'
                >
                  Changelog
                </a>
              </span>
            </p>
          </div>
        </div>

        {/*Social*/}
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleCopy}
            className='bg-dark-4 border-dark-5 group hover:bg-dark-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors'
            title='Copy'
          >
            <LinkIcon className='h-5 w-5 text-gray-400 transition-colors group-hover:text-white' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                '_blank'
              )
            }
            className='bg-dark-4 border-dark-5 group hover:bg-dark-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors'
            title='Share on Twitter'
          >
            <Twitter className='h-5 w-5 text-gray-400 transition-colors group-hover:text-white' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                '_blank'
              )
            }
            className='bg-dark-4 border-dark-5 group hover:bg-dark-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors'
            title='Share on Facebook'
          >
            <Facebook className='h-5 w-5 text-gray-400 transition-colors group-hover:text-white' />
          </Button>
        </div>
      </div>
      <article className='mt-2'>
        <p>
          Добро пожаловать в гайд
          <strong>
            <strong
              style={{
                color: `${classColor}`,
              }}
            >
              {' '}
              {spec} {characterClass}
            </strong>
          </strong>{' '}
          {mode} для World of Warcraft версии {patch}! Это руководство содержит
          всё, что вам нужно знать, чтобы полностью освоить своего персонажа!
        </p>
      </article>
    </div>
  );
};
