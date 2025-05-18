import Image from 'next/image';
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@root/components/ui/select';

export const LeftSideBar = () => {
  return (
    <>
      <aside className='sticky top-5 z-10 container -mx-5 -mt-9 flex w-[calc(100%_+_40px)] shrink-0 origin-top-right flex-col self-start px-5 md:mx-0 md:w-full md:p-0 lg:mt-0 lg:block lg:h-auto lg:w-[228px] lg:bg-none lg:pr-4'>
        {/*Author*/}

        <div className='flex flex-col gap-3'>
          <div className='border-dark-5 relative hidden justify-between gap-5 rounded-lg border lg:block lg:flex-col lg:justify-start dark:bg-[#171717]'>
            <div className='flex justify-between gap-5 px-3 pt-4 pb-3 lg:flex-col lg:justify-start'>
              <div className='flex gap-[10px]'>
                <div className='border-dark-4 z-[1] flex h-[52px] w-[52px] shrink-0 grow-0 items-center justify-center overflow-hidden rounded-full border-4'>
                  <Image
                    src='https://cdn.discordapp.com/avatars/211007313476059136/bd48de04e1469782f73723661e7e74c1.webp'
                    alt='rodriga'
                    className='h-full w-full max-w-none'
                    width={52}
                    height={52}
                  />
                </div>
                <div className='flex items-center'>
                  <span className='flex flex-col items-start gap-[2px]'>
                    <span className='text-grey-1 font-sans text-sm leading-none font-light'>
                      Author
                    </span>
                    <span className='font-sans text-base leading-none font-bold'>
                      Rodriga
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*Anchor full screen*/}
          <div className='flex max-h-[calc(100vh-120px)] flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <div className='lg:border-dark-5 flex flex-1 flex-col gap-4 overflow-hidden rounded-lg lg:border lg:pt-3 lg:dark:bg-[#171717]'>
                <h2 className='hidden px-3 font-sans text-sm font-semibold uppercase lg:block'>
                  Table of Contents
                </h2>
                <div className='hidden max-h-[calc(100vh_-_260px)] flex-col gap-0 overflow-y-auto pb-2 lg:flex'>
                  <a
                    href='#overview-header'
                    className='flex min-h-[38px] flex-[1_0] items-center bg-blue-500 px-3 py-2 leading-tight text-white hover:text-[#95989B] dark:hover:text-white'
                  >
                    <div className='flex items-start gap-1'>
                      <span>1.</span>
                      <span>Обзор</span>
                    </div>
                  </a>
                  <a
                    href='#hero-talents-header'
                    className='border-dark-5 flex min-h-[38px] flex-[1_0] items-center border-t px-3 py-2 leading-tight hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                  >
                    <div className='flex items-start gap-1'>
                      <span>2.</span>
                      <span>Героические таланты</span>
                    </div>
                  </a>
                  <a
                    href='#hero-talents-header'
                    className='border-dark-5 flex min-h-[38px] flex-[1_0] items-center border-t px-3 py-2 leading-tight hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                  >
                    <div className='flex items-start gap-1'>
                      <span>3.</span>
                      <span>Таланты</span>
                    </div>
                  </a>
                  <a
                    href='#hero-talents-header'
                    className='border-dark-5 flex min-h-[38px] flex-[1_0] items-center border-t px-3 py-2 leading-tight hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                  >
                    <div className='flex items-start gap-1'>
                      <span>4.</span>
                      <span>Ротация</span>
                    </div>
                  </a>
                  <a
                    href='#hero-talents-header'
                    className='border-dark-5 flex min-h-[38px] flex-[1_0] items-center border-t px-3 py-2 leading-tight hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                  >
                    <div className='flex items-start gap-1'>
                      <span>5.</span>
                      <span>Глубокий обзор</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile/Tablet Select (visible on small screens) */}
      <div className='sticky top-0 z-10 -mx-4 w-screen bg-white px-4 pt-2 pb-2 lg:hidden dark:bg-[#0f0f0f]'>
        <Select>
          <SelectTrigger size='xs' className='w-full'>
            <SelectValue placeholder='Table of Contents' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='overview'>
              <div className='flex items-center gap-1'>
                <a
                  href='#overview-header'
                  className='hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                >
                  <span>1.</span>
                  <span>Overview</span>
                </a>
              </div>
            </SelectItem>
            <SelectItem value='hero-talents'>
              <div className='flex items-center gap-1'>
                <a
                  href='#hero-talents-header'
                  className='hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                >
                  <span>2.</span>
                  <span>Hero Talents</span>
                </a>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
