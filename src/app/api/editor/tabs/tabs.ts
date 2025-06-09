import { TabData } from '@root/@types/prisma';

export async function fetchTabs(tabGroupId: number): Promise<TabData[]> {
  try {
    const response = await fetch(`/api/editor/tabs?tabGroupId=${tabGroupId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tabs');
    }
    const tabs: TabData[] = await response.json();
    return tabs;
  } catch (error) {
    console.error('Error fetching tabs:', error);
    throw new Error('Не удалось загрузить вкладки');
  }
}

export async function saveTabsApi(tabs: TabData[]): Promise<TabData[]> {
  try {
    const response = await fetch('/api/editor/tabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tabs),
    });
    if (!response.ok) {
      throw new Error('Failed to save tabs');
    }
    const updatedTabs: TabData[] = await response.json();
    return updatedTabs;
  } catch (error) {
    console.error('Error saving tabs:', error);
    throw new Error('Не удалось сохранить вкладки');
  }
}

export async function deleteTabApi(tabId: number): Promise<void> {
  try {
    const response = await fetch(`/api/editor/tabs?tabId=${tabId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete tab');
    }
  } catch (error) {
    console.error('Error deleting tab:', error);
    throw new Error('Не удалось удалить вкладку');
  }
}
