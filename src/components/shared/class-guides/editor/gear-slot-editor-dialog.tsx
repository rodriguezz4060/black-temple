'use client';

import { useState, useTransition } from 'react';
import { GearItem } from '@root/@types/prisma';
import Image from 'next/image';
import { X } from 'lucide-react';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@root/components/ui/dialog';
import { Button } from '@root/components/ui/button';
import ItemFetcher from '../../blizzard/item-fetcher';
import { updateGearSlot } from '@root/app/class-guides/_actions/save-bis-gear';
import { slotBackgrounds } from '@root/utils/slot-backgrounds';

interface GearSlotEditorDialogProps {
  slot: string;
  item: GearItem | undefined;
  guideId: number;
}

interface ItemEditState {
  name: string;
  img: string;
  url: string;
  sockets: { id: string; img: string; name: string; url: string }[];
  enchantImg: string | null;
  enchantName: string | null;
  enchantUrl: string | null;
}

export const GearSlotEditorDialog = ({
  slot,
  item,
  guideId,
}: GearSlotEditorDialogProps) => {
  const [itemState, setItemState] = useState<ItemEditState>({
    name: item?.itemName || '',
    img: item?.itemImg || '',
    url: item?.itemLink || '',
    sockets:
      item?.itemSockets?.map(socket => ({
        id: String(socket.id),
        img: socket.socketImg || '',
        name: socket.socketName || '',
        url: socket.socketUrl || '',
      })) || [],
    enchantImg: item?.itemEnchantImg || null,
    enchantName: item?.itemEnchantName || null,
    enchantUrl: item?.itemEnchantUrl || null,
  });
  const [isAddingSocket, setIsAddingSocket] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleItemFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      name: data.name,
      img: data.icon,
      url: data.url,
    }));
  };

  const handleSocketFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      sockets: [
        ...prev.sockets,
        {
          id: `socket-${Date.now()}`,
          img: data.icon,
          name: data.name,
          url: data.url,
        },
      ],
    }));
    setIsAddingSocket(false);
  };

  const handleEnchantFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      enchantImg: data.icon,
      enchantName: data.name,
      enchantUrl: data.url,
    }));
  };

  const handleAddSocket = () => {
    setIsAddingSocket(true);
  };

  const handleCancelSocket = () => {
    setIsAddingSocket(false);
  };

  const handleRemoveSocket = (id: string) => {
    setItemState(prev => ({
      ...prev,
      sockets: prev.sockets.filter(socket => socket.id !== id),
    }));
  };

  const handleRemoveEnchant = () => {
    setItemState(prev => ({
      ...prev,
      enchantImg: null,
      enchantName: null,
      enchantUrl: null,
    }));
  };

  const handleSave = async () => {
    startTransition(async () => {
      try {
        const dataForDB = {
          guideId,
          slot,
          item: {
            itemName: itemState.name,
            itemImg: itemState.img,
            itemLink: itemState.url,
            itemSockets: itemState.sockets.map(socket => ({
              socketName: socket.name,
              socketImg: socket.img,
              socketUrl: socket.url,
            })),
            itemEnchantImg: itemState.enchantImg,
            itemEnchantName: itemState.enchantName,
            itemEnchantUrl: itemState.enchantUrl,
          },
        };

        const result = await updateGearSlot(dataForDB);
        if (result.success) {
          console.log('Успешно сохранено:', result.data);
        } else {
          console.error('Ошибка при сохранении:', result.error);
        }
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
      }
    });
  };

  // Определяем фоновую позицию для слота
  const bgPosition = slotBackgrounds[slot.toUpperCase()] || '0em';

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Редактировать {slot}</DialogTitle>
      </DialogHeader>
      <div className='flex gap-2 rounded border p-4'>
        {itemState.img ? (
          <Image
            src={itemState.img}
            alt={itemState.name || slot}
            className='h-16 w-16 border-2 border-black'
            width={48}
            height={48}
          />
        ) : (
          <div
            className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] text-[48px]"
            style={{ backgroundPosition: bgPosition }}
          />
        )}
        <div className='flex h-16 flex-col justify-between'>
          <span className='text-[14px] font-semibold'>
            {itemState.name || slot}
          </span>
          <div className='flex flex-row items-center gap-0.5'>
            {itemState.sockets.map(socket => (
              <div
                key={socket.id}
                className='h-5 w-5 cursor-pointer border border-black bg-cover bg-center'
                style={{ backgroundImage: `url(${socket.img})` }}
              />
            ))}
            {itemState.enchantImg && (
              <div
                className='h-5 w-5 cursor-pointer border border-black bg-cover bg-center'
                style={{ backgroundImage: `url(${itemState.enchantImg})` }}
              />
            )}
          </div>
        </div>
      </div>
      <ItemFetcher onItemFetched={handleItemFetched} />
      <span className='ml-2 text-[18px] font-semibold'>Сокеты</span>
      <div className='flex flex-wrap gap-3'>
        {itemState.sockets.map(socket => (
          <div key={socket.id} className='relative border p-2'>
            <Image
              src={socket.img || '/placeholder.png'}
              alt='Сокет'
              width={34}
              height={34}
              className='border-2 border-black'
            />
            <Button
              onClick={() => handleRemoveSocket(socket.id)}
              tooltip='Удалить сокет'
              className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full p-0.5 hover:bg-red-600'
              aria-label='Удалить сокет'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
      {isAddingSocket ? (
        <div className='mt-2'>
          <ItemFetcher onItemFetched={handleSocketFetched} />
          <div className='mt-2 flex gap-2'>
            <Button variant='outline' onClick={handleCancelSocket}>
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleAddSocket}>Добавить сокет</Button>
      )}
      <div>
        <span className='ml-2 text-[18px] font-semibold'>Зачарование</span>
        <div className='mt-2 mb-2 flex'>
          {itemState.enchantImg && (
            <div className='relative border p-2'>
              <Image
                src={itemState.enchantImg}
                alt='Зачарование'
                width={34}
                height={34}
                className='border-2 border-black'
              />
              <Button
                onClick={handleRemoveEnchant}
                tooltip='Удалить зачарование'
                className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full p-0.5 hover:bg-red-600'
                aria-label='Удалить зачарование'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
        <ItemFetcher onItemFetched={handleEnchantFetched} />
      </div>
      <DialogFooter>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
