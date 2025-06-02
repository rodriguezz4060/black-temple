'use client';

import { useState } from 'react';
import { Button } from '@root/components/ui/button';
import { FileText, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  createTab,
  createTextField,
} from '@root/app/class-guides/_actions/section-action';
import toast from 'react-hot-toast';

interface ContentTypeSelectorProps {
  sectionId: number;
  guideId: number;
  textFieldCount: number;
}

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  sectionId,
  guideId,
  textFieldCount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateContent = async (contentType: 'TABS' | 'TEXT') => {
    setIsLoading(true);
    let result;
    if (contentType === 'TEXT') {
      result = await createTextField(sectionId, guideId);
    } else {
      result = await createTab(sectionId, guideId);
    }
    setIsLoading(false);

    if (result.success) {
      router.refresh();
      toast.success(
        `${contentType === 'TEXT' ? 'Текстовый блок' : 'Вкладка'} добавлена`
      );
    } else {
      toast.error(result.error || 'Не удалось добавить контент');
    }
  };

  return (
    <div className='mt-2 flex w-full justify-center'>
      <div className='flex max-w-[900px] flex-1 flex-row gap-2 rounded-md'>
        <Button
          size='sm'
          onClick={() => handleCreateContent('TABS')}
          disabled={isLoading}
          className='flex flex-1 items-center gap-1 transition-colors'
        >
          <FolderOpen className='h-4 w-4' />
          {isLoading ? 'Создание...' : 'Вкладки'}
        </Button>
        <Button
          size='sm'
          onClick={() => handleCreateContent('TEXT')}
          disabled={isLoading || textFieldCount >= 3}
          className={`flex flex-1 items-center gap-1 transition-colors`}
        >
          <FileText className='h-4 w-4' />
          {isLoading
            ? 'Создание...'
            : `Текст ${textFieldCount >= 3 ? '(лимит)' : ''}`}
        </Button>
      </div>
    </div>
  );
};
