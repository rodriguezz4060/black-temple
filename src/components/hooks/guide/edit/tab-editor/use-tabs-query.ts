'use client';

import { useQuery } from '@tanstack/react-query';
import { TabData } from '@root/@types/prisma';
import { fetchTabs } from '@root/app/api/editor/tabs/tabs';

export const useTabsQuery = (tabGroupId: number, initialTabs: TabData[]) => {
  return useQuery<TabData[], Error>({
    queryKey: ['tabs', tabGroupId],
    queryFn: () => fetchTabs(tabGroupId),
    initialData: initialTabs,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};
