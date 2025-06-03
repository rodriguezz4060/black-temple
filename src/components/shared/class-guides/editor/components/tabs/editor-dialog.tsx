'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@root/components/ui/dialog';
import { Button } from '@root/components/ui/button';
import { Input } from '@root/components/ui/input';
import { Label } from '@root/components/ui/label';
import { Trash2 } from 'lucide-react';
import { cn } from '@root/lib/utils';
import { TabData } from '@root/@types/prisma';
import toast from 'react-hot-toast';

interface EditorDialogProps {
  editingTab: TabData | null;
  editForm: { label: string; iconUrl: string };
  onEditFormChange: (
    field: keyof { label: string; iconUrl: string },
    value: string
  ) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => Promise<void>;
  className?: string;
}

export const EditorDialog: React.FC<EditorDialogProps> = React.memo(
  ({
    editingTab,
    editForm,
    onEditFormChange,
    onClose,
    onSave,
    onDelete,
    className,
  }) => {
    const [isOpen, setIsOpen] = useState(!!editingTab);
    const [isDeleting, setIsDeleting] = useState(false);
    const labelRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setIsOpen(!!editingTab);
      if (editingTab && labelRef.current) {
        labelRef.current.focus();
      }
    }, [editingTab]);

    const validateForm = useCallback(() => {
      if (!editForm.label.trim()) {
        toast.error('Название таба не может быть пустым');
        return false;
      }
      return true;
    }, [editForm.label]);

    const handleSave = () => {
      if (!validateForm()) return;
      onSave();
      setIsOpen(false);
      setTimeout(() => onClose(), 300); // Ждём завершения анимации
    };

    const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDelete();
        setIsDeleting(false);
        setIsOpen(false);
        toast.success('Таб успешно удалён');
        setTimeout(() => onClose(), 300);
      } catch {
        setIsDeleting(false);
        toast.error('Ошибка при удалении таба');
      }
    };

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className={cn('sm:max-w-[425px]', className)}>
          <DialogHeader>
            <DialogTitle>Редактирование таба</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='tab-label'>Название</Label>
              <Input
                id='tab-label'
                ref={labelRef}
                value={editForm.label}
                onChange={e => onEditFormChange('label', e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='tab-icon'>URL картинки</Label>
              <Input
                id='tab-icon'
                value={editForm.iconUrl}
                onChange={e => onEditFormChange('iconUrl', e.target.value)}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter className='gap-2'>
            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              className='mr-auto text-amber-50'
              disabled={isDeleting}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </Button>
            <Button type='button' onClick={handleSave}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

EditorDialog.displayName = 'EditorDialog';
