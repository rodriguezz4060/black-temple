'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    $WowheadPower?: {
      refreshLinks: () => void;
    };
  }
}

export default function WowheadInitializer() {
  useEffect(() => {
    // Проверяем, есть ли уже скрипт Wowhead
    if (window.$WowheadPower) {
      window.$WowheadPower.refreshLinks();
      return;
    }

    // Динамически загружаем скрипт Wowhead
    const script = document.createElement('script');
    script.src = 'https://wow.zamimg.com/js/tooltips.js';
    script.async = true;
    script.onload = () => {
      if (window.$WowheadPower) {
        window.$WowheadPower.refreshLinks();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
