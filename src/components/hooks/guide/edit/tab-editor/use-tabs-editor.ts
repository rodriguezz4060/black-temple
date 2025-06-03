'use client';

import { useState } from 'react';
import { TabData } from '@root/@types/prisma';
import { createTabInGroup } from '@root/app/class-guides/_actions/section-action';

interface UseTabsEditorProps {
  initialTabs: TabData[];
  defaultTab: string;
  sectionId: number;
  tabGroupId: number;
}

export const useTabsEditor = ({
  initialTabs,
  defaultTab,
  sectionId,
  tabGroupId,
}: UseTabsEditorProps) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [editForm, setEditForm] = useState({ label: '', iconUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  const addNewTab = async () => {
    if (tabs.length >= 3) {
      alert('Достигнут лимит в 3 вкладки на группу');
      return;
    }

    const result = await createTabInGroup(tabGroupId, sectionId);
    if (result.success && result.tab) {
      setTabs([...tabs, { ...result.tab, isNew: true }]);
      setActiveTab(result.tab.value);
    } else {
      alert(result.error || 'Не удалось создать вкладку');
    }
  };

  const updateTabContent = (value: string, content: string) => {
    setTabs(tabs =>
      tabs.map(tab =>
        tab.value === value
          ? { ...tab, content, isNew: tab.isNew || false }
          : tab
      )
    );
  };

  const openEditDialog = (tab: TabData) => {
    setEditingTab(tab);
    setEditForm({ label: tab.label, iconUrl: tab.iconUrl || '' });
  };

  const saveTabChanges = async () => {
    if (!editingTab) return;
    setIsSaving(true);
    // Здесь должна быть логика сохранения изменений таба через API
    setIsSaving(false);
    setEditingTab(null);
  };

  const handleDeleteTab = async () => {
    if (!editingTab) return;
    // Здесь должна быть логика удаления таба через API
    setTabs(tabs => tabs.filter(tab => tab.value !== editingTab.value));
    setEditingTab(null);
  };

  const handleSaveTabs = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Здесь должна быть логика сохранения всех табов через API
    setIsSaving(false);
  };

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
