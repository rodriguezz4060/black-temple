'use client';

import { useMemo, useState, useEffect } from 'react';
import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';
import WowheadLink from './wowhead-link';
import { DroppableZone } from './droppable-zone';
import { useDragAndDrop } from '@root/components/hooks/guide/edit/rotation/use-drag-and-drops';
import { useRotationState } from '@root/components/hooks/guide/edit/rotation/use-rotation-state';
import { useSaveRotation } from '@root/components/hooks/guide/edit/rotation/use-save-rotation';
import { MDTabContentEditor } from '../text-field/md-tab-content-editor';
import { TabData } from '@root/@types/prisma';
import { TabsContent } from '@root/components/ui/tabs-list';
import { Card, CardContent } from '@root/components/ui/card';
import { useRotationContext } from './rotation-context';

// Константы для расчета высоты
const ABILITY_HEIGHT = 60;
const ROW_GAP = 5;
const BASE_HEIGHT = 160;

interface RotationEditorProps {
  tab: TabData & { id: number; rotationId: number };
  onContentChange: (value: string) => void;
}

export function RotationEditor({ tab, onContentChange }: RotationEditorProps) {
  const { registerRotation } = useRotationContext();
  const [localRotationId, setLocalRotationId] = useState<number | null>(
    tab.rotationId || null
  );

  const {
    abilities,
    setAbilities,
    verticalRows,
    setVerticalRows,
    dialogUrl,
    setDialogUrl,
    error,
    setError,
    showAddAbilityDialog,
    setShowAddAbilityDialog,
    showVerticalRowDialog,
    setShowVerticalRowDialog,
    showVerticalAbilityDialog,
    setShowVerticalAbilityDialog,
    handleAddAbility,
    handleAddVerticalRow,
    handleAddVerticalAbility,
    removeAbility,
  } = useRotationState({ ...tab, rotationId: localRotationId });

  const {
    sensors,
    activeId,
    overId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop(abilities, setAbilities, verticalRows, setVerticalRows);

  const saveRotation = useSaveRotation(
    tab.id,
    localRotationId,
    abilities,
    verticalRows,
    setError
  );

  // Регистрируем функцию сохранения ротации в контексте
  useEffect(() => {
    registerRotation({
      tabValue: tab.value,
      rotationId: localRotationId,
      saveRotation,
      setRotationId: setLocalRotationId,
      setError,
    });
  }, [tab.value, localRotationId, saveRotation, setError, registerRotation]);

  // Синхронизируем localRotationId с tab.rotationId
  useEffect(() => {
    setLocalRotationId(tab.rotationId || null);
  }, [tab.rotationId]);

  const maxVerticalRowHeight = useMemo(() => {
    return verticalRows.reduce((maxHeight, row) => {
      const rowHeight = row.abilities.length * (ABILITY_HEIGHT + ROW_GAP);
      return Math.max(maxHeight, rowHeight);
    }, 0);
  }, [verticalRows]);

  const prepullAbilities = abilities.filter(
    ability => ability.isPrepull && !ability.verticalRowId
  );
  const pullAbilities = abilities.filter(
    ability => !ability.isPrepull && !ability.verticalRowId
  );
  const activeAbility =
    abilities.find(ability => ability.id === activeId) ||
    verticalRows
      .flatMap(row => row.abilities)
      .find(ability => ability.id === activeId);

  return (
    <TabsContent value={tab.value} className='mt-0 p-2 dark:bg-[#171717]'>
      <Card className='w-full max-w-full rounded-none border-none py-0 dark:bg-[#171717]'>
        <CardContent className='space-y-2 p-0'>
          <div className='mt-6 flex flex-col gap-6'>
            <DndContext
              sensors={sensors}
              collisionDetection={rectIntersection}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <ScrollArea className='w-full'>
                <div
                  className='relative flex flex-col justify-end rounded-lg border p-4'
                  style={{
                    minHeight: `${BASE_HEIGHT + maxVerticalRowHeight}px`,
                  }}
                >
                  <div className='flex gap-4'>
                    <DroppableZone
                      id='prepull-zone'
                      title='Препулл'
                      abilities={prepullAbilities}
                      verticalRows={verticalRows}
                      onRemove={removeAbility}
                      isPrepullZone={true}
                      overId={overId}
                      activeId={activeId}
                      onAddVerticalRow={handleAddVerticalRow}
                      showVerticalRowDialog={showVerticalRowDialog}
                      setShowVerticalRowDialog={setShowVerticalRowDialog}
                      onAddVerticalAbility={handleAddVerticalAbility}
                      showVerticalAbilityDialog={showVerticalAbilityDialog}
                      setShowVerticalAbilityDialog={
                        setShowVerticalAbilityDialog
                      }
                      dialogUrl={dialogUrl}
                      setDialogUrl={setDialogUrl}
                      error={error}
                      setError={setError}
                      showAddAbilityDialog={showAddAbilityDialog}
                      setShowAddAbilityDialog={setShowAddAbilityDialog}
                      onAddAbility={handleAddAbility}
                    />
                    <div className='relative flex flex-col items-center justify-center'>
                      <div className='h-16 w-px bg-gray-500' />
                    </div>
                    <DroppableZone
                      id='pull-zone'
                      title='Пулл'
                      abilities={pullAbilities}
                      verticalRows={verticalRows}
                      onRemove={removeAbility}
                      isPrepullZone={false}
                      overId={overId}
                      activeId={activeId}
                      onAddVerticalRow={handleAddVerticalRow}
                      showVerticalRowDialog={showVerticalRowDialog}
                      setShowVerticalRowDialog={setShowVerticalRowDialog}
                      onAddVerticalAbility={handleAddVerticalAbility}
                      showVerticalAbilityDialog={showVerticalAbilityDialog}
                      setShowVerticalAbilityDialog={
                        setShowVerticalAbilityDialog
                      }
                      dialogUrl={dialogUrl}
                      setDialogUrl={setDialogUrl}
                      error={error}
                      setError={setError}
                      showAddAbilityDialog={showAddAbilityDialog}
                      setShowAddAbilityDialog={setShowAddAbilityDialog}
                      onAddAbility={handleAddAbility}
                    />
                  </div>
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
              <DragOverlay>
                {activeAbility ? (
                  <WowheadLink
                    id={Number(activeAbility.spellId)}
                    type={activeAbility.type as 'spell' | 'item'}
                    isPtr={activeAbility.isPtr}
                    whData='large'
                    ptrPrefix={
                      activeAbility.url.includes('/ptr-2')
                        ? 'ptr-2'
                        : activeAbility.url.includes('/ptr')
                          ? 'ptr'
                          : undefined
                    }
                    className='h-12 w-12 opacity-80'
                  />
                ) : null}
              </DragOverlay>
            </DndContext>

            <MDTabContentEditor
              className='w-full px-2'
              content={tab.content}
              onContentChange={onContentChange}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
