'use client';

import React from 'react';
import { TabsContent } from '@root/components/ui/tabs-list';
import { Card, CardContent } from '@root/components/ui/card';
import { MDTabContentEditor } from '@root/components/shared/class-guides/editor/components/text-field/md-tab-content-editor';
import { TabData } from '@root/@types/prisma';

interface TabContentProps {
  tab: TabData;
  onContentChange: (value: string) => void;
}

export const TabContent: React.FC<TabContentProps> = React.memo(
  ({ tab, onContentChange }) => (
    <TabsContent value={tab.value} className='mt-0'>
      <Card className='w-full max-w-full rounded-none border-none dark:bg-[#171717]'>
        <CardContent className='space-y-2 p-0'>
          <MDTabContentEditor
            className='w-full px-2'
            content={tab.content}
            onContentChange={onContentChange}
          />
        </CardContent>
      </Card>
    </TabsContent>
  )
);

TabContent.displayName = 'TabContent';
