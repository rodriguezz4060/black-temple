'use server';

interface ItemData {
  type: 'item';
  name: string;
  icon: string;
}

interface SpellData {
  type: 'spell';
  name: string;
  icon: string;
}

interface ErrorResponse {
  type: 'error';
  error: string;
}

interface Asset {
  key: string;
  value: string;
}

interface MediaData {
  assets: Asset[];
}

type DataResponse = ItemData | SpellData | ErrorResponse;

export async function fetchItemData(url: string): Promise<DataResponse> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/';
    const tokenUrl = `${baseUrl}/api/blizzard-token`;
    const cacheOption =
      process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache';

    // Извлечение типа и ID из URL
    const itemMatch = url.match(/item=(\d+)/);
    const spellMatch = url.match(/spell=(\d+)/);

    let id: string;
    let type: 'item' | 'spell';

    if (itemMatch) {
      id = itemMatch[1];
      type = 'item';
    } else if (spellMatch) {
      id = spellMatch[1];
      type = 'spell';
    } else {
      return {
        type: 'error',
        error:
          'Неверная ссылка. Убедитесь, что она содержит ID предмета (item=) или способности (spell=).',
      };
    }

    // Получение токена
    const tokenRes = await fetch(tokenUrl, {
      method: 'GET',
      cache: cacheOption,
    });

    if (!tokenRes.ok) {
      throw new Error('Ошибка получения токена');
    }

    const { access_token } = await tokenRes.json();

    // Формирование URL для данных
    const dataUrl = `https://eu.api.blizzard.com/data/wow/${type}/${id}?namespace=static-eu&locale=ru_RU`;
    const mediaUrl = `https://eu.api.blizzard.com/data/wow/media/${type}/${id}?namespace=static-eu&locale=ru_RU`;

    // Получение данных
    const dataRes = await fetch(dataUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: cacheOption,
      next: { revalidate: 3600 },
    });

    if (!dataRes.ok) {
      throw new Error(
        `Ошибка получения данных ${type === 'item' ? 'предмета' : 'способности'}`
      );
    }

    const data = await dataRes.json();

    // Получение медиа (иконки)
    const mediaRes = await fetch(mediaUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: cacheOption,
      next: { revalidate: 3600 },
    });

    if (!mediaRes.ok) {
      throw new Error(
        `Ошибка получения медиа ${type === 'item' ? 'предмета' : 'способности'}`
      );
    }

    const mediaData: MediaData = await mediaRes.json();
    const iconUrl = mediaData.assets?.find(
      (asset: Asset) => asset.key === 'icon'
    )?.value;

    return {
      type,
      name: data.name,
      icon: iconUrl || '',
    };
  } catch (e: unknown) {
    console.error('Ошибка в fetchData:', e);
    return {
      type: 'error',
      error: e instanceof Error ? e.message : 'Произошла неизвестная ошибка',
    };
  }
}
