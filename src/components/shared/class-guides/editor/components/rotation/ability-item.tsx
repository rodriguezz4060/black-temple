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
import { SortableAbility } from './sortable-ability';
import WowheadLink from './wowhead-link';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { VerticalRowContainer } from './vertical-row-container';

interface AbilityItemProps {
  ability: Ability;
  index: number;
  abilitiesLength: number;
  verticalRows: VerticalRow[];
  onRemove: (id: string) => void;
  overId: string | null;
  activeId: string | null;
  isOver: boolean;
  zoneId: string;
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
}

export function AbilityItem({
  ability,
  index,
  abilitiesLength,
  verticalRows,
  onRemove,
  overId,
  activeId,
  isOver,
  zoneId,
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
}: AbilityItemProps) {
  return (
    <div className='relative flex flex-col items-center gap-2'>
      <div className='absolute bottom-full flex flex-col gap-2'>
        {verticalRows
          .filter(row => row.positionAfter === ability.id)
          .map(row => (
            <VerticalRowContainer
              key={row.id}
              row={row}
              onRemove={onRemove}
              showVerticalAbilityDialog={showVerticalAbilityDialog}
              setShowVerticalAbilityDialog={setShowVerticalAbilityDialog}
              onAddVerticalAbility={onAddVerticalAbility}
              dialogUrl={dialogUrl}
              setDialogUrl={setDialogUrl}
              error={error}
              setError={setError}
            />
          ))}
      </div>

      <div className='flex items-center'>
        {overId === ability.id && activeId !== ability.id && (
          <div className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-500' />
        )}
        <SortableAbility
          ability={ability}
          onRemove={onRemove}
          renderAbility={ability => (
            <WowheadLink
              id={Number(ability.spellId)}
              type={ability.type}
              isPtr={ability.isPtr}
              whData='large'
              ptrPrefix={
                ability.url.includes('/ptr-2')
                  ? 'ptr-2'
                  : ability.url.includes('/ptr')
                    ? 'ptr'
                    : undefined
              }
              className={`h-12 w-12 transition-transform duration-200 ${
                overId === ability.id && activeId !== ability.id
                  ? 'translate-x-8'
                  : ''
              }`}
            />
          )}
        />
        <Button
          size='sm'
          variant='ghost'
          onClick={() => setShowVerticalRowDialog(ability.id)}
          className='ml-2'
        >
          +
        </Button>
        {index === abilitiesLength - 1 && isOver && overId === zoneId && (
          <div className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-500' />
        )}
      </div>

      <Dialog
        open={showVerticalRowDialog === ability.id}
        onOpenChange={open => {
          if (!open) {
            setShowVerticalRowDialog(null);
            setDialogUrl('');
            setError(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление вертикального ряда</DialogTitle>
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
                onAddVerticalRow(dialogUrl, ability.id);
              }}
            >
              Добавить
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setShowVerticalRowDialog(null);
                setDialogUrl('');
                setError(null);
              }}
            >
              Отмена
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
