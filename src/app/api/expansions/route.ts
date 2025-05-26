import { prisma } from '@prisma/prisma-client';
import { deletePatchAction } from '@root/app/profile/admin/_actions/delete-patch';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const expansions = await prisma.expansion.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(expansions);
  } catch {
    return NextResponse.json(
      { error: 'Ошибка при получении списка патчей' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const result = await deletePatchAction(params.id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
