'use client';

import { Button } from '@root/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@root/components/ui/dialog';
import { Input } from '@root/components/ui/input';
import { ReactNode } from 'react';

interface WowheadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  onSubmit: () => void;
  onCancel: () => void;
  placeholder?: string;
  children?: ReactNode;
}

export function WowheadDialog({
  open,
  onOpenChange,
  title,
  description,
  value,
  onChange,
  error,
  onSubmit,
  onCancel,
  placeholder = 'Введите ссылку на Wowhead',
  children,
}: WowheadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className='text-sm text-gray-500'>{description}</p>
          )}
        </DialogHeader>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className='w-full'
        />
        {error && <div className='text-sm text-red-500'>{error}</div>}
        <DialogFooter>
          <Button onClick={onCancel} variant='outline'>
            Отмена
          </Button>
          <Button onClick={onSubmit}>Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
