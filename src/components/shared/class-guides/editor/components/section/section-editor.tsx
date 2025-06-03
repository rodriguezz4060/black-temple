'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GuidePageProps } from '@root/@types/prisma';
import { GuideAnchorWrapper } from '@root/components/shared/wrapper';
import { sectionTypeTranslations } from '@root/utils/section-translations';
import { Separator } from '@root/components/ui/separator';
import { Button } from '@root/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@root/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { SortableItem } from '@root/components/shared/class-guides/editor/sortable-item';
import { TextFieldEditor } from '../text-field/text-field-editor';
import { TabsEditor } from '../tabs/tabs-editor';
import { ContentTypeSelector } from './content-type-selector';
import {
  getItemCounts,
  useDeleteHandlers,
  useDragHandlers,
  useSectionItems,
} from '@root/components/hooks/guide/edit/sections/use-section';

interface SectionEditorProps {
  section: GuidePageProps['sections'][number];
  guide: GuidePageProps;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  guide,
}) => {
  const { sectionItems, setSectionItems } = useSectionItems(section);
  const { handleDeleteTextField, handleDeleteTabGroup } = useDeleteHandlers(
    sectionItems,
    setSectionItems
  );
  const { isDragging, handleDragStart, handleDragEnd } = useDragHandlers(
    sectionItems,
    setSectionItems,
    section.id
  );
  const { textFieldCount, tabGroupCount } = getItemCounts(sectionItems);

  return (
    <div className={`mt-6 ${isDragging ? 'is-dragging' : ''}`}>
      <GuideAnchorWrapper
        anchorId={`${section.type.toLowerCase()}-header`}
        title={sectionTypeTranslations[section.type]}
        characterClass={guide.class.name}
        spec={guide.specialization.name}
        patch={guide.expansion.patchVersion}
      />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionItems.map(item => `${item.type}-${item.data.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {sectionItems.map(item => (
            <SortableItem
              key={`${item.type}-${item.data.id}`}
              id={`${item.type}-${item.data.id}`}
              actions={
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='destructive' size='icon'>
                      <Trash2 className='h-4 w-4 text-white' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Подтверждение удаления
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите удалить{' '}
                        {item.type === 'TEXT'
                          ? 'текстовое поле'
                          : 'группу вкладок'}
                        ? Это действие нельзя отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          item.type === 'TEXT'
                            ? handleDeleteTextField(item.data.id)
                            : handleDeleteTabGroup(item.data.id)
                        }
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              }
            >
              {item.type === 'TEXT' ? (
                <div className='text-field-editor'>
                  <TextFieldEditor
                    textField={{ id: item.data.id, content: item.data.content }}
                    sectionId={section.id}
                    guideId={guide.id}
                  />
                </div>
              ) : (
                <div className='tabs-editor'>
                  <TabsEditor
                    initialTabs={item.data.tabs || []}
                    defaultTab={item.data.tabs?.[0]?.value || ''}
                    sectionId={section.id}
                    tabGroupId={item.data.id}
                  />
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <Separator className='my-4' />
      <ContentTypeSelector
        sectionId={section.id}
        guideId={guide.id}
        textFieldCount={textFieldCount}
        tabGroupCount={tabGroupCount}
      />
    </div>
  );
};
