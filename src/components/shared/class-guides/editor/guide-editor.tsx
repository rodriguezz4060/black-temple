'use client';

import { GuidePageProps } from '@root/@types/prisma';
import { LeftSideBar } from '@root/components/shared/class-guides';
import { GuideSpecBanner } from '@root/components/shared/class-guides/page/guide-page';
import { GuideAnchorWrapper } from '@root/components/shared/wrapper';
import { Title } from '@root/components/ui/title';
import { GuideStatusComponent } from './components/guide-status/guide-status-component';
import { DifficultyBarEditor } from './difficulty-bar-editor';
import { BisGearEditor } from './components/bis-gear/bis-gear-editor';
import { SectionSelectorDrawer } from './components/section/section-selector';

import { useRouter } from 'next/navigation';
import { SectionEditor } from './components/section/section-editor';

interface GuideEditorProps {
  guide: GuidePageProps;
  className?: string;
}

export const GuideEditor: React.FC<GuideEditorProps> = ({
  guide,
  className,
}) => {
  const router = useRouter();

  const handleSectionAdded = () => {
    router.refresh();
  };

  return (
    <div
      className={`post-page flex h-max flex-col justify-center pt-10 lg:flex-row ${className}`}
    >
      <LeftSideBar guide={guide} />
      <div className='flex w-full flex-1 flex-col pt-2 lg:w-[815px] lg:pt-0 xl:mx-auto'>
        <div className='container mt-0 flex w-full flex-1 origin-top flex-col gap-y-4'>
          <div className='flex flex-row justify-between gap-4'>
            <div className='flex flex-col gap-6'>
              <Title
                text={`${guide.specialization.name} ${guide.class.name} Гайд ${guide.modeRelation.name}`}
                size='sm'
                className='font-title mt-0 md:text-3xl lg:mt-[-4px] lg:text-5xl lg:leading-tight'
              />
              <div className='text-grey-275 mb-4 flex flex-wrap gap-x-4 gap-y-2 font-sans text-lg font-semibold'>
                <span className='flex h-9 items-center gap-6 rounded-sm bg-[#057AF0] pr-2.5 pl-2.5'>
                  <span>Patch {guide.expansion.patchVersion}</span>
                </span>
                <GuideStatusComponent guide={guide} />
              </div>
            </div>
            <div className='hidden lg:block'>
              <div>
                <div className='mt-4 lg:w-[300px]'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='border-dark-5 mb-3 flex flex-wrap items-center justify-between gap-2 border-b pb-3'>
          <div>
            <div className='text-grey-3 flex flex-col font-sans text-sm leading-tight md:text-base lg:text-lg'>
              <p className='flex flex-wrap items-center gap-2 whitespace-nowrap text-[#95989B]'>
                <span className='italic'>Последнее обновление:</span>
                <span className='italic'>
                  {new Date(guide.updatedAt.toISOString()).toLocaleDateString(
                    'ru-RU'
                  )}
                </span>
                <span className='flex items-center gap-2'>
                  <span>|</span>
                  <a
                    href='#changelog-header'
                    className='inline cursor-pointer text-blue-500'
                  >
                    Changelog
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        <GuideAnchorWrapper
          anchorId='overview-header'
          title='Обзор'
          characterClass={guide.class.name}
          spec={guide.specialization.name}
          patch={guide.expansion.patchVersion}
        />

        <div className='flex flex-wrap gap-x-2.5 gap-y-5 lg:flex-nowrap'>
          <div className='w-full grow-[1] md:flex-1 md:grow-[1]'>
            <div className='flex w-full gap-4 contain-inline-size'>
              <GuideSpecBanner
                specBanner={guide.specialization.difficultyBarBanner}
                spec={guide.specialization.name}
              />
              {guide.overviewDifficulty && (
                <DifficultyBarEditor
                  guideId={guide.id}
                  item={guide.overviewDifficulty}
                  icon={guide.specialization.specIcon}
                  spec={guide.specialization.name}
                  classColor={guide.class.classColor}
                  gameMode={guide.modeRelation.name}
                />
              )}
            </div>
          </div>
          <BisGearEditor
            guideId={guide.id}
            gearBanner={guide.specialization.gearBanner}
            characterClass={guide.class.name}
            classColor={guide.class.classColor}
            spec={guide.specialization.name}
            gameMode={guide.modeRelation.name}
            gearData={guide.overviewGears}
          />
        </div>

        {/* Рендерим секции с помощью SectionEditor */}
        {guide.sections.map(section => (
          <SectionEditor key={section.id} section={section} guide={guide} />
        ))}

        <SectionSelectorDrawer
          guideId={guide.id}
          guide={guide}
          onSectionAdded={handleSectionAdded}
        />
      </div>
    </div>
  );
};
