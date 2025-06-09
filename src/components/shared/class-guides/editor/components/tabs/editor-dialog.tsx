'use client';

import React from 'react';
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
import { useEditorDialog } from '@root/components/hooks/guide/edit/tab-editor/use-tab-editor-dialog';

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
    const {
      isOpen,
      isDeleting,
      labelRef,
      handleSave,
      handleDelete,
      handleOpenChange,
    } = useEditorDialog(editingTab, editForm, onClose, onSave, onDelete);

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn('sm:max-w-[425px]', className)}
          aria-describedby={undefined}
        >
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
              loading={isDeleting}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </Button>
            <Button type='button' loading={isDeleting} onClick={handleSave}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

EditorDialog.displayName = 'EditorDialog';
