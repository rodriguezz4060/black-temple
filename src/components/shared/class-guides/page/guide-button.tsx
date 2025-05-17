import { GuideButtonWithRelations } from '@root/@types/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { transliterate } from 'transliteration';

interface GuideButtonProps {
  guides: GuideButtonWithRelations[];
}

export default function GuideButton({ guides }: GuideButtonProps) {
  // console.log(guides);
  // Функция для генерации slug
  const generateSlug = (guide: GuideButtonWithRelations) => {
    const className = transliterate(guide.class.name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const specName = transliterate(guide.specialization.name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    return `${className}-${specName}-${guide.id}`;
  };

  return (
    <>
      <div className='flex-1 pb-20'>
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
          {/* Первая карточка */}
          {guides.map(guide => (
            <article
              key={guide.id}
              className='group relative overflow-hidden rounded-lg border-2 hover:border-blue-500'
            >
              <Link
                href={`/class-guides/${generateSlug(guide)}`}
                className='block h-full'
              >
                {/* Background pattern */}
                <div
                  className='absolute inset-0 bg-cover bg-center opacity-70 transition-opacity group-hover:opacity-90'
                  style={{
                    backgroundImage: `url(${guide.modeRelation.activityBg})`,
                  }}
                />

                {/* Flex container for image and content */}
                <div className='relative flex h-38'>
                  {/* Image wrapper */}
                  <div className='w-1/3 overflow-hidden'>
                    <Image
                      src={guide.specialization.specBackground}
                      alt={`${guide.class.name} ${guide.specialization.name} ${guide.modeRelation.name}`}
                      className='object-cover'
                      style={{
                        height: '100%',
                        maxWidth: 'none',
                        width: 'auto',
                        maskImage:
                          'linear-gradient(90deg, rgb(255, 255, 255) 25%, transparent 75%)',
                      }}
                      width={300}
                      height={300}
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className='z-10 flex w-2/3 flex-col justify-between p-4'>
                    <div className='flex items-start gap-3'>
                      <Image
                        src={guide.specialization.specIcon}
                        width={40}
                        height={40}
                        alt={`${guide.class.name} ${guide.specialization.name}`}
                        className='border-dark-500 rounded-lg border'
                      />

                      <div>
                        <h2 className='text-xl font-bold text-white transition-colors'>
                          <span
                            style={{
                              color: `${guide.class.classColor}`,
                            }}
                          >
                            {guide.class.name} {guide.specialization.name}
                          </span>
                          <span className='block text-sm text-gray-300'>
                            {guide.modeRelation.name} Гайд
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      <span className='inline-flex items-center rounded bg-gray-800 px-2 py-1 text-xs text-gray-300'>
                        {guide.patch}
                      </span>
                      <span className='inline-flex items-center rounded bg-gray-800 px-2 py-1 text-xs text-gray-300'>
                        <Image
                          src={guide.modeRelation.activityIcon}
                          width={16}
                          height={16}
                          alt={guide.modeRelation.name}
                          className='mr-1'
                        />
                        {guide.modeRelation.name}
                      </span>
                      <span className='inline-flex items-center rounded bg-gray-800 px-2 py-1 text-xs text-gray-300'>
                        <Image
                          src={guide.specialization.specRole.roleIcon}
                          width={16}
                          height={16}
                          alt={guide.specialization.specRole.name}
                          className='mr-1'
                        />
                        {guide.specialization!.specRole.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
