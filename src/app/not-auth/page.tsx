'use client';

import { InfoBlock } from '@root/components/shared/info-block';

export default function UnauthorizedPage() {
  return (
    <div className='mt-40 flex flex-col items-center justify-center'>
      <InfoBlock
        title='Доступ запрещен'
        text='Для просмотра данной страницы необходимо авторизоваться'
        imageUrl='/assets/lock.png'
      />
    </div>
  );
}
