'use client';

import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TabData } from '@root/@types/prisma';
import { useTabsMutations } from './use-tabs-mutations';

interface EditForm {
  label: string;
  iconUrl: string;
}

interface UseTabsEditorProps {
  initialTabs: TabData[];
  defaultTab: string;
  sectionId: number;
}

interface UseTabsEditorReturn {
  tabs: TabData[];
  activeTab: string;
  editingTab: TabData | null;
  editForm: EditForm;
  isSaving: boolean;
  setActiveTab: (value: string) => void;
  addNewTab: () => void;
  updateTabContent: (value: string, newContent: string) => void;
  openEditDialog: (tab: TabData) => void;
  saveTabChanges: () => void;
  handleDeleteTab: () => Promise<void>;
  handleSaveTabs: (e: React.FormEvent) => void;
}

export const useTabsEditor = ({
  initialTabs,
  defaultTab,
  sectionId,
}: UseTabsEditorProps): UseTabsEditorReturn => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(
    defaultTab || initialTabs[0]?.value || ''
  );
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    label: '',
    iconUrl: '',
  });
  const { saveTabsMutation, deleteTabMutation } = useTabsMutations(sectionId);
  const isSaving = saveTabsMutation.isPending;

  // Синхронизация с initialTabs, сохраняя локальные изменения
  useEffect(() => {
    setTabs(prevTabs => {
      // Сохраняем новые табы (isNew: true), добавленные локально
      const localNewTabs = prevTabs.filter(tab => tab.isNew);
      // Объединяем initialTabs с локальными новыми табами
      const mergedTabs = [
        ...initialTabs.map(tab => ({ ...tab, isNew: false })), // Серверные табы
        ...localNewTabs.filter(
          localTab =>
            !initialTabs.some(serverTab => serverTab.value === localTab.value)
        ), // Локальные новые табы
      ];
      return mergedTabs;
    });
    if (
      !initialTabs.some(tab => tab.value === activeTab) &&
      initialTabs.length > 0
    ) {
      setActiveTab(initialTabs[0].value);
    }
  }, [initialTabs, activeTab]);

  // Сброс overflow для скролла
  useEffect(() => {
    if (!editingTab) {
      document.body.style.overflow = '';
    }
  }, [editingTab]);

  const addNewTab = useCallback(() => {
    const uniqueValue = `Tab-${crypto.randomUUID()}`;
    const newTabNumber = tabs.length + 1;
    const newTab: TabData = {
      value: uniqueValue,
      label: `Новый таб ${newTabNumber}`,
      iconUrl: '',
      content: '**Редактируйте содержимое** с помощью Markdown',
      sectionId,
      isNew: true,
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.value);
    console.log('Added new tab:', newTab);
  }, [tabs.length, sectionId]);

  const updateTabContent = useCallback((value: string, newContent: string) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.value === value ? { ...tab, content: newContent } : tab
      )
    );
  }, []);

  const openEditDialog = useCallback((tab: TabData) => {
    console.log('Opening edit dialog for tab:', tab);
    setEditingTab(tab);
    setEditForm({ label: tab.label, iconUrl: tab.iconUrl || '' });
  }, []);

  const saveTabChanges = useCallback(() => {
    if (!editingTab) return;
    setTabs(prev =>
      prev.map(tab =>
        tab.value === editingTab.value
          ? { ...tab, label: editForm.label, iconUrl: editForm.iconUrl }
          : tab
      )
    );
    setEditingTab(null);
  }, [editingTab, editForm]);

  const handleDeleteTab = useCallback(async () => {
    if (!editingTab) {
      console.error('editingTab is null');
      toast.error('Не выбран таб для удаления');
      return;
    }

    const deletedIndex = tabs.findIndex(tab => tab.value === editingTab.value);
    const deletedTab = editingTab;
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.value !== editingTab.value);
      console.log('Updated tabs:', newTabs);
      return newTabs;
    });

    if (activeTab === editingTab.value) {
      let newActiveTab = '';
      if (tabs.length > 1) {
        if (deletedIndex > 0) {
          newActiveTab = tabs[deletedIndex - 1].value;
        } else if (deletedIndex < tabs.length - 1) {
          newActiveTab = tabs[deletedIndex].value;
        }
      }
      setActiveTab(newActiveTab);
    }

    if (editingTab.id && !editingTab.isNew) {
      try {
        await deleteTabMutation.mutateAsync({ tabId: editingTab.id });
      } catch {
        setTabs(prev => [...prev, deletedTab]);
        return;
      }
    } else {
      toast.success('Несохранённый таб удалён');
    }

    setEditingTab(null);
  }, [editingTab, tabs, activeTab, deleteTabMutation]);

  const handleSaveTabs = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      saveTabsMutation.mutate(tabs, {
        onSuccess: updatedTabs => {
          setTabs(updatedTabs);
          if (
            !tabs.some(tab => tab.value === activeTab) &&
            updatedTabs.length > 0
          ) {
            setActiveTab(updatedTabs[0].value);
          }
        },
      });
    },
    [tabs, activeTab, saveTabsMutation]
  );

  return {
    tabs,
    activeTab,
    editingTab,
    editForm,
    isSaving,
    setActiveTab,
    addNewTab,
    updateTabContent,
    openEditDialog,
    saveTabChanges,
    handleDeleteTab,
    handleSaveTabs,
  };
};
