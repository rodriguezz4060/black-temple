import { useEffect, useRef } from 'react';

export const useTabsScroll = (activeTab: string) => {
  const tabsRef = useRef<Map<string, HTMLButtonElement> | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getMap = () => {
    if (!tabsRef.current) {
      tabsRef.current = new Map();
    }
    return tabsRef.current;
  };

  useEffect(() => {
    const map = getMap();
    const activeTabNode = map.get(activeTab);
    const scrollAreaNode = scrollAreaRef.current;

    if (activeTabNode && scrollAreaNode) {
      activeTabNode.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  return { tabsRef, scrollAreaRef, getMap };
};
