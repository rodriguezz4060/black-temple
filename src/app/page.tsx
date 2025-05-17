import { Container } from '@root/components/shared';
import { Title } from '@root/components/ui/title';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Container className='secondary px-4 pb-10 dark:bg-zinc-900'>
        <Title text='Black Temple' size='lg' className='pt-4 font-extrabold' />
      </Container>

      <Container className='dark:bg-zinc-900'>
        <div className='flex-1 pb-20'>
          <Link href='/class-guides'>Истребление</Link>
        </div>
      </Container>
    </>
  );
}
