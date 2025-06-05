'use client';

import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@root/components/ui/select';
import { AuthorBar } from './author-bar';
import { GuidePageProps } from '@root/@types/prisma';
import { sectionTypeTranslations } from '@root/utils/section-translations';

interface LeftSideBarProps {
  guide: GuidePageProps;
}

export const LeftSideBar = ({ guide }: LeftSideBarProps) => {
  // Формируем список глав: "Обзор" всегда первый, затем пользовательские секции
  const sections = [
    { anchorId: 'overview-header', title: 'Обзор', order: 1 },
    ...guide.sections.map((section, index) => ({
      anchorId: `${section.type.toLowerCase()}-header`,
      title: sectionTypeTranslations[section.type] || section.type,
      order: index + 2,
    })),
  ];

  return (
    <>
      <aside className='sticky top-5 z-10 container -mx-5 -mt-9 flex w-[calc(100%_+_40px)] shrink-0 origin-top-right flex-col self-start px-5 md:mx-0 md:w-full md:p-0 lg:mt-0 lg:block lg:h-auto lg:w-[228px] lg:bg-none lg:pr-4'>
        <div className='flex flex-col gap-3'>
          <AuthorBar guide={guide} />

          {/* Anchor full screen */}
          <div className='flex max-h-[calc(100vh-120px)] flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <div className='lg:border-dark-5 flex flex-1 flex-col gap-4 overflow-hidden rounded-lg lg:border lg:pt-3 lg:dark:bg-[#171717]'>
                <h2 className='hidden px-3 font-sans text-sm font-semibold uppercase lg:block'>
                  Содержание
                </h2>
                <div className='hidden max-h-[calc(100vh_-_260px)] flex-col gap-0 overflow-y-auto pb-2 lg:flex'>
                  {sections.map(section => (
                    <a
                      key={section.anchorId}
                      href={`#${section.anchorId}`}
                      className='flex min-h-[38px] flex-[1_0] items-center px-3 py-2 leading-tight text-white hover:text-[#95989B] dark:hover:text-white'
                      style={{
                        backgroundColor:
                          section.order === 1 ? '#057AF0' : 'transparent',
                      }}
                    >
                      <div className='flex items-start gap-1'>
                        <span>{section.order}.</span>
                        <span>{section.title}</span>
                      </div>
                    </a>
                  ))}
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
            {sections.map(section => (
              <SelectItem key={section.anchorId} value={section.anchorId}>
                <div className='flex items-center gap-1'>
                  <a
                    href={`#${section.anchorId}`}
                    className='hover:text-[#95989B] dark:text-[#95989B] dark:hover:text-white'
                  >
                    <span>{section.order}.</span>
                    <span>{section.title}</span>
                  </a>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
