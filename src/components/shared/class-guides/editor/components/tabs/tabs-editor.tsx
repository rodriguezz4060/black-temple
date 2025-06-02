'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@root/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@root/components/ui/tabs-list';
import { Button } from '@root/components/ui/button';
import { Plus, Pencil, Save } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';
import toast from 'react-hot-toast';
import { EditorDialog } from './editor-dialog';
import { MDTabContentEditor } from '@root/components/shared/class-guides/editor/components/text-field/md-tab-content-editor';
import { TabData } from '@root/@types/prisma';
import { useTabsScroll } from '@root/components/hooks';
import { cn } from '@root/lib/utils';
import {
  deleteTab,
  saveTabs,
} from '@root/app/class-guides/_actions/tabs-actions';

interface TabsEditorProps {
  initialTabs: TabData[];
  defaultTab: string;
  sectionId: number;
}

interface EditForm {
  label: string;
  iconUrl: string;
}

export const TabsEditor: React.FC<TabsEditorProps> = React.memo(
  ({ initialTabs, defaultTab, sectionId }) => {
    const [tabs, setTabs] = useState<TabData[]>(initialTabs);
    const [activeTab, setActiveTab] = useState(
      defaultTab || initialTabs[0]?.value || ''
    );
    const [editingTab, setEditingTab] = useState<TabData | null>(null);
    const [editForm, setEditForm] = useState<EditForm>({
      label: '',
      iconUrl: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const { scrollAreaRef, getMap } = useTabsScroll(activeTab);

    // Логирование initialTabs для отладки
    useEffect(() => {
      console.log('initialTabs:', initialTabs);
    }, [initialTabs]);

    const addNewTab = useCallback(() => {
      const newTabNumber = tabs.length + 1;
      const newTab: TabData = {
        value: `Tab${newTabNumber}`,
        label: `Новый таб ${newTabNumber}`,
        iconUrl: '',
        content: '**Редактируйте содержимое** с помощью Markdown',
        sectionId,
        isNew: true, // Помечаем как несохранённый
      };
      setTabs(prev => [...prev, newTab]);
      setActiveTab(newTab.value);
    }, [tabs, sectionId]);

    const updateTabContent = useCallback(
      (value: string, newContent: string) => {
        setTabs(prev =>
          prev.map(tab =>
            tab.value === value ? { ...tab, content: newContent } : tab
          )
        );
      },
      []
    );

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

      const deletedIndex = tabs.findIndex(
        tab => tab.value === editingTab.value
      );
      setTabs(prev => {
        const newTabs = prev.filter(tab => tab.value !== editingTab.value);
        console.log('Updated tabs:', newTabs);
        return newTabs;
      });

      if (activeTab === editingTab.value) {
        let newActiveTab = '';
        if (deletedIndex > 0) {
          newActiveTab = tabs[deletedIndex - 1].value;
        } else if (deletedIndex < tabs.length - 1) {
          newActiveTab = tabs[deletedIndex + 1].value;
        }
        setActiveTab(newActiveTab);
      }

      if (editingTab.id && !editingTab.isNew) {
        try {
          await deleteTab(editingTab.id, sectionId);
          toast.success('Таб успешно удален из базы данных');
        } catch (error) {
          console.error('Client-side delete error:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Неизвестная ошибка';
          toast.error(`Ошибка при удалении таба: ${errorMessage}`);
          // Восстанавливаем таб, если серверная ошибка
          setTabs(prev => [...prev, editingTab]);
          return;
        }
      } else {
        toast.success('Несохранённый таб удалён');
      }

      setEditingTab(null);
    }, [editingTab, tabs, activeTab, sectionId]);

    const handleSaveTabs = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
          const updatedTabs = await saveTabs(tabs, sectionId);
          setTabs(updatedTabs); // Обновляем табы с ID от сервера
          toast.success('Табы успешно сохранены');
        } catch (error) {
          console.error('Client-side save error:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Неизвестная ошибка';
          toast.error(`Ошибка при сохранении табов: ${errorMessage}`);
        } finally {
          setIsSaving(false);
        }
      },
      [tabs, sectionId]
    );

    return (
      <div className='space-y-4'>
        <form onSubmit={handleSaveTabs}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <ScrollArea
              type='auto'
              ref={scrollAreaRef}
              className='max-w-full whitespace-nowrap'
            >
              <div className='flex'>
                <TabsList>
                  {tabs.map(tab => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className={cn(
                        'group relative pr-8',
                        tab.isNew && 'bg-yellow-100 dark:bg-yellow-900'
                      )}
                      ref={node => {
                        const map = getMap();
                        if (node) map.set(tab.value, node);
                        else map.delete(tab.value);
                      }}
                    >
                      <span className='flex items-center text-[16px]'>
                        {tab.iconUrl && (
                          <div
                            className='m-[0_.2em_-.2em] box-content inline-block h-4 w-4 rounded-[0.2em] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 bg-[size:1.2em_auto] bg-[position:50%]'
                            style={{ backgroundImage: `url('${tab.iconUrl}')` }}
                          />
                        )}
                        <span>{tab.label}</span>
                        {tab.isNew && (
                          <span className='ml-1 text-xs text-yellow-600'>
                            (новый)
                          </span>
                        )}
                      </span>
                      <div
                        role='button'
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openEditDialog(tab);
                          }
                        }}
                        onClick={e => {
                          e.stopPropagation();
                          openEditDialog(tab);
                        }}
                        className='hover:bg-accent hover:text-accent-foreground absolute -top-[12%] right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md opacity-0 group-hover:opacity-100'
                      >
                        <Pencil className='h-3 w-3' />
                      </div>
                    </TabsTrigger>
                  ))}
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={addNewTab}
                    className='my-1.5 ml-1 h-11'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </TabsList>
              </div>
              <div className='h-[15px] w-full items-center dark:bg-[#171717]'>
                <ScrollBar orientation='horizontal' className={cn('p-[0px]')} />
              </div>
            </ScrollArea>

            {tabs.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className='mt-0'>
                <Card className='rounded-none border-none dark:bg-[#171717]'>
                  <CardContent className='space-y-2 p-0'>
                    <MDTabContentEditor
                      className='px-2'
                      content={tab.content}
                      onContentChange={value =>
                        updateTabContent(tab.value, value)
                      }
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={isSaving} loading={isSaving}>
              <Save className='mr-2 h-4 w-4' />
              Сохранить
            </Button>
          </div>
        </form>

        <EditorDialog
          editingTab={editingTab}
          editForm={editForm}
          onEditFormChange={(field, value) =>
            setEditForm(prev => ({ ...prev, [field]: value }))
          }
          onClose={() => setEditingTab(null)}
          onSave={saveTabChanges}
          onDelete={handleDeleteTab}
        />
      </div>
    );
  }
);

TabsEditor.displayName = 'TabsEditor';
