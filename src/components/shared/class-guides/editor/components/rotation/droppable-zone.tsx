'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { AbilityItem } from './ability-item';

import { WowheadDialog } from './wowhead-dialog';
import { Plus } from 'lucide-react';
import { Button } from '@root/components/ui/button';

interface DroppableZoneProps {
  id: string;
  title: string;
  abilities: Ability[];
  verticalRows: VerticalRow[];
  onRemove: (id: string) => void;
  isPrepullZone: boolean;
  overId: string | null;
  activeId: string | null;
  onAddVerticalRow: (url: string, afterAbilityId: string) => void;
  showVerticalRowDialog: string | null;
  setShowVerticalRowDialog: (id: string | null) => void;
  onAddVerticalAbility: (url: string, rowId: string) => void;
  showVerticalAbilityDialog: string | null;
  setShowVerticalAbilityDialog: (id: string | null) => void;
  dialogUrl: string;
  setDialogUrl: (url: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  showAddAbilityDialog: string | null;
  setShowAddAbilityDialog: (id: string | null) => void;
  onAddAbility: (zoneId: string) => void;
}

export function DroppableZone({
  id,
  title,
  abilities,
  verticalRows,
  onRemove,
  isPrepullZone,
  overId,
  activeId,
  onAddVerticalRow,
  showVerticalRowDialog,
  setShowVerticalRowDialog,
  onAddVerticalAbility,
  showVerticalAbilityDialog,
  setShowVerticalAbilityDialog,
  dialogUrl,
  setDialogUrl,
  error,
  setError,
  showAddAbilityDialog,
  setShowAddAbilityDialog,
  onAddAbility,
}: DroppableZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex min-h-[120px] flex-col gap-2 rounded-lg p-4 transition-all duration-300 ${
        isOver ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-50 dark:bg-gray-800'
      } ${isPrepullZone ? 'min-w-[80px] flex-initial' : 'flex-1'}`}
    >
      <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
        {title}
      </h4>

      <SortableContext
        id={id}
        items={abilities.map(a => a.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className='flex flex-col gap-4'>
          <div
            className='relative flex min-h-[60px] items-center gap-2'
            style={{ zIndex: 1 }}
          >
            {abilities.map((ability, index) => (
              <AbilityItem
                key={ability.id}
                ability={ability}
                index={index}
                abilitiesLength={abilities.length}
                verticalRows={verticalRows}
                onRemove={onRemove}
                overId={overId}
                activeId={activeId}
                isOver={isOver}
                zoneId={id}
                showVerticalRowDialog={showVerticalRowDialog}
                setShowVerticalRowDialog={setShowVerticalRowDialog}
                onAddVerticalRow={onAddVerticalRow}
                showVerticalAbilityDialog={showVerticalAbilityDialog}
                setShowVerticalAbilityDialog={setShowVerticalAbilityDialog}
                onAddVerticalAbility={onAddVerticalAbility}
                dialogUrl={dialogUrl}
                setDialogUrl={setDialogUrl}
                error={error}
                setError={setError}
              />
            ))}
            <WowheadDialog
              open={showAddAbilityDialog === id}
              onOpenChange={open => {
                setShowAddAbilityDialog(open ? id : null);
                if (!open) {
                  setDialogUrl('');
                  setError(null);
                }
              }}
              title='Добавить способность'
              description='Введите ссылку на способность или предмет с Wowhead.'
              value={dialogUrl}
              onChange={setDialogUrl}
              error={error}
              onSubmit={() => onAddAbility(id)}
              onCancel={() => {
                setShowAddAbilityDialog(null);
                setDialogUrl('');
                setError(null);
              }}
              placeholder='Введите ссылку на Wowhead'
            >
              <Button
                size='icon'
                variant='outline'
                className='group ml-2 h-12 w-12 transition-colors hover:bg-green-700'
              >
                <Plus className='h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90' />
              </Button>
            </WowheadDialog>
            {abilities.length === 0 && isOver && overId === id && (
              <div className='h-12 w-1 rounded-full bg-blue-500 dark:bg-blue-400' />
            )}
          </div>
        </div>
      </SortableContext>
    </div>
  );
}
