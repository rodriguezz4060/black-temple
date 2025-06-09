'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TabData } from '@root/@types/prisma';
import { deleteTabApi, saveTabsApi } from '@root/app/api/editor/tabs/tabs';

export const useTabsMutations = (tabGroupId: number) => {
  const queryClient = useQueryClient();

  const saveTabsMutation = useMutation({
    mutationFn: (tabs: TabData[]) => saveTabsApi(tabs),
    onMutate: async tabs => {
      await queryClient.cancelQueries({ queryKey: ['tabs', tabGroupId] });
      const previousTabs = queryClient.getQueryData<TabData[]>([
        'tabs',
        tabGroupId,
      ]);
      queryClient.setQueryData(['tabs', tabGroupId], tabs);
      return { previousTabs };
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(['tabs', tabGroupId], context?.previousTabs);
      toast.error(`Ошибка при сохранении табов: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tabs', tabGroupId] });
    },
  });

  const deleteTabMutation = useMutation({
    mutationFn: ({ tabId }: { tabId: number }) => deleteTabApi(tabId),
    onMutate: async ({ tabId }) => {
      await queryClient.cancelQueries({ queryKey: ['tabs', tabGroupId] });
      const previousTabs = queryClient.getQueryData<TabData[]>([
        'tabs',
        tabGroupId,
      ]);
      queryClient.setQueryData<TabData[]>(['tabs', tabGroupId], old =>
        old?.filter(tab => tab.id !== tabId)
      );
      return { previousTabs };
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(['tabs', tabGroupId], context?.previousTabs);
      toast.error(`Ошибка при удалении таба: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tabs', tabGroupId] });
    },
  });

  return { saveTabsMutation, deleteTabMutation };
};
