'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TabData } from '@root/@types/prisma';
import { deleteTabApi, saveTabsApi } from '@root/app/api/editor/tabs/tabs';

export const useTabsMutations = (sectionId: number) => {
  const queryClient = useQueryClient();

  const saveTabsMutation = useMutation({
    mutationFn: (tabs: TabData[]) => saveTabsApi(tabs, sectionId),
    onMutate: async tabs => {
      await queryClient.cancelQueries({ queryKey: ['tabs', sectionId] });
      const previousTabs = queryClient.getQueryData<TabData[]>([
        'tabs',
        sectionId,
      ]);
      queryClient.setQueryData(['tabs', sectionId], tabs);
      return { previousTabs };
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(['tabs', sectionId], context?.previousTabs);
      toast.error(`Ошибка при сохранении табов: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tabs', sectionId] });
    },
  });

  const deleteTabMutation = useMutation({
    mutationFn: ({ tabId }: { tabId: number }) =>
      deleteTabApi(tabId, sectionId),
    onMutate: async ({ tabId }) => {
      await queryClient.cancelQueries({ queryKey: ['tabs', sectionId] });
      const previousTabs = queryClient.getQueryData<TabData[]>([
        'tabs',
        sectionId,
      ]);
      queryClient.setQueryData<TabData[]>(['tabs', sectionId], old =>
        old?.filter(tab => tab.id !== tabId)
      );
      return { previousTabs };
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(['tabs', sectionId], context?.previousTabs);
      toast.error(`Ошибка при удалении таба: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tabs', sectionId] });
    },
  });

  return { saveTabsMutation, deleteTabMutation };
};
