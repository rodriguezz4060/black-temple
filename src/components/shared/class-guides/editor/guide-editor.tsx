'use client';

import {
  GuidePageProps,
  TextFieldData,
  TabGroupData,
} from '@root/@types/prisma';
import { LeftSideBar } from '@root/components/shared/class-guides';
import { GuideSpecBanner } from '@root/components/shared/class-guides/page/guide-page';
import { GuideAnchorWrapper } from '@root/components/shared/wrapper';
import { Title } from '@root/components/ui/title';
import { GuideStatusComponent } from './components/guide-status/guide-status-component';
import { DifficultyBarEditor } from './difficulty-bar-editor';
import { BisGearEditor } from './components/bis-gear/bis-gear-editor';
import { TextFieldEditor } from './components/text-field/text-field-editor';
import { TabsEditor } from './components/tabs/tabs-editor';
import { ContentTypeSelector } from './components/section/content-type-selector';
import { SectionSelectorDrawer } from './components/section/section-selector';
import { sectionTypeTranslations } from '@root/utils/section-translations';
import { Separator } from '@root/components/ui/separator';
import { Button } from '@root/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  deleteTextField,
  deleteTabGroup,
} from '@root/app/class-guides/_actions/section-action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

  const handleDeleteTextField = async (textFieldId: number) => {
    const result = await deleteTextField(textFieldId);
    if (result.success) {
      toast.success('Текстовое поле удалено');
      router.refresh();
    } else {
      toast.error(result.error || 'Не удалось удалить текстовое поле');
    }
  };

  const handleDeleteTabGroup = async (tabGroupId: number) => {
    const result = await deleteTabGroup(tabGroupId);
    if (result.success) {
      toast.success('Группа вкладок удалена');
      router.refresh();
    } else {
      toast.error(result.error || 'Не удалось удалить группу вкладок');
    }
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

        {/* Рендерим существующие секции */}
        {guide.sections.map(section => {
          // Объединяем и сортируем элементы по order
          const sectionItems: Array<
            | { type: 'TEXT'; data: TextFieldData; order: number }
            | { type: 'TABS'; data: TabGroupData; order: number }
          > = [
            ...section.textFields.map(tf => ({
              type: 'TEXT' as const,
              data: tf,
              order: tf.order,
            })),
            ...section.tabGroups.map(tg => ({
              type: 'TABS' as const,
              data: tg,
              order: tg.order,
            })),
          ].sort((a, b) => a.order - b.order);

          return (
            <div key={section.id} className='mt-6'>
              <GuideAnchorWrapper
                anchorId={`${section.type.toLowerCase()}-header`}
                title={sectionTypeTranslations[section.type]}
                characterClass={guide.class.name}
                spec={guide.specialization.name}
                patch={guide.expansion.patchVersion}
              />
              {/* Рендерим элементы в порядке order */}
              {sectionItems.map(item => (
                <div
                  key={`${item.type}-${item.data.id}`}
                  className='relative my-4'
                >
                  {item.type === 'TEXT' ? (
                    <>
                      <TextFieldEditor
                        textField={{
                          id: item.data.id,
                          content: item.data.content,
                        }}
                        sectionId={section.id}
                        guideId={guide.id}
                      />
                      <Button
                        variant='destructive'
                        size='sm'
                        className='absolute top-2 right-2'
                        onClick={() => handleDeleteTextField(item.data.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </>
                  ) : (
                    <>
                      <TabsEditor
                        initialTabs={item.data.tabs}
                        defaultTab={item.data.tabs[0]?.value || ''}
                        sectionId={section.id}
                        tabGroupId={item.data.id}
                      />
                      <Button
                        variant='destructive'
                        size='sm'
                        className='absolute top-2 right-2'
                        onClick={() => handleDeleteTabGroup(item.data.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </>
                  )}
                </div>
              ))}
              {/* Селектор типа контента для добавления нового контента в секцию */}
              <Separator className='my-4' />
              <ContentTypeSelector
                sectionId={section.id}
                guideId={guide.id}
                textFieldCount={section.textFields.length}
                tabGroupCount={section.tabGroups.length}
              />
            </div>
          );
        })}

        {/* Drawer для добавления новой секции */}
        <SectionSelectorDrawer
          guideId={guide.id}
          guide={guide}
          onSectionAdded={handleSectionAdded}
        />
      </div>
    </div>
  );
};
