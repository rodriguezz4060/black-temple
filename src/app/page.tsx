import { prisma } from '@prisma/prisma-client';
import { Container } from '@root/components/shared';
import { MainPage } from '@root/components/shared/main-page';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const guides = await prisma.guide.findMany({
    where: { status: 'PUBLISHED' },
    take: 12,
    orderBy: { createdAt: 'desc' },

    select: {
      id: true,
      slug: true,
      user: {
        select: {
          fullName: true,
        },
      },
      class: {
        select: { name: true, classColor: true, classIcon: true },
      },
      specialization: {
        select: {
          name: true,
          specIcon: true,
          specBackground: true,
          specRole: { select: { name: true, roleIcon: true } },
        },
      },
      modeRelation: {
        select: {
          name: true,
          activityIcon: true,
          activityBg: true,
        },
      },
      expansion: {
        select: {
          name: true,
          patchName: true,
          patchVersion: true,
        },
      },
    },
  });

  if (!guides) {
    return redirect('/not-found');
  }
  return (
    <>
      <Container className='secondary'>
        <div className='flex flex-col'>
          <div className='flex flex-col border-b border-[#2B2B2B] contain-inline-size'>
            <div className='flex flex-wrap items-center gap-y-0'>
              <div className='flex max-w-100 items-center gap-1 p-3'>
                <span className='h-3 w-3 rounded-[2px] bg-blue-500'></span>
                <h2 className='text-[20px]'>Перейти к гайдам</h2>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-2 flex justify-center'>
          <Link href={'/class-guides'}>
            <div className='rounded-lg border-2 border-solid bg-gradient-to-br from-gray-800/20 to-gray-900 p-1 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20'>
              <Image
                src={'/assets/guides-button.png'}
                alt={'Гайды'}
                width={300}
                height={300}
                className='rounded-md'
                priority
              />
            </div>
          </Link>
        </div>
      </Container>
      <Container>
        <MainPage guides={guides} />
      </Container>
    </>
  );
}
