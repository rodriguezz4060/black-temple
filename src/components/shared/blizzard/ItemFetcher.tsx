'use client';

import { fetchItemData } from '@root/app/_actions/fetchItemData';
import Image from 'next/image';
import { useState } from 'react';

interface ItemData {
  name: string;
  icon: string;
}

export default function ItemFetcher() {
  const [url, setUrl] = useState('');
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItemData(null);

    try {
      const result = await fetchItemData(url);
      if ('error' in result) {
        throw new Error(result.error);
      }
      setItemData({
        name: result.name,
        icon: result.icon,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-md p-4'>
      <h2 className='mb-4 text-2xl font-bold'>Получить данные предмета</h2>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type='text'
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder='Вставьте ссылку с Wowhead (например, https://www.wowhead.com/ru/item=228839/)'
          className='mb-2 w-full rounded border p-2'
        />
        <button
          type='submit'
          disabled={loading}
          className='rounded bg-blue-500 p-2 text-white disabled:bg-gray-400'
        >
          {loading ? 'Загрузка...' : 'Получить'}
        </button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      {itemData && (
        <div className='rounded border p-4'>
          <h3 className='text-xl font-semibold'>{itemData.name}</h3>
          {itemData.icon && (
            <Image
              src={itemData.icon}
              alt={itemData.name}
              className='mt-2 h-16 w-16'
              width={48}
              height={48}
            />
          )}
        </div>
      )}
    </div>
  );
}
