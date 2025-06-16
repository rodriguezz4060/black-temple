'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  rectIntersection,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';
import WowheadLink from './wowhead-link';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { DroppableZone } from './droppable-zone';

// Константа для высоты одной способности (примерное значение в пикселях)
const ABILITY_HEIGHT = 60; // Высота одной способности (включая отступы)
const ROW_GAP = 5; // Отступ между способностями в вертикальном ряду
const BASE_HEIGHT = 160; // Базовая высота контейнера без вертикальных рядов

export function RotationEditor() {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [verticalRows, setVerticalRows] = useState<VerticalRow[]>([]);
  const [dialogUrl, setDialogUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [showAddAbilityDialog, setShowAddAbilityDialog] = useState<
    string | null
  >(null);
  const [showVerticalRowDialog, setShowVerticalRowDialog] = useState<
    string | null
  >(null);
  const [showVerticalAbilityDialog, setShowVerticalAbilityDialog] = useState<
    string | null
  >(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Вычисляем максимальную высоту всех вертикальных рядов
  const maxVerticalRowHeight = useMemo(() => {
    return verticalRows.reduce((maxHeight, row) => {
      const rowHeight = row.abilities.length * (ABILITY_HEIGHT + ROW_GAP);
      return Math.max(maxHeight, rowHeight);
    }, 0);
  }, [verticalRows]);

  const handleAddAbility = (zoneId: string) => {
    if (!dialogUrl.trim()) {
      setError('Введите ссылку');
      return;
    }

    const wowheadRegex =
      /https?:\/\/(?:www\.|ptr\.|ru\.)?(?:wowhead\.com(?:\/(ptr-2|ptr|[a-z]{2}))?)\/(spell|item)=(\d+)(?:\/([\w-]+))?/i;
    const match = dialogUrl.match(wowheadRegex);

    if (!match) {
      setError(
        'Введите действительную ссылку на способность или предмет с Wowhead'
      );
      return;
    }

    const [, prefix, type, spellId, slug] = match;
    const isPtr = prefix === 'ptr' || prefix === 'ptr-2';

    let baseUrl: string;
    if (prefix === 'ptr') {
      baseUrl = 'https://www.wowhead.com/ptr';
    } else if (prefix === 'ptr-2') {
      baseUrl = 'https://www.wowhead.com/ptr-2';
    } else {
      baseUrl = 'https://www.wowhead.com';
    }
    const finalUrl = `${baseUrl}/${type}=${spellId}${slug ? `/${slug}` : ''}`;

    const name = slug
      ? slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : `${type.charAt(0).toUpperCase() + type.slice(1)} ${spellId}`;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      name,
      url: finalUrl,
      spellId,
      type: type as 'spell' | 'item',
      isPtr,
      isPrepull: zoneId === 'prepull-zone',
    };

    setAbilities([...abilities, newAbility]);
    setDialogUrl('');
    setError(null);
    setShowAddAbilityDialog(null);
  };

  const handleAddVerticalRow = (url: string, afterAbilityId: string) => {
    if (!url.trim()) {
      setError('Введите ссылку для вертикального ряда');
      return;
    }

    const wowheadRegex =
      /https?:\/\/(?:www\.|ptr\.|ru\.)?(?:wowhead\.com(?:\/(ptr-2|ptr|[a-z]{2}))?)\/(spell|item)=(\d+)(?:\/([\w-]+))?/i;
    const match = url.match(wowheadRegex);

    if (!match) {
      setError(
        'Введите действительную ссылку на способность или предмет с Wowhead'
      );
      return;
    }

    const [, prefix, type, spellId, slug] = match;
    const isPtr = prefix === 'ptr' || prefix === 'ptr-2';

    let baseUrl: string;
    if (prefix === 'ptr') {
      baseUrl = 'https://www.wowhead.com/ptr';
    } else if (prefix === 'ptr-2') {
      baseUrl = 'https://www.wowhead.com/ptr-2';
    } else {
      baseUrl = 'https://www.wowhead.com';
    }
    const finalUrl = `${baseUrl}/${type}=${spellId}${slug ? `/${slug}` : ''}`;

    const name = slug
      ? slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : `${type.charAt(0).toUpperCase() + type.slice(1)} ${spellId}`;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      name,
      url: finalUrl,
      spellId,
      type: type as 'spell' | 'item',
      isPtr,
      isPrepull: false,
    };

    const newRow: VerticalRow = {
      id: `row-${Date.now()}`,
      abilities: [newAbility],
      positionAfter: afterAbilityId,
    };

    setVerticalRows([...verticalRows, newRow]);
    setShowVerticalRowDialog(null);
    setDialogUrl('');
    setError(null);
  };

  const handleAddVerticalAbility = (url: string, rowId: string) => {
    if (!url.trim()) {
      setError('Введите ссылку для способности');
      return;
    }

    const wowheadRegex =
      /https?:\/\/(?:www\.|ptr\.|ru\.)?(?:wowhead\.com(?:\/(ptr-2|ptr|[a-z]{2}))?)\/(spell|item)=(\d+)(?:\/([\w-]+))?/i;
    const match = url.match(wowheadRegex);

    if (!match) {
      setError(
        'Введите действительную ссылку на способность или предмет с Wowhead'
      );
      return;
    }

    const [, prefix, type, spellId, slug] = match;
    const isPtr = prefix === 'ptr' || prefix === 'ptr-2';

    let baseUrl: string;
    if (prefix === 'ptr') {
      baseUrl = 'https://www.wowhead.com/ptr';
    } else if (prefix === 'ptr-2') {
      baseUrl = 'https://www.wowhead.com/ptr-2';
    } else {
      baseUrl = 'https://www.wowhead.com';
    }
    const finalUrl = `${baseUrl}/${type}=${spellId}${slug ? `/${slug}` : ''}`;

    const name = slug
      ? slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : `${type.charAt(0).toUpperCase() + type.slice(1)} ${spellId}`;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      name,
      url: finalUrl,
      spellId,
      type: type as 'spell' | 'item',
      isPtr,
      isPrepull: false,
    };

    setVerticalRows(rows =>
      rows.map(row =>
        row.id === rowId
          ? { ...row, abilities: [newAbility, ...row.abilities] }
          : row
      )
    );
    setShowVerticalAbilityDialog(null);
    setDialogUrl('');
    setError(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? over.id.toString() : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Поиск активной способности
    let activeAbility: Ability | undefined;
    let sourceRow: VerticalRow | undefined;

    // Проверяем, находится ли способность в основном списке
    activeAbility = abilities.find(item => item.id === activeId);
    if (!activeAbility) {
      // Если не в основном списке, ищем в вертикальных рядах
      for (const row of verticalRows) {
        const ability = row.abilities.find(item => item.id === activeId);
        if (ability) {
          activeAbility = ability;
          sourceRow = row;
          break;
        }
      }
    }

    if (!activeAbility) return;

    // Перетаскивание в зону препулла или пула
    if (overId === 'prepull-zone' || overId === 'pull-zone') {
      const targetIsPrepull = overId === 'prepull-zone';
      if (activeAbility.isPrepull === targetIsPrepull && !sourceRow) return;

      if (sourceRow) {
        // Удаляем способность из вертикального ряда
        setVerticalRows(rows =>
          rows
            .map(row =>
              row.id === sourceRow!.id
                ? {
                    ...row,
                    abilities: row.abilities.filter(
                      item => item.id !== activeId
                    ),
                  }
                : row
            )
            .filter(row => row.abilities.length > 0)
        );
      } else {
        // Удаляем из основного списка, если не из ряда
        setAbilities(abilities.filter(item => item.id !== activeId));
      }

      // Добавляем в основной список с новым isPrepull
      setAbilities(items => [
        ...items,
        { ...activeAbility!, isPrepull: targetIsPrepull },
      ]);
      return;
    }

    // Перетаскивание в вертикальный ряд
    const targetRow = verticalRows.find(row => row.id === overId);
    if (targetRow) {
      if (sourceRow && sourceRow.id === targetRow.id) return; // Уже в этом ряду

      if (sourceRow) {
        // Удаляем из исходного ряда
        setVerticalRows(rows =>
          rows
            .map(row =>
              row.id === sourceRow!.id
                ? {
                    ...row,
                    abilities: row.abilities.filter(
                      item => item.id !== activeId
                    ),
                  }
                : row
            )
            .filter(row => row.abilities.length > 0)
        );
      } else {
        // Удаляем из основного списка
        setAbilities(abilities.filter(item => item.id !== activeId));
      }

      // Добавляем в целевой ряд
      setVerticalRows(rows =>
        rows.map(row =>
          row.id === overId
            ? { ...row, abilities: [{ ...activeAbility! }, ...row.abilities] }
            : row
        )
      );
      return;
    }

    // Перетаскивание внутри горизонтальной зоны
    const overAbility = abilities.find(item => item.id === overId);
    if (overAbility) {
      if (sourceRow) {
        // Удаляем из вертикального ряда
        setVerticalRows(rows =>
          rows
            .map(row =>
              row.id === sourceRow!.id
                ? {
                    ...row,
                    abilities: row.abilities.filter(
                      item => item.id !== activeId
                    ),
                  }
                : row
            )
            .filter(row => row.abilities.length > 0)
        );

        // Добавляем в основной список
        const overIndex = abilities.findIndex(item => item.id === overId);
        setAbilities(items => [
          ...items.slice(0, overIndex),
          { ...activeAbility!, isPrepull: overAbility.isPrepull },
          ...items.slice(overIndex),
        ]);
      } else {
        const activeIndex = abilities.findIndex(item => item.id === activeId);
        const overIndex = abilities.findIndex(item => item.id === overId);

        if (activeIndex === overIndex) return;

        setAbilities(items => {
          const newItems = [...items];
          newItems[activeIndex] = {
            ...newItems[activeIndex],
            isPrepull: newItems[overIndex].isPrepull,
          };
          return arrayMove(newItems, activeIndex, overIndex);
        });
      }
      return;
    }

    // Перетаскивание внутри вертикального ряда
    const overRowAbility = verticalRows
      .flatMap(row => row.abilities)
      .find(item => item.id === overId);
    if (overRowAbility && sourceRow) {
      const targetRow = verticalRows.find(row =>
        row.abilities.some(item => item.id === overId)
      );
      if (targetRow && targetRow.id === sourceRow.id) {
        const activeIndex = sourceRow.abilities.findIndex(
          item => item.id === activeId
        );
        const overIndex = targetRow.abilities.findIndex(
          item => item.id === overId
        );

        if (activeIndex === overIndex) return;

        setVerticalRows(rows =>
          rows.map(row =>
            row.id === targetRow.id
              ? {
                  ...row,
                  abilities: arrayMove(row.abilities, activeIndex, overIndex),
                }
              : row
          )
        );
      }
    }
  };

  const removeAbility = (id: string) => {
    // Удаляем способность из основного списка
    setAbilities(abilities.filter(ability => ability.id !== id));

    // Обновляем вертикальные ряды, удаляя способность и пустые ряды
    setVerticalRows(rows => {
      const updatedRows = rows
        .map(row => ({
          ...row,
          abilities: row.abilities.filter(ability => ability.id !== id),
        }))
        .filter(row => row.abilities.length > 0);
      return updatedRows;
    });
  };

  const prepullAbilities = abilities.filter(ability => ability.isPrepull);
  const pullAbilities = abilities.filter(ability => !ability.isPrepull);
  const activeAbility =
    abilities.find(ability => ability.id === activeId) ||
    verticalRows
      .flatMap(row => row.abilities)
      .find(ability => ability.id === activeId);

  return (
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
            style={{ minHeight: `${BASE_HEIGHT + maxVerticalRowHeight}px` }}
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
                setShowVerticalAbilityDialog={setShowVerticalAbilityDialog}
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
                setShowVerticalAbilityDialog={setShowVerticalAbilityDialog}
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
              type={activeAbility.type}
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
    </div>
  );
}
