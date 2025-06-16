'use client';

import { useState } from 'react';
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
import { Input } from '@root/components/ui/input';
import { Button } from '@root/components/ui/button';
import WowheadLink from './wowhead-link';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { DroppableZone } from './droppable-zone';

export function RotationEditor() {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [verticalRows, setVerticalRows] = useState<VerticalRow[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPrepullInput, setIsPrepullInput] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [showVerticalRowDialog, setShowVerticalRowDialog] = useState<
    string | null
  >(null);
  const [showVerticalAbilityDialog, setShowVerticalAbilityDialog] = useState<
    string | null
  >(null);
  const [dialogUrl, setDialogUrl] = useState('');

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

  const handleAddAbility = () => {
    if (!inputUrl.trim()) {
      setError('Введите ссылку');
      return;
    }

    const wowheadRegex =
      /https?:\/\/(?:www\.|ptr\.|ru\.)?(?:wowhead\.com(?:\/(ptr-2|ptr|[a-z]{2}))?)\/(spell|item)=(\d+)(?:\/([\w-]+))?/i;
    const match = inputUrl.match(wowheadRegex);

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
      isPrepull: isPrepullInput,
    };

    setAbilities([...abilities, newAbility]);
    setInputUrl('');
    setError(null);
    setIsPrepullInput(false);
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

    const activeAbility = abilities.find(item => item.id === activeId);
    if (!activeAbility) return;

    if (overId === 'prepull-zone' || overId === 'pull-zone') {
      const targetIsPrepull = overId === 'prepull-zone';
      if (activeAbility.isPrepull === targetIsPrepull) return;

      setAbilities(items =>
        items.map(item =>
          item.id === activeId ? { ...item, isPrepull: targetIsPrepull } : item
        )
      );
      return;
    }

    const targetRow = verticalRows.find(row => row.id === overId);
    if (targetRow) {
      setAbilities(abilities.filter(item => item.id !== activeId));
      setVerticalRows(rows =>
        rows.map(row =>
          row.id === overId
            ? { ...row, abilities: [{ ...activeAbility }, ...row.abilities] }
            : row
        )
      );
      return;
    }

    const overAbility = abilities.find(item => item.id === overId);
    if (overAbility) {
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
  };

  const removeAbility = (id: string) => {
    setAbilities(abilities.filter(ability => ability.id !== id));
    setVerticalRows(rows =>
      rows
        .map(row => ({
          ...row,
          abilities: row.abilities.filter(ability => ability.id !== id),
        }))
        .filter(row => row.abilities.length > 0 || row.positionAfter !== id)
    );
  };

  const prepullAbilities = abilities.filter(ability => ability.isPrepull);
  const pullAbilities = abilities.filter(ability => !ability.isPrepull);
  const activeAbility = abilities.find(ability => ability.id === activeId);

  return (
    <div className='mt-6 flex flex-col gap-6'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <Input
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          placeholder='Введите ссылку на способность или предмет с Wowhead'
          className='flex-1'
        />
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={isPrepullInput}
            onChange={e => setIsPrepullInput(e.target.checked)}
          />
          Препулл
        </label>
        <Button onClick={handleAddAbility}>Добавить</Button>
      </div>
      {error && <div className='text-red-500'>{error}</div>}

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='relative flex flex-col items-start gap-4 rounded-lg border p-4'>
          {abilities.length === 0 ? (
            <div className='flex h-40 w-full items-center justify-center text-gray-400'>
              Добавьте первую способность
            </div>
          ) : (
            <div className='flex w-full gap-4'>
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
              />
              <div className='relative flex flex-col items-center justify-center'>
                <div className='h-16 w-px bg-gray-500' />
                <span className='absolute top-[70px] text-sm text-gray-600'>
                  Пулл
                </span>
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
              />
            </div>
          )}
        </div>
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
