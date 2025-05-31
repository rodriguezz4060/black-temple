import { GuidesCard } from './guides-card';
import { GuideButtonWithRelations } from '@root/@types/prisma';

interface MainPageProps {
  guides: GuideButtonWithRelations[];
}

export const MainPage = ({ guides }: MainPageProps) => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-col border-b border-[#2B2B2B] contain-inline-size'>
          <div className='flex flex-wrap items-center gap-y-0'>
            <div className='flex max-w-100 items-center gap-1 p-3'>
              <span className='h-3 w-3 rounded-[2px] bg-blue-500'></span>
              <h2 className='text-[20px]'>Последние добавленные гайды</h2>
            </div>
          </div>
        </div>
      </div>

      <GuidesCard guides={guides} />
    </>
  );
};
