'use client';

import React from 'react';
import { TabsTrigger } from '@root/components/ui/tabs-list';
import { Pencil } from 'lucide-react';
import { cn } from '@root/lib/utils';
import { TabData } from '@root/@types/prisma';

interface TabTriggerProps {
  tab: TabData;
  isNew: boolean;
  onEdit: (tab: TabData) => void;
  getMap: () => Map<string, HTMLButtonElement>;
}

export const TabTrigger: React.FC<TabTriggerProps> = React.memo(
  ({ tab, isNew, onEdit, getMap }) => (
    <TabsTrigger
      value={tab.value}
      className={cn(
        'group relative pr-8',
        isNew && 'bg-yellow-100 dark:bg-yellow-900'
      )}
      ref={node => {
        const map = getMap();
        if (node) map.set(tab.value, node);
        else map.delete(tab.value);
      }}
    >
      <span className='flex items-center text-[16px]'>
        {tab.iconUrl && (
          <div
            className='m-[0_.2em_-.2em] box-content inline-block h-4 w-4 rounded-[0.2em] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 bg-[size:1.2em_auto] bg-[position:50%]'
            style={{ backgroundImage: `url('${tab.iconUrl}')` }}
          />
        )}
        <span>{tab.label}</span>
        {isNew && <span className='ml-1 text-xs text-yellow-600'>(новый)</span>}
      </span>
      <div
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onEdit(tab);
          }
        }}
        onClick={e => {
          e.stopPropagation();
          onEdit(tab);
        }}
        className='hover:bg-accent hover:text-accent-foreground absolute -top-[12%] right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md opacity-0 group-hover:opacity-100'
      >
        <Pencil className='h-3 w-3' />
      </div>
    </TabsTrigger>
  )
);

TabTrigger.displayName = 'TabTrigger';
