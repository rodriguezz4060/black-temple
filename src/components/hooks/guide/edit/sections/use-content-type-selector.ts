import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createTextField } from '@root/app/class-guides/_actions/text-field/text-field-actions';
import { createTab } from '@root/app/class-guides/_actions/tab/tab-action';

export const useContentCreation = (sectionId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateContent = async (contentType: 'TABS' | 'TEXT') => {
    setIsLoading(true);
    let result;

    try {
      if (contentType === 'TEXT') {
        result = await createTextField(sectionId);
      } else {
        result = await createTab(sectionId);
      }

      if (result.success) {
        router.refresh();
        toast.success(
          `${contentType === 'TEXT' ? 'Текстовый блок' : 'Группа вкладок'} добавлена`
        );
      } else {
        toast.error(result.error || 'Не удалось добавить контент');
      }
    } catch {
      toast.error('Произошла ошибка при создании контента');
    } finally {
      setIsLoading(false);
    }

    return result;
  };

  return { isLoading, handleCreateContent };
};

export const getButtonLabels = (
  isLoading: boolean,
  count: number,
  type: 'TABS' | 'TEXT'
) => {
  const baseText = type === 'TEXT' ? 'Текст' : 'Вкладки';
  const icon = type === 'TEXT' ? '📝' : '📁';

  if (isLoading) return `${icon} Создание...`;
  if (count >= 3) return `${icon} ${baseText} (лимит)`;
  return `${icon} ${baseText}`;
};
