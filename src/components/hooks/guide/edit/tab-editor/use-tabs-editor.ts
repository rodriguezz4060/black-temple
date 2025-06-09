'use client';

import { useState, useCallback } from 'react';
import { TabData } from '@root/@types/prisma';
import { useTabsMutations } from '@root/components/hooks/guide/edit/tab-editor/use-tabs-mutations';
import toast from 'react-hot-toast';
import { createTabInGroup } from '@root/app/class-guides/_actions/tab/tab-action';

interface UseTabsEditorProps {
  initialTabs: TabData[];
  defaultTab: string;
  sectionId: number;
  tabGroupId: number;
}

export const useTabsEditor = ({
  initialTabs,
  defaultTab,
  tabGroupId,
}: UseTabsEditorProps) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [editForm, setEditForm] = useState({ label: '', iconUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  const { saveTabsMutation, deleteTabMutation } = useTabsMutations(tabGroupId);

  const addNewTab = async () => {
    if (tabs.length >= 15) {
      toast.error('Достигнут лимит в 15 вкладки на группу');
      return;
    }

    const result = await createTabInGroup(tabGroupId);
    if (result.success && result.tab) {
      setTabs([...tabs, { ...result.tab, isNew: true }]);
      setActiveTab(result.tab.value);
      toast.success('Вкладка создана');
    } else {
      toast.error(result.error || 'Не удалось создать вкладку');
    }
  };

  const updateTabContent = useCallback((value: string, content: string) => {
    setTabs(tabs =>
      tabs.map(tab =>
        tab.value === value
          ? { ...tab, content, isNew: tab.isNew || false }
          : tab
      )
    );
  }, []);

  const updateTabImportString = useCallback(
    (value: string, importString: string) => {
      setTabs(tabs =>
        tabs.map(tab =>
          tab.value === value
            ? { ...tab, importString, isNew: tab.isNew || false }
            : tab
        )
      );
    },
    []
  );

  const openEditDialog = useCallback((tab: TabData) => {
    setEditingTab(tab);
    setEditForm({ label: tab.label, iconUrl: tab.iconUrl || '' });
  }, []);

  const saveTabChanges = useCallback(async () => {
    if (!editingTab) return;
    if (!editForm.label.trim()) {
      toast.error('Название таба не может быть пустым');
      return;
    }

    setIsSaving(true);
    try {
      const updatedTab = {
        ...editingTab,
        label: editForm.label,
        iconUrl: editForm.iconUrl || null,
      };
      setTabs(tabs =>
        tabs.map(tab => (tab.value === editingTab.value ? updatedTab : tab))
      );
      saveTabsMutation.mutate([updatedTab], {
        onSuccess: () => {
          toast.success('Изменения сохранены');
          setEditingTab(null);
        },
        onError: error => {
          toast.error(`Ошибка: ${error.message}`);
        },
      });
    } catch {
      toast.error('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  }, [editingTab, editForm, saveTabsMutation]);

  const handleDeleteTab = useCallback(async () => {
    if (!editingTab || !editingTab.id) return;

    setIsSaving(true);
    try {
      deleteTabMutation.mutate(
        { tabId: editingTab.id },
        {
          onSuccess: () => {
            setTabs(tabs => tabs.filter(tab => tab.value !== editingTab.value));
            setEditingTab(null);
            if (activeTab === editingTab.value && tabs.length > 1) {
              setActiveTab(
                tabs.find(tab => tab.value !== editingTab.value)?.value || ''
              );
            }
          },
          onError: error => {
            toast.error(`Ошибка: ${error.message}`);
          },
        }
      );
    } catch {
      toast.error('Не удалось удалить вкладку');
    } finally {
      setIsSaving(false);
    }
  }, [tabs, editingTab, activeTab, deleteTabMutation]);

  const handleSaveTabs = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      saveTabsMutation.mutate(tabs, {
        onSettled: () => {
          setIsSaving(false);
        },
        onSuccess: () => {
          toast.success('Все вкладки сохранены');
          setTabs(tabs => tabs.map(tab => ({ ...tab, isNew: false })));
        },
        onError: error => {
          toast.error(`Ошибка: ${error.message}`);
        },
      });
    },
    [tabs, saveTabsMutation]
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
    updateTabImportString,
    openEditDialog,
    saveTabChanges,
    handleDeleteTab,
    handleSaveTabs,
    setEditForm,
    setEditingTab,
  };
};
