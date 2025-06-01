import Image from 'next/image';

interface GuideSpecBannerProps {
  specBanner: string;
  spec: string;
}

export const GuideSpecBanner = ({ specBanner, spec }: GuideSpecBannerProps) => {
  return (
    <div className='relative flex h-[429px] w-[104px] flex-[0_0_104px] items-center justify-center overflow-hidden rounded-[12px_12px_12px_120px] border'>
      {/* Основное изображение - исправленная версия */}
      <Image
        fill // Заполняет родительский контейнер
        alt={spec}
        className='object-cover brightness-80' // object-cover сохраняет пропорции
        src={specBanner}
        priority
        sizes='104px' // Оптимизация для Next.js
      />

      {/* Иконка WoW - можно оставить как было, так как здесь явные размеры */}
      <Image
        width={48}
        height={48}
        alt='WoW'
        className='absolute bottom-[14%] h-[48px] w-[48px]'
        src='/assets/wow-retail-icon-v3.webp'
        priority
      />
    </div>
  );
};
