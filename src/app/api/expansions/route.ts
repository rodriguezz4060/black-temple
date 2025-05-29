import { prisma } from '@prisma/prisma-client';
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

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.expansion.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Патч успешно удален' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при удалении патча:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении патча' },
      { status: 500 }
    );
  }
}
