import { TabData } from '@root/@types/prisma';
import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useEditorDialog = (
  editingTab: TabData | null,
  editForm: { label: string; iconUrl: string },
  onClose: () => void,
  onSave: () => void,
  onDelete: () => Promise<void>
) => {
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
    setTimeout(() => onClose(), 300);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setIsDeleting(false);
      setIsOpen(false);
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

  return {
    isOpen,
    isDeleting,
    labelRef,
    handleSave,
    handleDelete,
    handleOpenChange,
  };
};
