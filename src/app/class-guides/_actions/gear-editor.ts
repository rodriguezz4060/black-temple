'use server';

import { prisma } from '@prisma/prisma-client';
import { ItemData } from '@root/@types/prisma';

export async function saveGearItem(
  guideId: number,
  slot: string,
  item: ItemData
) {
  try {
    // Проверяем, существует ли OverviewGear для данного гайда
    let overviewGear = await prisma.overviewGear.findUnique({
      where: { guideId },
      include: { headSockets: true },
    });

    // Данные для создания/обновления OverviewGear
    const gearData = {
      headName: item.name,
      headImg: item.icon,
      headLink: item.gearUrl,
      headEnchantImg: item.enchant?.icon,
      headEnchantUrl: item.enchant?.enchantUrl,
      guideId,
    };

    if (overviewGear) {
      // Обновляем существующий OverviewGear
      overviewGear = await prisma.overviewGear.update({
        where: { id: overviewGear.id },
        data: {
          ...gearData,
          headSockets: {
            deleteMany: {}, // Удаляем старые сокеты
            create: item.sockets.map(socket => ({
              img: socket.img,
              link: socket.link,
              slotType: slot,
            })),
          },
        },
        include: { headSockets: true },
      });
    } else {
      // Создаем новый OverviewGear
      overviewGear = await prisma.overviewGear.create({
        data: {
          ...gearData,
          guide: { connect: { id: guideId } },
          headSockets: {
            create: item.sockets.map(socket => ({
              img: socket.img,
              link: socket.link,
              slotType: slot,
            })),
          },
        },
        include: { headSockets: true },
      });
    }

    // Формируем ответ в формате ItemData
    const savedItem: ItemData = {
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

    return savedItem;
  } catch (error) {
    console.error('Ошибка при сохранении предмета:', error);
    throw new Error('Не удалось сохранить предмет');
  }
}
