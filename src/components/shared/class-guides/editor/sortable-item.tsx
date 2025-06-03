'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  children,
  actions,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    background: 'transparent',
  };

  return (
    <div ref={setNodeRef} style={style} className='flex gap-0.5'>
      <div className='flex-1'>{children}</div>
      <div className='mt-5 flex w-10 flex-col items-center gap-5'>
        <div
          className='drag-handle cursor-grab rounded hover:text-green-400'
          {...listeners}
          {...attributes}
        >
          <GripVertical className='h-5 w-5' />
        </div>
        {actions}
      </div>
    </div>
  );
};
