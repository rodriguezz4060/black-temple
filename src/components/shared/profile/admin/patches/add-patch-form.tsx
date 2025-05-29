'use client';

import { Title } from '@root/components/ui/title';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { Badge } from '@root/components/ui/badge';
import { Label } from '@root/components/ui/label';
import { TAddPatchWowSchema } from '../schemas/add-patch';

interface AddPatchFormProps {
  form: UseFormReturn<TAddPatchWowSchema>;
  onSubmit: (data: TAddPatchWowSchema) => void;
  currentPatch: string;
}

export default function AddPatchForm({
  form,
  onSubmit,
  currentPatch,
}: AddPatchFormProps) {
  return (
    <div className='bg-muted/50 max-h-[385px] rounded-md p-5'>
      <Title className='mb-4 text-2xl font-bold' text='Добавить новый патч' />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormInput
            name='name'
            label='Название аддона'
            placeholder='The War Within'
            required
          />
          <FormInput
            name='patchName'
            label='Название патча'
            placeholder='Nightfall'
            required
          />
          <div className='flex flex-col gap-2'>
            <Label className='text-[16px]'>Текущая версия игры:</Label>
            <Badge variant='outline' className='mr-auto h-10 text-2xl'>
              {currentPatch}
            </Badge>
          </div>
          <Button
            loading={form.formState.isSubmitting}
            className='flex cursor-pointer items-center gap-2 text-sm font-bold'
            type='submit'
          >
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
