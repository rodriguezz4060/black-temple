'use client';

import { useState } from 'react';
import { Button } from '@root/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from '@root/components/ui/drawer';
import { Plus } from 'lucide-react';
import { SectionType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { createSection } from '@root/app/class-guides/_actions/section-action';
import { GuidePageProps } from '@root/@types/prisma';
import { sectionTypeTranslations } from '@root/utils/section-translations';

interface SectionSelectorDrawerProps {
  guideId: number;
  guide: GuidePageProps;
  onSectionAdded: () => void;
}

export const SectionSelectorDrawer: React.FC<SectionSelectorDrawerProps> = ({
  guideId,
  guide,
  onSectionAdded,
}) => {
  const [selectedSectionType, setSelectedSectionType] =
    useState<SectionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Получаем все возможные типы секций
  const allSectionTypes = Object.values(SectionType);
  // Получаем типы секций, которые уже используются в гайде
  const usedSectionTypes = guide.sections.map(section => section.type);
  // Фильтруем, оставляя только доступные типы секций
  const availableSectionTypes = allSectionTypes.filter(
    type => !usedSectionTypes.includes(type)
  );

  const handleCreateSection = async () => {
    if (!selectedSectionType) return;

    setIsLoading(true);
    const result = await createSection(guideId, selectedSectionType);
    setIsLoading(false);

    if (result.success) {
      onSectionAdded();
      router.refresh();
      setSelectedSectionType(null);
      setOpen(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction='right'>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='fixed top-4 right-4 z-50'
        >
          <Plus className='mr-2 h-4 w-4' />
          Добавить секцию
        </Button>
      </DrawerTrigger>
      <DrawerContent className='fixed top-0 right-0 bottom-0 h-full w-80 max-w-[80vw]'>
        <DrawerHeader>
          <DrawerTitle>Добавить новую секцию</DrawerTitle>
        </DrawerHeader>
        <div className='p-4'>
          {availableSectionTypes.length > 0 ? (
            <ul className='space-y-2'>
              {availableSectionTypes.map(type => (
                <li key={type}>
                  <Button
                    variant={
                      selectedSectionType === type ? 'default' : 'outline'
                    }
                    className='w-full justify-start'
                    onClick={() => setSelectedSectionType(type)}
                  >
                    {sectionTypeTranslations[type]}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center text-gray-500'>
              Все доступные категории уже добавлены
            </p>
          )}
        </div>
        <DrawerFooter>
          <Button
            onClick={handleCreateSection}
            disabled={!selectedSectionType || isLoading}
          >
            {isLoading ? 'Создание...' : 'Создать секцию'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
