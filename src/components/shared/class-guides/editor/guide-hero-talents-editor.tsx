'use client';

import { useState } from 'react';
import { MDTabContentEditor } from './components/md-tab-content-editor';
import { TabsEditor } from './tabs-editor';
import { HeroTalentsProps } from '@root/@types/prisma';
import { Tab } from '@prisma/client';

interface GuideHeroTalentsProps {
  heroTalents: HeroTalentsProps;
  guideId: number;
}

export const GuideHeroTalentsEditor = ({
  guideId,
  heroTalents,
}: GuideHeroTalentsProps) => {
  const [markdownContent, setMarkdownContent] = useState('');
  return (
    <div>
      <MDTabContentEditor
        content={markdownContent}
        onContentChange={setMarkdownContent}
      />

      <TabsEditor
        initialTabs={heroTalents.tabs}
        defaultTab={''}
        guideId={guideId}
      />
    </div>
  );
};
