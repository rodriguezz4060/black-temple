'use client';

import { useQuery } from '@tanstack/react-query';
import { TabData } from '@root/@types/prisma';
import { fetchTabs } from '@root/app/api/editor/tabs/tabs';

export const useTabsQuery = (sectionId: number, initialTabs: TabData[]) => {
  return useQuery<TabData[], Error>({
    queryKey: ['tabs', sectionId],
    queryFn: () => fetchTabs(sectionId),
    initialData: initialTabs,
    staleTime: 5 * 60 * 1000, // Данные свежие 5 минут
    retry: 2, // Повторить запрос 2 раза при ошибке
  });
};
