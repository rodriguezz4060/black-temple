'use client';

import { Title } from '@root/components/ui/title';
import React, { useState } from 'react';
import { FormInput } from '@root/components/shared/forms/input-form';
import { FormProvider, useForm } from 'react-hook-form';
import { addPatchWowSchema, TAddPatchWowSchema } from './schemas/add-patch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@root/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@root/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@root/components/ui/dialog';
import { Expansion } from '@prisma/client';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { addPatchAction } from '@root/app/profile/admin/_actions/add-patch-action';
import { deletePatch } from '@root/app/profile/admin/_actions/delete-patch';
import { Badge } from '@root/components/ui/badge';
import { Label } from '@root/components/ui/label';
import { updatePatchAction } from '@root/app/profile/admin/_actions/update-patch';

interface ExpansionProps {
  expansions: Expansion[];
  currentPatch: string;
}

export default function PatchesPage({
  expansions: initialExpansions,
  currentPatch,
}: ExpansionProps) {
  const { data: session } = useSession();
  const [expansions, setExpansions] = useState<Expansion[]>(initialExpansions);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingPatch, setEditingPatch] = useState<Expansion | null>(null);

  const form = useForm<TAddPatchWowSchema>({
    resolver: zodResolver(addPatchWowSchema),
    defaultValues: {
      name: '',
      patchName: '',
      patchVersion: currentPatch,
    },
  });

  const editForm = useForm<TAddPatchWowSchema>({
    resolver: zodResolver(addPatchWowSchema),
    defaultValues: {
      name: '',
      patchName: '',
      patchVersion: currentPatch,
    },
  });

  const onSubmit = async (data: TAddPatchWowSchema) => {
    if (session?.user.role !== 'ADMIN') {
      toast.error('Недостаточно прав');
      return;
    }

    const existingPatch = expansions.find(
      expansion => expansion.patchVersion === currentPatch
    );
    if (existingPatch && existingPatch.patchName !== data.patchName) {
      toast.error(`Патч с версией ${currentPatch} уже существует.`);
      return;
    }

    try {
      const response = await addPatchAction({
        ...data,
        patchVersion: currentPatch,
      });
      if (response.success && response.data) {
        toast.success('Патч успешно добавлен');
        setExpansions([...expansions, response.data]);
        form.reset({ name: '', patchName: '', patchVersion: currentPatch });
      } else {
        toast.error(response.error || 'Не удалось добавить патч');
      }
    } catch {
      toast.error('Произошла ошибка');
    }
  };

  const handleDelete = async (id: number) => {
    if (session?.user.role !== 'ADMIN') {
      toast.error('Только администраторы могут удалять патчи');
      return;
    }

    setIsDeleting(id);
    try {
      const response = await deletePatch(id);
      if (response.success) {
        toast.success('Патч успешно удален');
        setExpansions(expansions.filter(expansion => expansion.id !== id));
      } else {
        toast.error(response.error || 'Не удалось удалить патч');
      }
    } catch {
      toast.error('Произошла ошибка');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (patch: Expansion) => {
    setEditingPatch(patch);
    editForm.reset({
      name: patch.name,
      patchName: patch.patchName,
      patchVersion: patch.patchVersion,
    });
  };

  const handleEditSubmit = async (data: TAddPatchWowSchema) => {
    if (!editingPatch || session?.user.role !== 'ADMIN') {
      toast.error('Недостаточно прав или патч не выбран');
      return;
    }

    try {
      const response = await updatePatchAction(editingPatch.id, {
        ...data,
        patchVersion: currentPatch,
      });
      if (response.success && response.data) {
        toast.success('Патч успешно обновлен');
        setExpansions(
          expansions.map(exp =>
            exp.id === editingPatch.id ? response.data : exp
          )
        ); // Обновляем после тоста
        setEditingPatch(null);
      } else {
        toast.error(response.error || 'Не удалось обновить патч');
      }
    } catch {
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[40%_60%]'>
        {session?.user.role === 'ADMIN' && (
          <div className='bg-muted/50 rounded-md p-5'>
            <Title
              className='mb-4 text-2xl font-bold'
              text='Добавить новый патч'
            />
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
        )}
        <div className='bg-muted/50 rounded-md p-5'>
          <Title className='mb-4 text-2xl font-bold' text='База патчей WoW' />
          <Table>
            <TableCaption>
              {isDeleting ||
              form.formState.isSubmitting ||
              editForm.formState.isSubmitting
                ? 'Обновление данных...'
                : 'База патчей WoW'}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Аддон</TableHead>
                <TableHead>Сезон</TableHead>
                <TableHead>Версия</TableHead>
                {session?.user.role === 'ADMIN' && (
                  <TableHead className='text-right'>Действия</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {expansions.length > 0 ? (
                expansions.map(expansion => (
                  <TableRow key={expansion.id}>
                    <TableCell className='font-medium'>
                      {expansion.name}
                    </TableCell>
                    <TableCell>{expansion.patchName}</TableCell>
                    <TableCell>{expansion.patchVersion}</TableCell>
                    {session?.user.role === 'ADMIN' && (
                      <TableCell className='flex justify-end gap-2 text-right'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEdit(expansion)}
                          disabled={isDeleting === expansion.id}
                        >
                          Редактировать
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => handleDelete(expansion.id)}
                          disabled={isDeleting === expansion.id}
                        >
                          {isDeleting === expansion.id
                            ? 'Удаление...'
                            : 'Удалить'}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={session?.user.role === 'ADMIN' ? 4 : 3}
                    className='py-4 text-center'
                  >
                    Нет данных о патчах.{' '}
                    {session?.user.role === 'ADMIN' &&
                      'Добавьте первый патч используя форму слева.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Модальное окно для редактирования */}
      <Dialog open={!!editingPatch} onOpenChange={() => setEditingPatch(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать патч</DialogTitle>
          </DialogHeader>
          <FormProvider {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditSubmit)}
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
                <Badge
                  variant='outline'
                  className='mr-auto"Worst case scenario, we’re only wrong 100% of the time." h-10 text-2xl'
                >
                  {currentPatch}
                </Badge>
              </div>
              <DialogFooter>
                <Button
                  variant='outline'
                  onClick={() => setEditingPatch(null)}
                  type='button'
                >
                  Отмена
                </Button>
                <Button loading={editForm.formState.isSubmitting} type='submit'>
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
