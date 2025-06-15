'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCorners, // Изменено с closestCenter на closestCorners
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  useDroppable,
  rectIntersection,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Input } from '@root/components/ui/input';
import { SortableAbility } from './sortable-ability';
import { Button } from '@root/components/ui/button';
import WowheadLink from './wowhead-link';

export interface Ability {
  id: string;
  name: string;
  url: string;
  spellId: string;
  type: 'spell' | 'item';
  isPtr: boolean;
  isPrepull: boolean;
}

export function RotationEditor() {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPrepullInput, setIsPrepullInput] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

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

    // Перетаскивание в зону (prepull-zone или pull-zone)
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

    // Перетаскивание внутри зоны или между зонами (над другим элементом)
    const overAbility = abilities.find(item => item.id === overId);
    if (!overAbility) return;

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
  };

  const removeAbility = (id: string) => {
    setAbilities(abilities.filter(ability => ability.id !== id));
  };

  const prepullAbilities = abilities.filter(ability => ability.isPrepull);
  const pullAbilities = abilities.filter(ability => !ability.isPrepull);

  const activeAbility = abilities.find(ability => ability.id === activeId);

  return (
    <div className='mt-6 flex flex-col gap-6'>
      {/* Секция ввода */}
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

      {/* Секция таймлайна */}
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection} // Изменено на closestCorners
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='flex gap-4 rounded-lg border p-4'>
          {abilities.length === 0 ? (
            <div className='flex h-40 w-full items-center justify-center text-gray-400'>
              Добавьте первую способность
            </div>
          ) : (
            <>
              {/* Зона препулла */}
              <DroppableZone
                id='prepull-zone'
                title='Препулл'
                abilities={prepullAbilities}
                onRemove={removeAbility}
                isPrepullZone={true}
                overId={overId}
                activeId={activeId}
              />

              {/* Разделитель пула */}
              <div className='relative flex flex-col items-center justify-center'>
                <div className='h-16 w-px bg-gray-500' />
                <span className='absolute top-[70px] text-sm text-gray-600'>
                  Пулл
                </span>
              </div>

              {/* Зона пула */}
              <DroppableZone
                id='pull-zone'
                title='Пулл'
                abilities={pullAbilities}
                onRemove={removeAbility}
                isPrepullZone={false}
                overId={overId}
                activeId={activeId}
              />
            </>
          )}
        </div>

        {/* Оверлей для перетаскиваемого объекта */}
        <DragOverlay>
          {activeAbility ? (
            <WowheadLink
              id={Number(activeAbility.spellId)}
              type={activeAbility.type}
              isPtr={activeAbility.isPtr}
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

// Компонент DroppableZone
interface DroppableZoneProps {
  id: string;
  title: string;
  abilities: Ability[];
  onRemove: (id: string) => void;
  isPrepullZone: boolean;
  overId: string | null;
  activeId: string | null;
}

function DroppableZone({
  id,
  title,
  abilities,
  onRemove,
  isPrepullZone,
  overId,
  activeId,
}: DroppableZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex min-h-[120px] flex-col gap-2 rounded-lg p-4 transition-all duration-300 ${
        isOver ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-50 dark:bg-gray-800'
      } ${isPrepullZone ? 'flex-initial' : 'flex-1'}`}
      style={{
        minWidth: isPrepullZone
          ? abilities.length === 0
            ? '80px'
            : 'auto'
          : 'auto', // Увеличено с 60px до 80px
      }}
    >
      <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
        {title}
      </h4>
      {abilities.length === 0 && (
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400 transition-opacity duration-200 ${
            isOver ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Перетащите сюда способности
        </div>
      )}
      <SortableContext
        id={id}
        items={abilities.map(a => a.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className='flex min-h-[60px] items-center gap-2'>
          {abilities.map((ability, index) => (
            <div key={ability.id} className='flex items-center'>
              {overId === ability.id && activeId !== ability.id && (
                <div className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-400' />
              )}
              <SortableAbility
                ability={ability}
                onRemove={onRemove}
                renderAbility={ability => (
                  <WowheadLink
                    id={Number(ability.spellId)}
                    type={ability.type}
                    isPtr={ability.isPtr}
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
              {index === abilities.length - 1 && isOver && overId === id && (
                <div
                  key='end-placeholder'
                  className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-400'
                />
              )}
            </div>
          ))}
          {abilities.length === 0 && isOver && overId === id && (
            <div
              key='empty-placeholder'
              className='h-12 w-1 rounded bg-blue-500 dark:bg-blue-400'
            />
          )}
        </div>
      </SortableContext>
    </div>
  );
}
