'use client';

import { ClassSpecialization } from '@prisma/client';
import { TabData } from '@root/@types/prisma';
import { Card, CardContent } from '@root/components/ui/card';
import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';
import { TabsContent } from '@root/components/ui/tabs-list';
import { Button } from '@root/components/ui/button';
import { FormInput } from '@root/components/shared/forms/input-form';
import Image from 'next/image';
import { useForm, FormProvider } from 'react-hook-form';
import { cn } from '@root/lib/utils';
import { MDTabContentEditor } from '../text-field/md-tab-content-editor';

interface TalentsEditorProps {
  tab: TabData;
  specialization: ClassSpecialization;
  onContentChange: (value: string) => void;
  onImportChange: (value: string) => void;
}

interface TalentFormData {
  importString: string;
  content: string;
}

// Фиксированные размеры для контейнера и iframe
const IFRAME_WIDTH = 800;
const IFRAME_HEIGHT = 500;

export const TalentsEditor = ({
  specialization,
  tab,
  onContentChange,
  onImportChange,
}: TalentsEditorProps) => {
  const methods = useForm<TalentFormData>({
    defaultValues: {
      importString: tab.importString || '',
      content: tab.content || '',
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: TalentFormData) => {
    if (data.importString.trim()) {
      onContentChange(data.content);
      onImportChange(data.importString);
      reset();
    }
  };

  return (
    <TabsContent value={tab.value} className='mt-0 p-2 dark:bg-[#171717]'>
      <Card className='w-full max-w-full rounded-none border-none py-0 dark:bg-[#171717]'>
        <CardContent className='space-y-2 p-0'>
          <div
            className={cn('relative flex w-full justify-center', 'sm:mx-auto')}
            style={{
              height: `${IFRAME_HEIGHT}px`,
            }}
          >
            {/* Фоновое изображение через Image */}
            <div className='absolute inset-0 border-2 border-black opacity-100 brightness-100'>
              <Image
                src={specialization.talentsBG}
                alt='Talents background'
                fill
                className='object-cover object-right md:object-center'
                priority
              />
            </div>

            {/* Контейнер с iframe или полем ввода */}
            <ScrollArea className='w-full whitespace-nowrap'>
              <div
                style={{ colorScheme: 'light' }}
                className='relative z-20 flex h-full items-center justify-center'
              >
                {tab.importString ? (
                  <iframe
                    src={`https://www.raidbots.com/simbot/render/talents/${tab.importString}?locale=ru_RU&width=${IFRAME_WIDTH}&level=80&bgcolor=transparent`}
                    width={IFRAME_WIDTH}
                    height={IFRAME_HEIGHT}
                    title='Talents Editor'
                    className='overflow-hidden'
                    scrolling='no'
                  />
                ) : (
                  <FormProvider {...methods}>
                    <div className='flex flex-col items-center gap-4 pt-20'>
                      <FormInput
                        name='importString'
                        placeholder='Введите строку талантов'
                        className='w-[600px]'
                        required
                      />
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={!methods.watch('importString').trim()}
                      >
                        Отправить
                      </Button>
                    </div>
                  </FormProvider>
                )}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </div>
          <MDTabContentEditor
            className='w-full px-2'
            content={tab.content}
            onContentChange={onContentChange}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
