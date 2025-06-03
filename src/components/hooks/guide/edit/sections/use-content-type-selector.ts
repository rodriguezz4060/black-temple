import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  createTab,
  createTextField,
} from '@root/app/class-guides/_actions/section-action';

export const useContentCreation = (sectionId: number, guideId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateContent = async (contentType: 'TABS' | 'TEXT') => {
    setIsLoading(true);
    let result;

    try {
      if (contentType === 'TEXT') {
        result = await createTextField(sectionId, guideId);
      } else {
        result = await createTab(sectionId, guideId);
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
