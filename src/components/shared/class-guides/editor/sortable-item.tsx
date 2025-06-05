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

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    background: 'transparent',
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className='relative flex'>
      <div className='w-full'>{children}</div>
      <div className='absolute top-5 -right-12 flex flex-col items-center gap-5'>
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
