import React from 'react';
import { Container } from '@root/components/shared/container';
import Image from 'next/image';
import { Settings, Twitch } from 'lucide-react';
import { Button } from '@root/components/ui/button';
import Link from 'next/link';
import { User } from '@prisma/client';
import { Twitter, Youtube } from 'lucide-react';
import { ProfileAvatar } from './profile-avatar';

interface Props {
  data: {
    id: string;
    role: string;
  };
  user: User;
}

export const ProfilePage: React.FC<Props> = ({ data, user }) => {
  const canAccessAdmin = data.role === 'ADMIN';

  // Проверка наличия данных для блока "Контакты"
  const hasContacts = user.battleTag || user.discord || user.telegram;

  // Проверка наличия данных для блока "Соцсети"
  const hasSocials =
    user.youtube || user.twitch || user.twitter || user.discordServer;

  // Проверка наличия данных для блока "Поддержка"
  const hasSupport = user.patreon || user.boosty;

  // Проверка наличия данных в поле bio
  const hasBio = user.bio && user.bio.trim() !== '';

  return (
    <Container className='my-5 max-w-[1000px]'>
      <div className='mx-2 rounded-xl bg-[#F0F4F8] leading-5 lg:mx-0 dark:bg-[#171717]'>
        <div>
          <Image
            src={'/assets/profile/covers/profile-cover-silvana.jpg'}
            alt={'Обложка профиля'}
            width={1100}
            height={170}
            className='rounded-t-xl object-contain object-center'
            priority
          />
          <div className='mx-4 -mt-10 lg:mx-6'>
            <div className='mb-2 flex w-full justify-between'>
              <ProfileAvatar
                fullName={user.fullName}
                avatar={user.avatar}
                className='h-26 w-26 text-6xl'
              />

              <div className='flex items-center'>
                <div className='mt-16'></div>
                <div className='hover:text-theme mt-auto flex cursor-pointer items-center gap-2 font-bold'>
                  {canAccessAdmin && (
                    <Link href={'/profile/admin'}>
                      <Button>Admin</Button>
                    </Link>
                  )}
                  <Link href={'/profile/settings'}>
                    <Button variant={'outline'} size={'icon'}>
                      <Settings width={24} height={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <span className='text-2xl font-bold'>{user.fullName}</span>
          </div>
        </div>
        <div className='mx-4 lg:mx-6'>
          <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
              {/* Контакты */}
              {hasContacts && (
                <div className='bg-muted/50 flex flex-col gap-4 rounded-xl border-1 p-4'>
                  <h3 className='text-lg font-semibold'>Контакты</h3>
                  <div className='flex flex-col gap-3'>
                    {user.battleTag && (
                      <div className='flex items-center gap-3'>
                        <Image
                          src='assets/icons/battlenet.svg'
                          alt='Battle.net'
                          className='h-5 w-5'
                          width={20}
                          height={20}
                        />
                        <span className='text-sm'>{user.battleTag}</span>
                      </div>
                    )}
                    {user.discord && (
                      <div className='flex items-center gap-3'>
                        <Image
                          src='assets/icons/discord.svg'
                          alt='Discord'
                          className='h-5 w-5'
                          width={20}
                          height={20}
                        />
                        <span className='text-sm'>{user.discord}</span>
                      </div>
                    )}
                    {user.telegram && (
                      <div className='flex items-center gap-3'>
                        <Image
                          src='/assets/icons/telegram.svg'
                          alt='Telegram'
                          className='h-5 w-5'
                          width={20}
                          height={20}
                        />
                        <Link
                          href={`https://t.me/${user.telegram}`}
                          className='text-sm hover:underline'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          @{user.telegram}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Соцсети */}
              {hasSocials && (
                <div className='bg-muted/50 flex flex-col gap-1 rounded-xl border-1 p-4'>
                  <h3 className='text-lg font-semibold'>Соцсети</h3>
                  <div className='flex flex-col'>
                    {user.discordServer && (
                      <Link
                        href={user.discordServer}
                        className='hover:bg-muted/30 flex items-center gap-2 rounded p-2 transition-colors'
                      >
                        <Image
                          src='/assets/icons/discord-server.svg'
                          alt='Discord Server'
                          className='h-[22px] w-[22px] dark:brightness-0 dark:invert dark:saturate-0'
                          width={20}
                          height={20}
                        />
                        <span>Мой сервер</span>
                      </Link>
                    )}
                    {user.youtube && (
                      <Link
                        href={user.youtube}
                        className='hover:bg-muted/30 flex items-center gap-3 rounded p-2 transition-colors'
                      >
                        <Youtube className='h-5 w-5' />
                        <span>YouTube</span>
                      </Link>
                    )}
                    {user.twitch && (
                      <a
                        href={user.twitch}
                        className='hover:bg-muted/30 flex items-center gap-3 rounded p-2 transition-colors'
                      >
                        <Twitch className='h-5 w-5' />
                        <span>Twitch</span>
                      </a>
                    )}
                    {user.twitter && (
                      <a
                        href={user.twitter}
                        className='hover:bg-muted/30 flex items-center gap-3 rounded p-2 transition-colors'
                      >
                        <Twitter className='h-5 w-5' />
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Поддержка */}
              {hasSupport && (
                <div className='bg-muted/50 flex flex-col gap-4 rounded-xl border-1 p-4'>
                  <h3 className='text-lg font-semibold'>Поддержка</h3>
                  <div className='flex flex-col gap-2'>
                    {user.patreon && (
                      <a
                        href={user.patreon}
                        className='hover:bg-muted/30 flex items-center gap-3 rounded p-2 transition-colors'
                      >
                        <Image
                          src='/assets/icons/patreon.svg'
                          alt='Patreon'
                          className='h-5 w-5'
                          width={20}
                          height={20}
                        />
                        <span>Patreon</span>
                      </a>
                    )}
                    {user.boosty && (
                      <a
                        href={user.boosty}
                        className='hover:bg-muted/30 flex items-center gap-3 rounded p-2 transition-colors'
                      >
                        <Image
                          src='/assets/icons/boosty.svg'
                          alt='Boosty'
                          className='h-5 w-5'
                          width={20}
                          height={20}
                        />
                        <span>Boosty</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className='text-md mt-2 text-justify'></p>
          <div>
            <span>О себе</span>
            <div className='bg-primary/5 mt-2 rounded-xl p-4'>
              {hasBio ? (
                user.bio
              ) : (
                <div>
                  <span>Информация отсутствует. </span>
                  <Link
                    href='/profile/settings'
                    className='text-sm text-blue-500 hover:underline'
                  >
                    Добавить информацию
                  </Link>
                </div>
              )}
            </div>
          </div>
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
