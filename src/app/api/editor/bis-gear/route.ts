import { prisma } from '@prisma/prisma-client';
import { ItemData } from '@root/@types/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { guideId: string } }
) {
  const guideId = parseInt(params.guideId);

  try {
    const overviewGear = await prisma.overviewGear.findUnique({
      where: { guideId },
      include: { headSockets: true },
    });

    if (!overviewGear) {
      return NextResponse.json({ item: null }, { status: 200 });
    }

    const item: ItemData = {
      name: overviewGear.headName,
      icon: overviewGear.headImg,
      gearUrl: overviewGear.headLink,
      enchant: overviewGear.headEnchantImg
        ? {
            id: overviewGear.id.toString(),
            icon: overviewGear.headEnchantImg,
            enchantUrl: overviewGear.headEnchantUrl!,
          }
        : null,
      sockets: overviewGear.headSockets.map(socket => ({
        id: socket.id.toString(),
        img: socket.img!,
        link: socket.link!,
      })),
    };

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении данных предмета:', error);
    return NextResponse.json(
      { error: 'Не удалось получить данные' },
      { status: 500 }
    );
  }
}
