"use client";

import { Card, CardContent } from "@root/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@root/components/ui/tabs-list";
import { Button } from "@root/components/ui/button";
import { Plus, Pencil, Save } from "lucide-react";
import { ScrollArea, ScrollBar } from "@root/components/ui/scroll-area";
import { cn } from "@root/lib/utils";
import {
  useTabEdit,
  useTabsManagement,
  useTabsScroll,
} from "@root/components/hooks/";
import { EditorDialog } from "./components/editor-dialog";
import { MDTabContentEditor } from "./components/md-tab-content-editor";
import { useSaveTabs } from "@root/components/hooks/use-tab-editor";
import { TabData } from '@root/@types/prisma';

interface HeroTalentsProps {
  initialTabs: TabData[];
  defaultTab: string;
  guideId: number;
}

export const TabsEditor = ({
  initialTabs,
  defaultTab,
  guideId,
}: HeroTalentsProps) => {
  const {
    tabs,
    activeTab,
    setActiveTab,
    addNewTab,
    updateTabContent,
    setTabs,
  } = useTabsManagement(initialTabs, defaultTab);

  const {
    editingTab,
    editForm,
    setEditingTab,
    setEditForm,
    openEditDialog,
    saveTabChanges,
    deleteTab,
  } = useTabEdit();

  const { handleSubmit, isSaving } = useSaveTabs(tabs, guideId);
  const { scrollAreaRef, getMap } = useTabsScroll(activeTab);

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
                    onClick={() => addNewTab(guideId)}
                    className="my-1.5 h-11 ml-1 -10 top-1/2"
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
                  <MDTabContentEditor
                    className="px-2"
                    content={tab.content}
                    onContentChange={(value) =>
                      updateTabContent(tab.value, value)
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end mt-2">
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

      <EditorDialog
        editingTab={editingTab}
        editForm={editForm}
        onEditFormChange={(field, value) =>
          setEditForm((prev) => ({ ...prev, [field]: value }))
        }
        onClose={() => setEditingTab(null)}
        onSave={() => saveTabChanges(tabs, setTabs)}
        onDelete={() => deleteTab(tabs, setTabs, activeTab, setActiveTab)}
      />
    </div>
  );
};
