'use client';

import {
  getButtonLabels,
  useContentCreation,
} from '@root/components/hooks/guide/edit/sections/use-content-type-selector';
import { Button } from '@root/components/ui/button';

interface ContentTypeSelectorProps {
  sectionId: number;
  guideId: number;
  textFieldCount: number;
  tabGroupCount: number;
}

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  sectionId,
  textFieldCount,
  tabGroupCount,
}) => {
  const { isLoading, handleCreateContent } = useContentCreation(sectionId);

  return (
    <div className='mt-2 flex w-full justify-center'>
      <div className='flex max-w-[900px] flex-1 flex-row gap-2 rounded-md'>
        <Button
          size='sm'
          onClick={() => handleCreateContent('TABS')}
          disabled={tabGroupCount >= 3}
          loading={isLoading}
          className='flex flex-1 items-center gap-1 transition-colors'
        >
          {getButtonLabels(isLoading, tabGroupCount, 'TABS')}
        </Button>
        <Button
          size='sm'
          onClick={() => handleCreateContent('TEXT')}
          disabled={textFieldCount >= 3}
          loading={isLoading}
          className='flex flex-1 items-center gap-1 transition-colors'
        >
          {getButtonLabels(isLoading, textFieldCount, 'TEXT')}
        </Button>
      </div>
    </div>
  );
};
