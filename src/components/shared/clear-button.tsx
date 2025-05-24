import { cn } from '@root/lib/utils';
import { X } from 'lucide-react';
import React from 'react';

interface Props {
  onClick?: VoidFunction;
  className?: string;
}

export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100',
        className
      )}
    >
      <X className='h-5 w-5' />
    </button>
  );
};
