import { useState, useEffect } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { GuidePageProps, TabGroupProps } from '@root/@types/prisma';
import { TextField } from '@prisma/client';
import { deleteTextField } from '@root/app/class-guides/_actions/text-field/text-field-actions';
import { deleteTabGroup } from '@root/app/class-guides/_actions/tab/tab-group-action';
import { updateSectionItemOrder } from '@root/app/class-guides/_actions/dnd/dnd-actions';

export type SectionItem =
  | { type: 'TEXT'; data: TextField; order: number }
  | { type: 'TABS'; data: TabGroupProps; order: number };

export const useSectionItems = (
  section: GuidePageProps['sections'][number]
) => {
  const [sectionItems, setSectionItems] = useState<SectionItem[]>([]);

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

  return { sectionItems, setSectionItems };
};

export const useDeleteHandlers = (
  sectionItems: SectionItem[],
  setSectionItems: React.Dispatch<React.SetStateAction<SectionItem[]>>
) => {
  const router = useRouter();

  const handleDeleteItem = async (
    id: number,
    type: 'TEXT' | 'TABS',
    deleteAction: (id: number) => Promise<{ success: boolean; error?: string }>,
    successMessage: string,
    errorMessage: string
  ) => {
    const result = await deleteAction(id);
    if (result.success) {
      setSectionItems(
        sectionItems.filter(item => item.type !== type || item.data.id !== id)
      );
      toast.success(successMessage);
      router.refresh();
    } else {
      toast.error(result.error || errorMessage);
    }
  };

  const handleDeleteTextField = (textFieldId: number) =>
    handleDeleteItem(
      textFieldId,
      'TEXT',
      deleteTextField,
      'Текстовое поле удалено',
      'Не удалось удалить текстовое поле'
    );

  const handleDeleteTabGroup = (tabGroupId: number) =>
    handleDeleteItem(
      tabGroupId,
      'TABS',
      deleteTabGroup,
      'Группа вкладок удалена',
      'Не удалось удалить группу вкладок'
    );

  return { handleDeleteTextField, handleDeleteTabGroup };
};

export const useDragHandlers = (
  sectionItems: SectionItem[],
  setSectionItems: React.Dispatch<React.SetStateAction<SectionItem[]>>,
  sectionId: number
) => {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

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

      const result = await updateSectionItemOrder(sectionId, serverItems);
      if (!result.success) {
        toast.error(result.error || 'Не удалось обновить порядок');
        // Восстанавливаем предыдущий порядок в случае ошибки
        setSectionItems([...sectionItems]);
      } else {
        toast.success('Порядок элементов обновлён');
        router.refresh();
      }
    }
  };

  return { isDragging, handleDragStart, handleDragEnd };
};

export const getItemCounts = (sectionItems: SectionItem[]) => {
  return {
    textFieldCount: sectionItems.filter(item => item.type === 'TEXT').length,
    tabGroupCount: sectionItems.filter(item => item.type === 'TABS').length,
  };
};
