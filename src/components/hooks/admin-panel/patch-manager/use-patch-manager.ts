'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExpansionProps } from '@root/@types/prisma';
import { addPatchAction } from '@root/app/profile/admin/_actions/add-patch-action';
import { deletePatch } from '@root/app/profile/admin/_actions/delete-patch';
import { updatePatchAction } from '@root/app/profile/admin/_actions/update-patch';
import {
  addPatchWowSchema,
  TAddPatchWowSchema,
} from '@root/components/shared/profile/admin/schemas/add-patch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const usePatchManager = (
  initialExpansions: ExpansionProps[],
  currentPatch: string
) => {
  const [expansions, setExpansions] =
    useState<ExpansionProps[]>(initialExpansions);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingPatch, setEditingPatch] = useState<ExpansionProps | null>(null);

  const addForm = useForm<TAddPatchWowSchema>({
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

  const handleAddPatch = async (data: TAddPatchWowSchema) => {
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
        addForm.reset({ name: '', patchName: '', patchVersion: currentPatch });
      } else {
        toast.error(response.error || 'Не удалось добавить патч');
      }
    } catch {
      toast.error('Произошла ошибка');
    }
  };

  const handleDeletePatch = async (id: number) => {
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

  const handleEditPatch = (patch: ExpansionProps) => {
    setEditingPatch(patch);
    editForm.reset({
      name: patch.name,
      patchName: patch.patchName,
      patchVersion: patch.patchVersion,
    });
  };

  const handleEditSubmit = async (data: TAddPatchWowSchema) => {
    if (!editingPatch) {
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
        );
        setEditingPatch(null);
      } else {
        toast.error(response.error || 'Не удалось обновить патч');
      }
    } catch {
      toast.error('Произошла ошибка');
    }
  };

  return {
    expansions,
    isDeleting,
    editingPatch,
    addForm,
    editForm,
    handleAddPatch,
    handleDeletePatch,
    handleEditPatch,
    handleEditSubmit,
    setEditingPatch,
  };
};
