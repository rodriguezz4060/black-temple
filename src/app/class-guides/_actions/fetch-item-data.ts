'use server';

interface ItemData {
  name: string;
  icon: string;
}

interface ErrorResponse {
  error: string;
}

interface Asset {
  key: string;
  value: string;
}

interface MediaData {
  assets: Asset[];
}

export async function fetchItemData(
  url: string
): Promise<ItemData | ErrorResponse> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/';
    const urlApi = `${baseUrl}/api/blizzard-token`;

    // Извлечение ID предмета из URL
    const match = url.match(/item=(\d+)/);
    if (!match) {
      return {
        error:
          'Неверная ссылка. Убедитесь, что она содержит ID предмета (например, item=228839).',
      };
    }
    const itemId = match[1];

    // Получение токена
    const tokenRes = await fetch(urlApi, {
      method: 'GET',
      cache: 'force-cache',
    });

    if (!tokenRes.ok) {
      throw new Error('Ошибка получения токена');
    }

    const { access_token } = await tokenRes.json();

    // Получение данных предмета
    const itemRes = await fetch(
      `https://eu.api.blizzard.com/data/wow/item/${itemId}?namespace=static-eu&locale=ru_RU`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    if (!itemRes.ok) {
      throw new Error('Ошибка получения данных предмета');
    }

    const itemData = await itemRes.json();

    // Получение медиа (иконки)
    const mediaRes = await fetch(
      `https://eu.api.blizzard.com/data/wow/media/item/${itemId}?namespace=static-eu&locale=ru_RU`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    if (!mediaRes.ok) {
      throw new Error('Ошибка получения медиа');
    }

    const mediaData: MediaData = await mediaRes.json();
    const iconUrl = mediaData.assets?.find(
      (asset: Asset) => asset.key === 'icon'
    )?.value;

    return {
      name: itemData.name,
      icon: iconUrl || '',
    };
  } catch (e: unknown) {
    console.error('Ошибка в fetchItemData:', e);
    return {
      error: e instanceof Error ? e.message : 'Произошла неизвестная ошибка',
    };
  }
}
