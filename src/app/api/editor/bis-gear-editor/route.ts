import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const { guideId, slot, item } = data;

    if (!guideId || !slot || !item) {
      return NextResponse.json(
        { message: 'guideId, slot и item обязательны' },
        { status: 400 }
      );
    }

    // Проверяем, существует ли запись OverviewGear для данного guideId и slot
    const existingGear = await prisma.overviewGear.findFirst({
      where: { guideId, itemSlot: slot },
      include: { itemSockets: true },
    });

    // Формируем данные для обновления или создания
    const gearData = {
      itemSlot: slot,
      itemName: item.itemName,
      itemImg: item.itemImg,
      itemLink: item.itemLink,
      itemEnchantName: item.itemEnchantName,
      itemEnchantImg: item.itemEnchantImg,
      itemEnchantUrl: item.itemEnchantUrl,
      guideId,
      itemSockets: {
        deleteMany: {}, // Удаляем существующие сокеты
        create: item.itemSockets.map(
          (socket: {
            socketName: string;
            socketImg: string;
            socketUrl: string;
          }) => ({
            socketName: socket.socketName,
            socketImg: socket.socketImg,
            socketUrl: socket.socketUrl,
            slotType: slot.toUpperCase(), // Устанавливаем slotType на основе слота
          })
        ),
      },
    };

    const updatedGear = existingGear
      ? await prisma.overviewGear.update({
          where: { id: existingGear.id },
          data: gearData,
          include: { itemSockets: true },
        })
      : await prisma.overviewGear.create({
          data: gearData,
          include: { itemSockets: true },
        });

    return NextResponse.json(updatedGear, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
