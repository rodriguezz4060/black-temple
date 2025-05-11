"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-list";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
// import { TUpdateTabsSchemas } from "./schemas/update-tabs-schemas";
import toast from "react-hot-toast";
import { updateTabs } from "@/app/actions";

interface TabData {
  value: string;
  label: string;
  iconUrl: string;
  content: string;
  heroTalentsId: number; // Добавлено поле heroTalentsId
}

interface HeroTalentsProps {
  initialTabs: TabData[];
  defaultTab?: string;

  guideId: number;
  onSave?: (tabs: TabData[]) => Promise<void>;
}

export const TabsEditor = ({
  initialTabs,
  defaultTab,
  guideId,
}: HeroTalentsProps) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(
    defaultTab || initialTabs[0]?.value || ""
  );
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [editForm, setEditForm] = useState({
    label: "",
    iconUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);

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

  const addNewTab = () => {
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

  const openEditDialog = (tab: TabData) => {
    setEditingTab(tab);
    setEditForm({
      label: tab.label,
      iconUrl: tab.iconUrl,
    });
  };

  const saveTabChanges = () => {
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

  const deleteTab = () => {
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

  // Инициализация React Hook Form
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
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка при обновлении табов"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="relative w-full">
            <ScrollArea
              type="auto"
              className="max-w-full whitespace-nowrap"
              ref={scrollAreaRef}
            >
              <div className="flex">
                <TabsList>
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="group relative pr-8"
                      ref={(node) => {
                        const map = getMap();
                        if (node) {
                          map.set(tab.value, node);
                        } else {
                          map.delete(tab.value);
                        }
                      }}
                    >
                      <span className="text-[16px] flex items-center">
                        {tab.iconUrl && (
                          <div
                            className="bg-[position:50%] bg-[size:1.2em_auto] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 rounded-[0.2em] box-content inline-block h-4 w-4 m-[0_.2em_-.2em]"
                            style={{ backgroundImage: `url('${tab.iconUrl}')` }}
                          />
                        )}
                        <span>{tab.label}</span>
                      </span>

                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openEditDialog(tab);
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog(tab);
                        }}
                        className="absolute right-1 -top-[12%] cursor-pointer h-6 w-6 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                      >
                        <Pencil className="h-3 w-3" />
                      </div>
                    </TabsTrigger>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addNewTab}
                    className="my-1.5 h-12 ml-1 -10 top-1/2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TabsList>
              </div>
              <div className="dark:bg-[#171717] items-center w-full h-[15px]">
                <ScrollBar orientation="horizontal" className={cn("p-[0px]")} />
              </div>
            </ScrollArea>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <Card className="rounded-none border-none dark:bg-[#171717]">
                <CardContent className="space-y-2 p-0">
                  <div className="px-2 ">
                    <MDEditor
                      value={tab.content}
                      onChange={(value) =>
                        updateTabContent(tab.value, value || "")
                      }
                      height={400}
                      previewOptions={{}}
                      data-color-mode={isDarkMode ? "dark" : "light"}
                      className=""
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Кнопка сохранения */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              "Сохранение..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Сохранить изменения
              </>
            )}
          </Button>
        </div>
      </form>
      <Dialog
        open={!!editingTab}
        onOpenChange={(open) => !open && setEditingTab(null)}
      >
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Редактирование таба</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tab-label" className="">
                Название
              </Label>
              <Input
                id="tab-label"
                value={editForm.label}
                onChange={(e) =>
                  setEditForm({ ...editForm, label: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tab-icon" className="">
                URL картинки
              </Label>
              <Input
                id="tab-icon"
                value={editForm.iconUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, iconUrl: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={deleteTab}
              className="mr-auto text-amber-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить
            </Button>
            <Button type="button" onClick={saveTabChanges}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
