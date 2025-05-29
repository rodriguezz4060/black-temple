import { NextResponse } from 'next/server';
import { prisma } from '@prisma/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('class') || undefined;
    const specName = searchParams.get('spec') || undefined;
    const modeName = searchParams.get('mode') || undefined;
    const roleName = searchParams.get('role') || undefined;

    const guides = await prisma.guide.findMany({
      where: {
        ...(className && { class: { name: className } }),
        ...(specName && { specialization: { name: specName } }),
        ...(modeName && { modeRelation: { name: modeName } }),
        ...(roleName && { specialization: { specRole: { name: roleName } } }),
      },
      include: {
        class: true,
        specialization: {
          include: {
            specRole: true,
          },
        },
        modeRelation: true,
        expansion: {
          select: {
            name: true,
            patchName: true,
            patchVersion: true,
          },
        },
      },
    });

    return NextResponse.json(guides, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}
