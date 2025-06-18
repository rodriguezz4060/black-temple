import { useState } from 'react';
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Ability, VerticalRow } from '@root/@types/prisma';

export function useDragAndDrop(
  abilities: Ability[],
  setAbilities: React.Dispatch<React.SetStateAction<Ability[]>>,
  verticalRows: VerticalRow[],
  setVerticalRows: React.Dispatch<React.SetStateAction<VerticalRow[]>>
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over ? event.over.id.toString() : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    let activeAbility: Ability | undefined;
    let sourceRow: VerticalRow | undefined;

    activeAbility = abilities.find(item => item.id === activeId);
    if (!activeAbility) {
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
        setAbilities(abilities.filter(item => item.id !== activeId));
      }

      setAbilities(items => [
        ...items,
        { ...activeAbility!, isPrepull: targetIsPrepull },
      ]);
      return;
    }

    // Перетаскивание в вертикальный ряд
    const targetRow = verticalRows.find(row => row.id === overId);
    if (targetRow) {
      if (sourceRow && sourceRow.id === targetRow.id) return;

      if (sourceRow) {
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
        setAbilities(abilities.filter(item => item.id !== activeId));
      }

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

  return {
    sensors,
    activeId,
    overId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
