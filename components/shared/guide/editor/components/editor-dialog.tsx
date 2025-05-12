import React from 'react';
import { TabData } from '@/@types/prisma';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface EditorDialogProps {
  editingTab: TabData | null;
  editForm: {
    label: string;
    iconUrl: string;
  };
  onEditFormChange: (
    field: keyof { label: string; iconUrl: string },
    value: string,
  ) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  className?: string;
}

export const EditorDialog: React.FC<EditorDialogProps> = ({
  editingTab,
  editForm,
  onEditFormChange,
  onClose,
  onSave,
  onDelete,
  className,
}) => {
  return (
    <Dialog open={!!editingTab} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle>Редактирование таба</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='tab-label'>Название</Label>
            <Input
              id='tab-label'
              value={editForm.label}
              onChange={(e) => onEditFormChange('label', e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='tab-icon'>URL картинки</Label>
            <Input
              id='tab-icon'
              value={editForm.iconUrl}
              onChange={(e) => onEditFormChange('iconUrl', e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter className='gap-2'>
          <Button
            type='button'
            variant='destructive'
            onClick={onDelete}
            className='mr-auto text-amber-50'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Удалить
          </Button>
          <Button type='button' onClick={onSave}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
