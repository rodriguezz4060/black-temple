'use client';

import { Enchant, ItemData, Socket } from '@root/@types/prisma';
import { fetchItemData } from '@root/app/_actions/fetchItemData';
import { saveGearItem } from '@root/app/class-guides/_actions/gear-editor';
import { Button } from '@root/components/ui/button';
import { Input } from '@root/components/ui/input';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ItemFetcherProps {
  onItemFetched: (item: ItemData) => void;
  guideId: number;
  slot: string;
  initialItem?: ItemData;
}

export default function ItemFetcher({
  onItemFetched,
  guideId,
  slot,
  initialItem,
}: ItemFetcherProps) {
  const [url, setUrl] = useState('');
  const [socketUrl, setSocketUrl] = useState('');
  const [enchantUrl, setEnchantUrl] = useState('');
  const [itemData, setItemData] = useState<ItemData>(
    initialItem || { sockets: [], enchant: null }
  );
  const [sockets, setSockets] = useState<Socket[]>(initialItem?.sockets || []);
  const [enchant, setEnchant] = useState<Enchant | null>(
    initialItem?.enchant || null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Синхронизируем itemData при изменении sockets или enchant
  useEffect(() => {
    const updatedItem: ItemData = {
      ...itemData,
      sockets,
      enchant,
    };
    setItemData(updatedItem);
    onItemFetched(updatedItem);
  }, [sockets, enchant]);

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let item: ItemData = { ...itemData, sockets, enchant };
      if (url) {
        const result = await fetchItemData(url);
        if ('error' in result) {
          throw new Error(result.error);
        }
        item = {
          ...item,
          name: result.name,
          icon: result.icon,
          gearUrl: url,
        };
      }

      // Сохраняем на сервере
      const savedItem = await saveGearItem(guideId, slot, item);
      setItemData(savedItem);
      onItemFetched(savedItem);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
      setUrl('');
    }
  };

  const handleSocketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await fetchItemData(socketUrl);
      if ('error' in result) {
        throw new Error(result.error);
      }
      const newSocket: Socket = {
        id: uuidv4(),
        img: result.icon,
        link: socketUrl,
      };
      const updatedSockets = [...sockets, newSocket];
      setSockets(updatedSockets);

      // Сохраняем обновленный элемент
      const updatedItem: ItemData = {
        ...itemData,
        sockets: updatedSockets,
      };
      const savedItem = await saveGearItem(guideId, slot, updatedItem);
      setItemData(savedItem);
      onItemFetched(savedItem);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
      setSocketUrl('');
    }
  };

  const handleEnchantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await fetchItemData(enchantUrl);
      if ('error' in result) {
        throw new Error(result.error);
      }
      const newEnchant: Enchant = {
        id: uuidv4(),
        icon: result.icon,
        enchantUrl: enchantUrl,
      };
      setEnchant(newEnchant);

      // Сохраняем обновленный элемент
      const updatedItem: ItemData = {
        ...itemData,
        enchant: newEnchant,
      };
      const savedItem = await saveGearItem(guideId, slot, updatedItem);
      setItemData(savedItem);
      onItemFetched(savedItem);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
      setEnchantUrl('');
    }
  };

  const handleSocketDelete = async (socketId: string) => {
    const updatedSockets = sockets.filter(socket => socket.id !== socketId);
    setSockets(updatedSockets);

    const updatedItem: ItemData = {
      ...itemData,
      sockets: updatedSockets,
    };
    const savedItem = await saveGearItem(guideId, slot, updatedItem);
    setItemData(savedItem);
    onItemFetched(savedItem);
  };

  const handleEnchantDelete = async () => {
    setEnchant(null);

    const updatedItem: ItemData = {
      ...itemData,
      enchant: null,
    };
    const savedItem = await saveGearItem(guideId, slot, updatedItem);
    setItemData(savedItem);
    onItemFetched(savedItem);
  };

  return (
    <div className=''>
      {/* Форма для предмета */}
      <span className='mb-3 text-[16px] font-bold'>
        Вставьте ссылку с Wowhead (предмет)
      </span>
      <form id='item-fetcher-form' onSubmit={handleItemSubmit} className='mb-4'>
        <div className='inline-flex w-full gap-2'>
          <Input
            type='text'
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder='Например https://www.wowhead.com/ru/item=228839/'
            className='mb-2 w-full rounded border p-2'
          />
          <Button
            type='submit'
            disabled={loading}
            className='rounded bg-blue-500 p-2 text-white disabled:bg-gray-400'
          >
            {loading ? 'Загрузка...' : 'Отправить'}
          </Button>
        </div>
      </form>

      {/* Форма для сокета */}
      <span className='mb-3 text-[16px] font-bold'>Добавить сокет</span>
      <form onSubmit={handleSocketSubmit} className='mb-4'>
        <div className='inline-flex w-full gap-2'>
          <Input
            type='text'
            value={socketUrl}
            onChange={e => setSocketUrl(e.target.value)}
            placeholder='Ссылка на Wowhead для гема'
            className='mb-2 w-full rounded border p-2'
          />
          <Button
            type='submit'
            disabled={loading}
            className='rounded bg-blue-500 p-2 text-white disabled:bg-gray-400'
          >
            {loading ? 'Загрузка...' : 'Добавить'}
          </Button>
        </div>
      </form>
      {sockets.length > 0 && (
        <div className='mb-4'>
          <span className='text-[14px] font-semibold'>Добавленные сокеты:</span>
          {sockets.map(socket => (
            <div key={socket.id} className='mt-2 flex items-center gap-2'>
              <Image
                src={socket.img}
                alt='Socket icon'
                width={24}
                height={24}
              />
              <span>{socket.link}</span>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => handleSocketDelete(socket.id)}
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Форма для зачарования */}
      <span className='mb-3 text-[16px] font-bold'>Добавить зачарование</span>
      <form onSubmit={handleEnchantSubmit} className='mb-4'>
        <div className='inline-flex w-full gap-2'>
          <Input
            type='text'
            value={enchantUrl}
            onChange={e => setEnchantUrl(e.target.value)}
            placeholder='Ссылка на Wowhead для зачарования'
            className='mb-2 w-full rounded border p-2'
          />
          <Button
            type='submit'
            disabled={loading}
            className='rounded bg-blue-500 p-2 text-white disabled:bg-gray-400'
          >
            {loading ? 'Загрузка...' : 'Добавить'}
          </Button>
        </div>
      </form>
      {enchant && (
        <div className='mb-4 flex items-center gap-2'>
          <Image src={enchant.icon} alt='Enchant icon' width={24} height={24} />
          <span>{enchant.enchantUrl}</span>
          <Button variant='destructive' size='sm' onClick={handleEnchantDelete}>
            Удалить
          </Button>
        </div>
      )}

      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}
