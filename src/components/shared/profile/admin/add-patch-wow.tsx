'use client';

import { Title } from '@root/components/ui/title';
import React from 'react';
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
import { Expansion } from '@prisma/client';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { addPatchAction } from '@root/app/profile/admin/_actions/add-patch-action';
import { Badge } from '@root/components/ui/badge';
import { Label } from '@root/components/ui/label';

interface ExpansionProps {
  expansions: Expansion[];
  currentPatch: string;
}

export default function PatchesPage({
  expansions,
  currentPatch,
}: ExpansionProps) {
  const { data: session } = useSession();
  const form = useForm<TAddPatchWowSchema>({
    resolver: zodResolver(addPatchWowSchema),
    defaultValues: {
      name: '',
      patchName: '',
      patchVersion: currentPatch,
    },
  });

  const onSubmit = async (data: TAddPatchWowSchema) => {
    if (session?.user.role !== 'ADMIN') {
      toast(
        'У вас недостаточно прав для добавления патча. Только администраторы могут это делать.'
      );
      return;
    }
    const existingPatch = expansions.find(
      expansion => expansion.patchVersion === currentPatch
    );
    if (existingPatch && existingPatch.patchName !== data.patchName) {
      toast.error(
        `Патч с версией ${currentPatch} уже существует. Нельзя создать другой патч с той же версией.`
      );
      return;
    }

    try {
      const response = await addPatchAction({
        ...data,
        patchVersion: currentPatch,
      });
      if (response.success) {
        toast.success('Патч успешно добавлен');
        form.reset({ name: '', patchName: '', patchVersion: currentPatch });
      } else {
        toast.error('Не удалось добавить патч');
      }
    } catch {
      toast.error('Произошла ошибка при добавлении патча');
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
            <TableCaption>База патчей WoW</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Аддон</TableHead>
                <TableHead>Сезон</TableHead>
                <TableHead>Версия</TableHead>
                {session?.user.role === 'ADMIN' && (
                  <TableHead className='text-right'>Удалить</TableHead>
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
                      <TableCell className='text-right'>
                        <Button variant='destructive' size='sm'>
                          Удалить
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
    </div>
  );
}
