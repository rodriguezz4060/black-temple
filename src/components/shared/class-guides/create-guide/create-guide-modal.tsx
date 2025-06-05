'use client';

import Image from 'next/image';
import { Button } from '@root/components/ui/button';
import { InitialClassSelection } from '@root/@types/prisma';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@root/components/ui/dialog';
import { Label } from '@root/components/ui/label';
import { Mode, Expansion } from '@prisma/client'; // Добавляем тип Expansion
import { useCreateGuide } from '@root/components/hooks';
import { TooltipWrapper } from '@root/components/shared/';
import { Separator } from '@root/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@root/components/ui/select';

interface InitialData {
  classes: InitialClassSelection[];
  modes: Mode[];
  expansions: Expansion[];
}

export default function CreateGuideModal({
  initialData,
}: {
  initialData: InitialData;
}) {
  const { classes, modes, expansions } = initialData;

  const {
    selectedClass,
    selectedSpec,
    selectedMode,
    selectedExpansion,
    isLoading,
    setSelectedClass,
    setSelectedSpec,
    setSelectedMode,
    setSelectedExpansion,
    handleSubmit,
  } = useCreateGuide();

  const selectedClassData = classes.find(c => c.id === selectedClass);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='default' className='font-bold'>
            Создание нового гайда
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Создание нового гайда</DialogTitle>
              <Label className='text-md my-2 font-medium'>
                Выберите класс:
              </Label>
              <Separator className='' />
              <div className='flex flex-wrap gap-2'>
                {classes.map(cls => (
                  <Button
                    key={cls.id}
                    variant='wowIcon'
                    size='wowIcon'
                    onClick={() => {
                      setSelectedClass(cls.id);
                      setSelectedSpec(null);
                    }}
                    className={`flex flex-col items-center rounded border ${
                      selectedClass === cls.id
                        ? 'border-blue-500 bg-blue-100 grayscale-0'
                        : selectedClass
                          ? 'grayscale'
                          : 'grayscale-0 hover:bg-gray-50'
                    }`}
                  >
                    <TooltipWrapper content={cls.name}>
                      <Image
                        src={cls.classIcon}
                        alt={cls.name}
                        width={40}
                        height={40}
                        className='cursor-pointer'
                      />
                    </TooltipWrapper>
                  </Button>
                ))}
              </div>
              <Separator className='' />

              {selectedClass && (
                <div className='mt-2'>
                  <Label className='text-md mb-2 block font-medium'>
                    Выберите специализацию:
                  </Label>
                  <Separator className='my-2' />
                  <div className='flex flex-wrap gap-2'>
                    {selectedClassData?.specializations.map(spec => (
                      <Button
                        key={spec.id}
                        type='button'
                        variant='wowIcon'
                        size='wowIcon'
                        onClick={() => setSelectedSpec(spec.id)}
                        className={`flex flex-col items-center rounded border ${
                          selectedSpec === spec.id
                            ? 'border-blue-500 bg-blue-100 grayscale-0'
                            : selectedSpec
                              ? 'grayscale'
                              : 'grayscale-0 hover:bg-gray-50'
                        }`}
                      >
                        <TooltipWrapper content={spec.name}>
                          <Image
                            src={spec.specIcon}
                            alt={spec.name}
                            width={40}
                            height={40}
                            className='cursor-pointer'
                          />
                        </TooltipWrapper>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <Separator />
              <div className='mb-4'>
                <Label className='text-md mb-2 block font-medium'>
                  Выберите режим:
                </Label>
                <div className='grid grid-cols-2 gap-2 lg:grid-cols-3'>
                  {modes.map(mode => (
                    <Button
                      key={mode.id}
                      type='button'
                      onClick={() => setSelectedMode(mode.id)}
                      className={`h-8 rounded border font-bold ${
                        selectedMode === mode.id
                          ? 'border-blue-500 bg-blue-500 text-amber-50 dark:bg-blue-500'
                          : 'dark:hover:bg-gray-50'
                      }`}
                    >
                      {mode.name}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div className='mb-4'>
                <Label className='text-md mb-2 block font-medium'>
                  Версия игры:
                </Label>
                <Select
                  onValueChange={value => setSelectedExpansion(Number(value))}
                  value={selectedExpansion ? String(selectedExpansion) : ''}
                >
                  <SelectTrigger className='cursor-pointer'>
                    <SelectValue placeholder='Выберите версию игры' />
                  </SelectTrigger>
                  <SelectContent className='p-1'>
                    {expansions.map(expansion => (
                      <SelectItem
                        key={expansion.id}
                        value={String(expansion.id)}
                        className='cursor-pointer transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400 dark:focus:bg-gray-800 dark:focus:text-blue-400'
                      >
                        {expansion.name} {expansion.patchVersion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DialogHeader>
            <DialogFooter>
              <div className='flex w-full items-center justify-between'>
                <Button
                  type='submit'
                  loading={isLoading}
                  disabled={
                    isLoading ||
                    !selectedClass ||
                    !selectedSpec ||
                    !selectedMode ||
                    !selectedExpansion
                  }
                  className='font-bold'
                >
                  {isLoading ? 'Создание...' : 'Создать гайд'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
