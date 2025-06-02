'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@root/components/ui/dialog';
import { Button } from '@root/components/ui/button';
import ItemFetcher from '@root/components/shared/blizzard/item-fetcher';
import {
  MAX_SOCKETS,
  slotBackgrounds,
  slotNames,
} from '@root/utils/slot-backgrounds';
import { GearItem } from '@root/@types/prisma';
import { useGearSlotEditor } from '@root/components/hooks/guide/edit/use-gear-slot-editor';

interface GearSlotEditorDialogProps {
  slot: string;
  item: GearItem | undefined;
  guideId: number;
}

export const GearSlotEditorDialog = ({
  slot,
  item,
  guideId,
}: GearSlotEditorDialogProps) => {
  const {
    itemState,
    isAddingSocket,
    isPending,
    canHaveSockets,
    canHaveEnchants,
    handleItemFetched,
    handleSocketFetched,
    handleEnchantFetched,
    handleAddSocket,
    handleCancelSocket,
    handleRemoveSocket,
    handleRemoveEnchant,
    handleSave,
  } = useGearSlotEditor({ slot, item, guideId });

  const bgPosition = slotBackgrounds[slot.toUpperCase()] || '0em';

  return (
    <DialogContent className='sm:max-w-[425px]' aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Редактировать {slotNames[slot]}</DialogTitle>
      </DialogHeader>
      <div className='flex gap-2 rounded border p-4'>
        {itemState.img ? (
          <Image
            src={itemState.img}
            alt={itemState.name || slotNames[slot]}
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
        <div className='flex flex-col justify-between'>
          <span className='text-[14px] font-semibold'>
            {itemState.name || slotNames[slot]}
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
      {canHaveSockets && (
        <>
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
            <Button
              onClick={handleAddSocket}
              disabled={itemState.sockets.length >= MAX_SOCKETS}
            >
              Добавить сокет
            </Button>
          )}
        </>
      )}
      {canHaveEnchants && (
        <>
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
        </>
      )}
      <DialogFooter>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
