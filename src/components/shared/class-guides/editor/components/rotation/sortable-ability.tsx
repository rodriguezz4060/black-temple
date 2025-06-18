'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ability } from '@prisma/client';
import { Button } from '@root/components/ui/button';

interface SortableAbilityProps {
  ability: Ability;
  onRemove: (id: string) => void;
  renderAbility: (ability: Ability) => React.ReactNode;
}

export function SortableAbility({
  ability,
  onRemove,
  renderAbility,
}: SortableAbilityProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ability.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e: React.PointerEvent) => {
    e.stopPropagation();
    onRemove(ability.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='group relative cursor-grab rounded-lg border-2 border-transparent p-1 transition-all hover:border-[#171717] active:cursor-grabbing'
    >
      {renderAbility(ability)}

      <Button
        variant='destructive'
        size='sm'
        onPointerDown={handleRemove}
        className='absolute -top-2 -right-2 hidden h-5 w-5 items-center justify-center p-0 text-white group-hover:flex'
      >
        ×
      </Button>
    </div>
  );
}
