'use client';

import { useState, useTransition } from 'react';
import { GearItem } from '@root/@types/prisma';
import { updateGearSlot } from '@root/app/class-guides/_actions/save-bis-gear';
import {
  enchantTableSlots,
  MAX_SOCKETS,
  socketTableSlots,
} from '@root/utils/slot-backgrounds';
import toast from 'react-hot-toast';

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

interface UseGearSlotEditorReturn {
  itemState: ItemEditState;
  isAddingSocket: boolean;
  isPending: boolean;
  canHaveSockets: boolean;
  canHaveEnchants: boolean;
  handleItemFetched: (data: {
    name: string;
    icon: string;
    url: string;
  }) => void;
  handleSocketFetched: (data: {
    name: string;
    icon: string;
    url: string;
  }) => void;
  handleEnchantFetched: (data: {
    name: string;
    icon: string;
    url: string;
  }) => void;
  handleAddSocket: () => void;
  handleCancelSocket: () => void;
  handleRemoveSocket: (id: string) => void;
  handleRemoveEnchant: () => void;
  handleSave: () => void;
}

export const useGearSlotEditor = ({
  slot,
  item,
  guideId,
}: GearSlotEditorDialogProps): UseGearSlotEditorReturn => {
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

  const canHaveSockets = socketTableSlots.includes(slot);
  const canHaveEnchants = enchantTableSlots.includes(slot);

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
    if (!canHaveSockets) {
      toast.error(`Сокеты нельзя добавить для слота ${slot}`);
      return;
    }
    if (itemState.sockets.length >= MAX_SOCKETS) {
      toast.error(`Нельзя добавить больше ${MAX_SOCKETS} сокетов`);
      return;
    }
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
          toast.success('Данные успешно сохранены');
          console.log('Успешно сохранено:', result.data);
        } else {
          console.error('Ошибка при сохранении:', result.error);
        }
      } catch (error) {
        toast.error('Ошибка при сохранении данных');
        console.error('Ошибка при сохранении данных:', error);
      }
    });
  };

  return {
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
  };
};
