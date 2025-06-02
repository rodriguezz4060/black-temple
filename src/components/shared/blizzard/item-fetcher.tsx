'use client';

import { fetchItemData } from '@root/app/class-guides/_actions/fetch-item-data';
import { Button } from '@root/components/ui/button';
import { Input } from '@root/components/ui/input';
import { useState } from 'react';

interface ItemData {
  name: string;
  icon: string;
  url: string;
}

interface ItemFetcherProps {
  onItemFetched: (data: ItemData) => void;
}

export default function ItemFetcher({ onItemFetched }: ItemFetcherProps) {
  const [url, setUrl] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await fetchItemData(url);
      if ('error' in result) {
        throw new Error(result.error);
      }
      const newItemData = {
        name: result.name,
        icon: result.icon,
        url,
      };

      onItemFetched(newItemData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className='ml-2 text-[18px] font-semibold'>
        Вставьте ссылку предмета с Wowhead
      </span>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-2'>
          <Input
            type='text'
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder='Например, https://www.wowhead.com/ru/item=228839/'
            className='mb-2 w-full rounded border p-2'
          />
          <Button type='submit' disabled={loading}>
            {loading ? 'Загрузка...' : 'Отправить'}
          </Button>
        </div>
      </form>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
