'use client';

import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GuidePageProps } from '@root/@types/prisma';
import { GuideAnchorWrapper } from '@root/components/shared/wrapper';
import { sectionTypeTranslations } from '@root/utils/section-translations';
import { Separator } from '@root/components/ui/separator';
import { Button } from '@root/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { ConfirmationDialog } from '../confirmation-dialog';
import { TalentsTab } from '../talents/talents-tab';
import { deleteSection } from '@root/app/class-guides/_actions/section/section-actions';
import { useState } from 'react';
import { RotationTab } from '../rotation/rotation-tab';
import { RotationProvider } from '../rotation/rotation-context';

interface SectionEditorProps {
  section: GuidePageProps['sections'][number];
  guide: GuidePageProps;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  guide,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [itemDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
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
  const router = useRouter();

  const handleDeleteSection = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteSection(section.id);
      if (result.success) {
        router.refresh();
      } else {
        console.error(result.error);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const renderDragOverlay = () => {
    const activeItem = sectionItems.find(
      item => `${item.type}-${item.data.id}` === activeId
    );
    if (!activeItem) return null;

    const dimensions = itemDimensions[activeId || ''] || {};

    return (
      <div
        style={{
          width: dimensions.width ? `${dimensions.width}px` : 'auto',
          height: dimensions.height ? `${dimensions.height}px` : 'auto',
          opacity: 0.8,
          zIndex: 1000,
          boxSizing: 'border-box',
        }}
      >
        {activeItem.type === 'TEXT' ? (
          <TextFieldEditor
            textField={{
              id: activeItem.data.id,
              content: activeItem.data.content,
            }}
            sectionId={section.id}
            guideId={guide.id}
          />
        ) : section.type === 'TALENTS' ? (
          <TalentsTab
            initialTabs={activeItem.data.tabs || []}
            defaultTab={activeItem.data.tabs?.[0]?.value || ''}
            sectionId={section.id}
            tabGroupId={activeItem.data.id}
            specialization={guide.specialization}
          />
        ) : section.type === 'ROTATION' ? (
          <RotationProvider>
            <RotationTab
              initialTabs={activeItem.data.tabs || []}
              defaultTab={activeItem.data.tabs?.[0]?.value || ''}
              sectionId={section.id}
              tabGroupId={activeItem.data.id}
            />
          </RotationProvider>
        ) : (
          <TabsEditor
            initialTabs={activeItem.data.tabs || []}
            defaultTab={activeItem.data.tabs?.[0]?.value || ''}
            sectionId={section.id}
            tabGroupId={activeItem.data.id}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`mt-6 ${isDragging ? 'is-dragging' : ''}`}>
      <GuideAnchorWrapper
        anchorId={`${section.type.toLowerCase()}-header`}
        title={sectionTypeTranslations[section.type]}
        characterClass={guide.class.name}
        spec={guide.specialization.name}
        patch={guide.expansion.patchVersion}
        actionButton={
          <ConfirmationDialog
            trigger={
              <Button
                variant='destructive'
                loading={isDeleting}
                size='icon'
                title='Удалить секцию'
              >
                <Trash2 className='h-4 w-4 text-white' />
              </Button>
            }
            title='Подтверждение удаления секции'
            description={`Вы уверены, что хотите удалить секцию ${sectionTypeTranslations[section.type]}? Это действие удалит все связанные текстовые поля и группы вкладок. Отменить действие невозможно.`}
            onConfirm={handleDeleteSection}
          />
        }
      />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={event => {
          setActiveId(event.active.id as string);
          handleDragStart();
        }}
        onDragEnd={event => {
          setActiveId(null);
          handleDragEnd(event);
        }}
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
                <ConfirmationDialog
                  trigger={
                    <Button
                      loading={isDeleting}
                      variant='destructive'
                      size='icon'
                    >
                      <Trash2 className='h-4 w-4 text-white' />
                    </Button>
                  }
                  title='Подтверждение удаления'
                  description={`Вы уверены, что хотите удалить ${
                    item.type === 'TEXT' ? 'текстовое поле' : 'группу вкладок'
                  }? Это действие нельзя отменить.`}
                  onConfirm={() =>
                    item.type === 'TEXT'
                      ? handleDeleteTextField(item.data.id)
                      : handleDeleteTabGroup(item.data.id)
                  }
                />
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
              ) : section.type === 'TALENTS' ? (
                <TalentsTab
                  initialTabs={item.data.tabs || []}
                  defaultTab={item.data.tabs?.[0]?.value || ''}
                  sectionId={section.id}
                  tabGroupId={item.data.id}
                  specialization={guide.specialization}
                />
              ) : section.type === 'ROTATION' ? (
                <RotationProvider>
                  <RotationTab
                    initialTabs={item.data.tabs || []}
                    defaultTab={item.data.tabs?.[0]?.value || ''}
                    sectionId={section.id}
                    tabGroupId={item.data.id}
                  />
                </RotationProvider>
              ) : (
                <TabsEditor
                  initialTabs={item.data.tabs || []}
                  defaultTab={item.data.tabs?.[0]?.value || ''}
                  sectionId={section.id}
                  tabGroupId={item.data.id}
                />
              )}
            </SortableItem>
          ))}
        </SortableContext>
        <DragOverlay>{renderDragOverlay()}</DragOverlay>
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
