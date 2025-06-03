import { NextResponse } from 'next/server';
import { prisma } from '@prisma/prisma-client';
import { TabData } from '@root/@types/prisma';
import {
  updateTab,
  deleteTab,
} from '@root/app/class-guides/_actions/section-action';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tabGroupId = parseInt(searchParams.get('tabGroupId') || '0', 10);

  if (!tabGroupId) {
    return NextResponse.json({ error: 'Invalid tabGroupId' }, { status: 400 });
  }

  try {
    const tabs = await prisma.tab.findMany({
      where: { tabGroupId },
    });
    const tabData: TabData[] = tabs.map(tab => ({
      id: tab.id,
      value: tab.value,
      label: tab.label,
      iconUrl: tab.iconUrl,
      content: tab.content,
      tabGroupId: tab.tabGroupId,
      createdAt: tab.createdAt,
      updatedAt: tab.updatedAt,
    }));
    return NextResponse.json(tabData);
  } catch (error) {
    console.error('Error fetching tabs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tabs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const tabs: TabData[] = await request.json();
    const updatedTabs: TabData[] = [];

    for (const tab of tabs) {
      if (tab.id) {
        const result = await updateTab(tab.id, {
          label: tab.label,
          iconUrl: tab.iconUrl,
          content: tab.content,
        });
        if (result.success && result.tab) {
          updatedTabs.push(result.tab);
        } else {
          throw new Error(result.error || 'Failed to update tab');
        }
      }
    }

    return NextResponse.json(updatedTabs);
  } catch (error) {
    console.error('Error saving tabs:', error);
    return NextResponse.json({ error: 'Failed to save tabs' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const tabId = parseInt(searchParams.get('tabId') || '0', 10);

  if (!tabId) {
    return NextResponse.json({ error: 'Invalid tabId' }, { status: 400 });
  }

  try {
    const result = await deleteTab(tabId);
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete tab');
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tab:', error);
    return NextResponse.json(
      { error: 'Failed to delete tab' },
      { status: 500 }
    );
  }
}
