'use server';

import { TUpdateTabsSchemas } from '@root/components/shared/class-guides/editor/schemas/update-tabs-schemas';

export const updateTabs = async (data: TUpdateTabsSchemas) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/';
    const url = `${baseUrl}/api/guides/tabs`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tabs: data.tabs,
        guideId: data.guideId,
      }),
    });

    const textResponse = await response.text();

    if (!response.ok) {
      try {
        const errorData = textResponse ? JSON.parse(textResponse) : {};
        throw new Error(errorData.error || 'Failed to update tabs');
      } catch {
        throw new Error(textResponse || 'Failed to update tabs');
      }
    }

    return textResponse ? JSON.parse(textResponse) : {};
  } catch (error) {
    console.error('Error updating tabs:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};
