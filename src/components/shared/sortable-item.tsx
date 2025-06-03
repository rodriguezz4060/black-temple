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
    <div ref={setNodeRef} style={style} className='sortable-item relative flex'>
      <div className='flex-1 pr-13'>{children}</div>
      <div className='absolute top-2 right-2 flex flex-col items-center gap-5'>
        <div
          className='drag-handle cursor-grab rounded p-1 hover:text-green-500'
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
