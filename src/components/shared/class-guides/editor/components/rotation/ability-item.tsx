'use client';

import { SortableAbility } from './sortable-ability';
import WowheadLink from './wowhead-link';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { VerticalRowContainer } from './vertical-row-container';
import { ChevronUp, Plus } from 'lucide-react';
import { TooltipWrapper } from '@root/components/shared/wrapper';
import { WowheadDialog } from './wowhead-dialog';
import { Button } from '@root/components/ui/button';

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
  // Проверяем, есть ли вертикальный ряд для данной способности
  const existingRow = verticalRows.find(
    row => row.positionAfter === ability.id
  );

  const handlePlusClick = () => {
    if (existingRow) {
      // Если ряд существует, открываем диалог для добавления способности в этот ряд
      setShowVerticalAbilityDialog(existingRow.id);
    } else {
      // Если ряда нет, открываем диалог для создания нового ряда
      setShowVerticalRowDialog(ability.id);
    }
  };

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
        <TooltipWrapper
          content={
            existingRow
              ? 'Добавить в вертикальную колонку'
              : 'Создать вертикальную колонку'
          }
          side='bottom'
        >
          <Button
            size='icon'
            variant='ghost'
            onClick={handlePlusClick}
            className='group relative transition-colors hover:bg-green-700'
          >
            <Plus className='h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90' />
            <ChevronUp className='animate-bounce-up absolute -top-4 left-1/2 -mt-2 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100' />
          </Button>
        </TooltipWrapper>
        {index === abilitiesLength - 1 && isOver && overId === zoneId && (
          <div className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-500' />
        )}
      </div>

      <WowheadDialog
        open={showVerticalRowDialog === ability.id}
        onOpenChange={open => {
          if (!open) {
            setShowVerticalRowDialog(null);
            setDialogUrl('');
            setError(null);
          }
        }}
        title='Добавление вертикального ряда'
        value={dialogUrl}
        onChange={setDialogUrl}
        error={error}
        onSubmit={() => onAddVerticalRow(dialogUrl, ability.id)}
        onCancel={() => {
          setShowVerticalRowDialog(null);
          setDialogUrl('');
          setError(null);
        }}
        placeholder='Введите ссылку на способность с Wowhead'
      />

      {existingRow && (
        <WowheadDialog
          open={showVerticalAbilityDialog === existingRow.id}
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
          onSubmit={() => onAddVerticalAbility(dialogUrl, existingRow.id)}
          onCancel={() => {
            setShowVerticalAbilityDialog(null);
            setDialogUrl('');
            setError(null);
          }}
          placeholder='Введите ссылку на способность с Wowhead'
        />
      )}
    </div>
  );
}
