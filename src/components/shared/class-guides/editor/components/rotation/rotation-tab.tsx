import React from 'react';
import { Tabs, TabsList } from '@root/components/ui/tabs-list';
import { Button } from '@root/components/ui/button';
import { Plus, Save } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';
import { TabData } from '@root/@types/prisma';
import { useTabsScroll } from '@root/components/hooks';
import { cn } from '@root/lib/utils';
import { useTabsQuery } from '@root/components/hooks/guide/edit/tab-editor/use-tabs-query';
import { useTabsEditor } from '@root/components/hooks/guide/edit/tab-editor/use-tabs-editor';
import { EditorDialog } from '../tabs/editor-dialog';
import { TabTrigger } from '../tabs/tab-trigger';
import { RotationEditor } from './rotation-editor';
import { useRotationContext } from './rotation-context';

interface TabsEditorProps {
  initialTabs: TabData[];
  defaultTab: string;
  sectionId: number;
  tabGroupId: number;
}

export const RotationTab: React.FC<TabsEditorProps> = React.memo(
  ({ initialTabs, defaultTab, sectionId, tabGroupId }) => {
    const {
      data: tabsFromQuery,
      isLoading,
      error,
    } = useTabsQuery(tabGroupId, initialTabs);
    const {
      tabs,
      activeTab,
      editingTab,
      editForm,
      isSaving,
      setIsSaving,
      setActiveTab,
      addNewTab,
      openEditDialog,
      saveTabChanges,
      handleDeleteTab,
      handleSaveTabs,
      updateTabContent,
      setEditForm,
      setEditingTab,
    } = useTabsEditor({
      initialTabs: tabsFromQuery || initialTabs,
      defaultTab,
      sectionId,
      tabGroupId,
    });
    const { scrollAreaRef, getMap } = useTabsScroll(activeTab);
    const { saveAllRotations } = useRotationContext();

    const handleSaveAll = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        await saveAllRotations();
        await handleSaveTabs(e);
      } catch (err) {
        console.error('Ошибка при сохранении:', err);
      } finally {
        setIsSaving(false); // Сбрасываем isSaving после завершения
      }
    };

    const validTabs = tabs.map(tab => ({
      ...tab,
      id: tab.id ?? 0,
      rotationId: tab.rotationId ?? tab.rotation?.id ?? 0,
    }));

    return (
      <div className='space-y-4'>
        <form onSubmit={handleSaveAll}>
          {isLoading ? (
            <div className='p-4'>Загрузка табов...</div>
          ) : error ? (
            <div className='p-4 text-red-500'>Ошибка: {error.message}</div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className='relative w-full'>
                <ScrollArea
                  type='auto'
                  className='overflow-x-auto whitespace-nowrap'
                  ref={scrollAreaRef}
                >
                  <div className=''>
                    <TabsList className='grid grid-flow-col justify-start'>
                      {validTabs.map(tab => (
                        <TabTrigger
                          key={tab.value}
                          tab={tab}
                          isNew={tab.isNew || false}
                          onEdit={openEditDialog}
                          getMap={getMap}
                        />
                      ))}
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={addNewTab}
                        className='my-1.5 ml-1 h-11'
                        aria-label='Add new tab'
                        disabled={validTabs.length >= 15}
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </TabsList>
                  </div>
                  <div className='h-[15px] w-full items-center dark:bg-[#171717]'>
                    <ScrollBar
                      orientation='horizontal'
                      className={cn('p-[0px]')}
                    />
                  </div>
                </ScrollArea>
              </div>
              {validTabs.map(tab => (
                <RotationEditor
                  key={tab.id}
                  tab={tab}
                  onContentChange={value => updateTabContent(tab.value, value)}
                />
              ))}
            </Tabs>
          )}
          <div className='mt-2 flex justify-end'>
            <Button type='submit' loading={isSaving}>
              <Save className='mr-2 h-4 w-4' />
              Сохранить
            </Button>
          </div>
        </form>

        <EditorDialog
          editingTab={editingTab}
          editForm={editForm}
          onEditFormChange={(field, value) =>
            setEditForm({ ...editForm, [field]: value })
          }
          onClose={() => setEditingTab(null)}
          onSave={saveTabChanges}
          onDelete={handleDeleteTab}
        />
      </div>
    );
  }
);

RotationTab.displayName = 'RotationTab';
