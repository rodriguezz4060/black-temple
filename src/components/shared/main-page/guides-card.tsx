import { GuideButtonWithRelations } from '@root/@types/prisma';
import Image from 'next/image';
import Link from 'next/link';

interface GuideCardProps {
  guides: GuideButtonWithRelations[];
}

export const GuidesCard = ({ guides }: GuideCardProps) => {
  return (
    <div className='mt-5 grid grid-cols-2 gap-2 p-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6'>
      {guides.map(guide => (
        <article
          key={guide.id}
          className='group relative overflow-hidden rounded-lg border border-solid border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:bg-gray-800'
        >
          {/* Image with gradient overlay */}
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <Image
              src={guide.specialization.specBackground}
              alt={`${guide.class.name} ${guide.specialization.name} ${guide.modeRelation.name}`}
              className='h-full w-full scale-x-[-1] bg-cover bg-center transition-transform duration-200 group-hover:scale-105 group-hover:scale-x-[-1.05]'
              style={{
                backgroundImage: `linear-gradient(180deg, transparent 50%, rgb(0, 0, 0) 90%),`,
              }}
              width={300}
              height={300}
              priority
            />
          </div>

          {/* Shadow overlay */}
          <div className='absolute inset-0 z-1 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />

          {/* Content overlay */}
          <Link
            href={`/class-guides/${guide.slug}`}
            className='relative z-2 flex aspect-[16/9] h-full flex-col p-2 text-white no-underline'
          >
            <div className='flex w-full items-center justify-between'>
              {/* Тег режима - слева */}
              <span className='inline-flex items-center rounded border border-gray-700 bg-black/20 px-2 py-0.5 text-[10px] font-medium uppercase'>
                <span className='mr-2 h-2 w-2 rounded-full bg-[#B818F0]' />
                {guide.modeRelation.name}
              </span>

              {/* Имя автора - справа */}
              {guide.User && (
                <span className='text-xs text-gray-300 transition-colors hover:text-white'>
                  @{guide.User.fullName}
                </span>
              )}
            </div>
            {/* Content */}
            <div className='mt-auto'>
              <div className='flex items-center'>
                {/* Class icon */}
                <div className='mr-3 h-8 w-8 transition-transform'>
                  <Image
                    src={guide.class.classIcon}
                    alt={`${guide.class.name} ${guide.specialization.name}`}
                    width={32}
                    height={32}
                    className='object-contain'
                  />
                </div>

                {/* Title */}
                <div>
                  <h3 className='text-sm leading-tight font-bold'>
                    <span>{guide.class.name}</span>
                    <span className='block text-sm font-normal text-gray-300'>
                      {guide.specialization.name}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};
