import { TabData } from "@root/@types/prisma";
import { updateTabs } from "@root/app/actions";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export const useTabsManagement = (
  initialTabs: TabData[],
  defaultTab?: string
) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(
    defaultTab || initialTabs[0]?.value || ""
  );

  const addNewTab = (guideId: number) => {
    const newTabNumber = tabs.length + 1;
    const newTab: TabData = {
      value: `Tab${newTabNumber}`,
      label: `New Tab ${newTabNumber}`,
      iconUrl: "",
      content: "**Edit this content** using Markdown",
      heroTalentsId: guideId,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.value);
  };

  const updateTabContent = (value: string, newContent: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.value === value ? { ...tab, content: newContent } : tab
      )
    );
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
    addNewTab,
    updateTabContent,
    setTabs,
  };
};

export const useTabEdit = () => {
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [editForm, setEditForm] = useState({
    label: "",
    iconUrl: "",
  });

  const openEditDialog = (tab: TabData) => {
    setEditingTab(tab);
    setEditForm({
      label: tab.label,
      iconUrl: tab.iconUrl,
    });
  };

  const saveTabChanges = (
    tabs: TabData[],
    setTabs: React.Dispatch<React.SetStateAction<TabData[]>>
  ) => {
    if (!editingTab) return;

    setTabs(
      tabs.map((tab) =>
        tab.value === editingTab.value
          ? { ...tab, label: editForm.label, iconUrl: editForm.iconUrl }
          : tab
      )
    );
    setEditingTab(null);
  };

  const deleteTab = (
    tabs: TabData[],
    setTabs: React.Dispatch<React.SetStateAction<TabData[]>>,
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!editingTab) return;

    const deletedIndex = tabs.findIndex(
      (tab) => tab.value === editingTab.value
    );
    const newTabs = tabs.filter((tab) => tab.value !== editingTab.value);
    setTabs(newTabs);

    if (activeTab === editingTab.value) {
      let newActiveTab = "";
      if (deletedIndex > 0) {
        newActiveTab = tabs[deletedIndex - 1].value;
      } else if (deletedIndex < tabs.length - 1) {
        newActiveTab = tabs[deletedIndex + 1].value;
      }
      setActiveTab(newActiveTab);
    }

    setEditingTab(null);
  };

  return {
    editingTab,
    editForm,
    setEditForm,
    openEditDialog,
    saveTabChanges,
    deleteTab,
    setEditingTab,
  };
};

export const useTabsScroll = (activeTab: string) => {
  const tabsRef = useRef<Map<string, HTMLButtonElement> | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getMap = () => {
    if (!tabsRef.current) {
      tabsRef.current = new Map();
    }
    return tabsRef.current;
  };

  useEffect(() => {
    const map = getMap();
    const activeTabNode = map.get(activeTab);
    const scrollAreaNode = scrollAreaRef.current;

    if (activeTabNode && scrollAreaNode) {
      activeTabNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  return { tabsRef, scrollAreaRef, getMap };
};

export const useSaveTabs = (tabs: TabData[], guideId: number) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSend = {
        tabs: tabs.map((tab) => ({
          value: tab.value,
          label: tab.label,
          iconUrl: tab.iconUrl || null,
          content: tab.content,
          heroTalentsId: tab.heroTalentsId,
        })),
        guideId: guideId,
      };

      await updateTabs(dataToSend);
      toast.success("Табы успешно обновлены");
    } catch {
      toast.error("Ошибка при обновлении табов");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSubmit,
    isSaving,
  };
};
