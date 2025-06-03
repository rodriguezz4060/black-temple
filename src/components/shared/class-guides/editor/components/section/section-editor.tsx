'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GuidePageProps, TabGroupProps } from '@root/@types/prisma';
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
import {
  deleteTextField,
  deleteTabGroup,
  updateSectionItemOrder,
} from '@root/app/class-guides/_actions/section-action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TextField } from '@prisma/client';
import { SortableItem } from '@root/components/shared/sortable-item';
import { TextFieldEditor } from '../text-field/text-field-editor';
import { TabsEditor } from '../tabs/tabs-editor';
import { ContentTypeSelector } from './content-type-selector';

interface SectionEditorProps {
  section: GuidePageProps['sections'][number];
  guide: GuidePageProps;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  guide,
}) => {
  const router = useRouter();
  const [sectionItems, setSectionItems] = useState<
    Array<
      | { type: 'TEXT'; data: TextField; order: number }
      | { type: 'TABS'; data: TabGroupProps; order: number }
    >
  >(
    [
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
    ].sort((a, b) => a.order - b.order)
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setSectionItems(
      [
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
      ].sort((a, b) => a.order - b.order)
    );
  }, [section]);

  const handleDeleteTextField = async (textFieldId: number) => {
    const result = await deleteTextField(textFieldId);
    if (result.success) {
      toast.success('Текстовое поле удалено');
      setSectionItems(
        sectionItems.filter(
          item => item.type !== 'TEXT' || item.data.id !== textFieldId
        )
      );
      router.refresh();
    } else {
      toast.error(result.error || 'Не удалось удалить текстовое поле');
    }
  };

  const handleDeleteTabGroup = async (tabGroupId: number) => {
    const result = await deleteTabGroup(tabGroupId);
    if (result.success) {
      toast.success('Группа вкладок удалена');
      setSectionItems(
        sectionItems.filter(
          item => item.type !== 'TABS' || item.data.id !== tabGroupId
        )
      );
      router.refresh();
    } else {
      toast.error(result.error || 'Не удалось удалить группу вкладок');
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionItems.findIndex(
        item => `${item.type}-${item.data.id}` === active.id
      );
      const newIndex = sectionItems.findIndex(
        item => `${item.type}-${item.data.id}` === over.id
      );

      const reorderedItems = arrayMove(sectionItems, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index + 1,
        })
      );
      setSectionItems(reorderedItems);

      const serverItems = reorderedItems.map(item => ({
        id: item.data.id,
        type: item.type,
        order: item.order,
      }));

      const result = await updateSectionItemOrder(section.id, serverItems);
      if (!result.success) {
        toast.error(result.error || 'Не удалось обновить порядок');
        setSectionItems(
          [
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
          ].sort((a, b) => a.order - b.order)
        );
      } else {
        toast.success('Порядок элементов обновлён');
      }
    }
  };

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
        textFieldCount={
          sectionItems.filter(item => item.type === 'TEXT').length
        }
        tabGroupCount={sectionItems.filter(item => item.type === 'TABS').length}
      />
    </div>
  );
};
