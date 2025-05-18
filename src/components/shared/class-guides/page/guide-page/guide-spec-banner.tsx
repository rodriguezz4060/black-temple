import Image from 'next/image';

interface GuideSpecBannerProps {
  specBanner: string;
  spec: string;
}

export const GuideSpecBanner = ({ specBanner, spec }: GuideSpecBannerProps) => {
  return (
    <div className='relative flex h-[429px] w-[104px] flex-[0_0_104px] items-center justify-center overflow-hidden rounded-[12px_12px_12px_120px] border'>
      <Image
        width={106}
        height={414}
        alt={spec}
        className='h-full w-auto max-w-none brightness-80'
        src={specBanner}
      />
      <Image
        width={60}
        height={60}
        alt='WoW'
        className='absolute bottom-[14%] h-[48px] w-[48px]'
        src='/assets/wow-retail-icon-v3.webp'
      />
    </div>
  );
};
