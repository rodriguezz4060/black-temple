'use client';

import { useEffect, useRef } from 'react';

interface WowheadLinkProps {
  id: number;
  type: 'spell' | 'item';
  whData: string;
  isPtr?: boolean;
  ptrPrefix?: 'ptr' | 'ptr-2';
  className?: string;
  children?: React.ReactNode;
}

export default function WowheadLink({
  id,
  type,
  whData,
  isPtr = false,
  ptrPrefix,
  className,
  children,
}: WowheadLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && window.$WowheadPower) {
      window.$WowheadPower.refreshLinks();
    }
  }, [id, type, isPtr, ptrPrefix]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // Создаем URL, но он никогда не будет использован для навигации
  const baseUrl = isPtr
    ? `https://www.wowhead.com/${ptrPrefix || 'ptr'}`
    : 'https://www.wowhead.com/ru';
  const href = `${baseUrl}/${type}=${id}`;

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleClick}
      onAuxClick={handleClick}
      onContextMenu={handleClick}
      style={{ display: 'inline-block', pointerEvents: 'auto' }}
    >
      <a
        ref={ref}
        href={href}
        data-wh-rename-link='false'
        data-wh-icon-size={whData}
        className={`${className || ''} no-navigation`}
        role='button'
        aria-label={`Wowhead ${type} ${id}`}
        style={{ pointerEvents: 'none' }}
      >
        {children}
      </a>
    </div>
  );
}
