'use client';

import { Button } from '@root/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@root/components/ui/dialog';
import { Input } from '@root/components/ui/input';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableAbility } from './sortable-ability';
import WowheadLink from './wowhead-link';
import { VerticalRow } from '@root/@types/prisma';

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
      <Dialog
        open={showVerticalAbilityDialog === row.id}
        onOpenChange={open => {
          if (!open) {
            setShowVerticalAbilityDialog(null);
            setDialogUrl('');
            setError(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить способность в вертикальный ряд</DialogTitle>
          </DialogHeader>
          <Input
            value={dialogUrl}
            onChange={e => setDialogUrl(e.target.value)}
            placeholder='Введите ссылку на способность с Wowhead'
            className='w-full'
          />
          {error && <div className='text-sm text-red-500'>{error}</div>}
          <DialogFooter>
            <Button
              onClick={() => {
                onAddVerticalAbility(dialogUrl, row.id);
              }}
            >
              Добавить
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setShowVerticalAbilityDialog(null);
                setDialogUrl('');
                setError(null);
              }}
            >
              Отмена
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
        <Button
          size='sm'
          variant='ghost'
          onClick={() => setShowVerticalAbilityDialog(row.id)}
          className='self-center'
        >
          +
        </Button>
      </div>
    </div>
  );
}
