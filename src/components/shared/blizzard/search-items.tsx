'use client';

import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

interface Item {
  id: number;
  name: {
    en_US: string;
  };
  item_class: {
    id: number;
    name: string;
  };
}

export default function SearchItems() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(
    debounce(async (search: string) => {
      if (!search.trim()) {
        setItems([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/blizzard?query=${encodeURIComponent(search)}`
        );
        const data = await response.json();

        if (data.results) {
          // Получаем все предметы брони (фильтр по item_class уже на сервере)
          const matchingItems = data.results
            .map((result: any) => result.data)
            .filter((item: Item) => {
              const searchLower = search
                .toLowerCase()
                .replace(/\s+/g, ' ')
                .trim();
              const itemNameLower = item.name.en_US
                .toLowerCase()
                .replace(/\s+/g, ' ')
                .trim();
              return itemNameLower.includes(searchLower);
            })
            .slice(0, 10); // Ограничиваем до 10 результатов

          if (matchingItems.length === 0) {
            setError(
              'Броня не найдена. Проверьте написание или попробуйте другое название.'
            );
          } else {
            setItems(matchingItems);
          }
        } else {
          setItems([]);
          setError(
            'Результаты не найдены. Возможно, предмет отсутствует в базе.'
          );
        }
      } catch (err) {
        setError('Ошибка при загрузке предметов. Попробуйте позже.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchItems(value);
  };

  return (
    <div className='relative mx-auto w-full max-w-md'>
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Введите название брони...'
        className='w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      {loading && <p className='mt-2 text-gray-500'>Загрузка...</p>}
      {error && <p className='mt-2 text-red-500'>{error}</p>}
      {items.length > 0 && (
        <ul className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-lg'>
          {items.map(item => (
            <li key={item.id} className='cursor-pointer p-2 hover:bg-gray-100'>
              {item.name.en_US}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
