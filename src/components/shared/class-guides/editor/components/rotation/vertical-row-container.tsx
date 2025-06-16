'use client';

import { Button } from '@root/components/ui/button';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableAbility } from './sortable-ability';
import WowheadLink from './wowhead-link';
import { VerticalRow } from '@root/@types/prisma';
import { Plus } from 'lucide-react';
import { WowheadDialog } from './wowhead-dialog';

interface VerticalRowContainerProps {
  row: VerticalRow;
  onRemove: (id: string) => void;
  showVerticalAbilityDialog: string | null;
  setShowVerticalAbilityDialog: (id: string | null) => void;
  onAddVerticalAbility: (url: string, rowId: string) => void;
  dialogUrl: string;
  setDialogUrl: (url: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export function VerticalRowContainer({
  row,
  onRemove,
  showVerticalAbilityDialog,
  setShowVerticalAbilityDialog,
  onAddVerticalAbility,
  dialogUrl,
  setDialogUrl,
  error,
  setError,
}: VerticalRowContainerProps) {
  return (
    <div id={row.id}>
      <div className='flex flex-col gap-2 rounded bg-gray-200 p-1 dark:bg-gray-600'>
        <SortableContext
          id={row.id}
          items={row.abilities.map(a => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {row.abilities.map(vertAbility => (
            <SortableAbility
              key={vertAbility.id}
              ability={vertAbility}
              onRemove={onRemove}
              renderAbility={ability => (
                <WowheadLink
                  id={Number(ability.spellId)}
                  type={ability.type}
                  isPtr={ability.isPtr}
                  whData='medium'
                  ptrPrefix={
                    ability.url.includes('/ptr-2')
                      ? 'ptr-2'
                      : ability.url.includes('/ptr')
                        ? 'ptr'
                        : undefined
                  }
                  className='h-12 w-12'
                />
              )}
            />
          ))}
        </SortableContext>
        <WowheadDialog
          open={showVerticalAbilityDialog === row.id}
          onOpenChange={open => {
            if (!open) {
              setShowVerticalAbilityDialog(null);
              setDialogUrl('');
              setError(null);
            }
          }}
          title='Добавить способность в вертикальный ряд'
          value={dialogUrl}
          onChange={setDialogUrl}
          error={error}
          onSubmit={() => onAddVerticalAbility(dialogUrl, row.id)}
          onCancel={() => {
            setShowVerticalAbilityDialog(null);
            setDialogUrl('');
            setError(null);
          }}
          placeholder='Введите ссылку на способность с Wowhead'
        >
          <Button
            size='icon'
            variant='ghost'
            onClick={() => setShowVerticalAbilityDialog(row.id)}
            className='group relative self-center transition-colors hover:bg-green-700'
          >
            <Plus className='h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90' />
          </Button>
        </WowheadDialog>
      </div>
    </div>
  );
}
