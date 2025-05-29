'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@root/components/ui/dialog';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormInput } from '@root/components/shared/forms/input-form';
import { Button } from '@root/components/ui/button';
import { Badge } from '@root/components/ui/badge';
import { Label } from '@root/components/ui/label';
import { Expansion } from '@prisma/client';
import { TAddPatchWowSchema } from '../schemas/add-patch';

interface EditPatchFormProps {
  editingPatch: Expansion | null;
  form: UseFormReturn<TAddPatchWowSchema>;
  onSubmit: (data: TAddPatchWowSchema) => void;
  onClose: () => void;
  currentPatch: string;
}

export default function EditPatchForm({
  editingPatch,
  form,
  onSubmit,
  onClose,
  currentPatch,
}: EditPatchFormProps) {
  return (
    <Dialog open={!!editingPatch} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать патч</DialogTitle>
        </DialogHeader>
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
            <DialogFooter>
              <Button variant='outline' onClick={onClose} type='button'>
                Отмена
              </Button>
              <Button loading={form.formState.isSubmitting} type='submit'>
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
