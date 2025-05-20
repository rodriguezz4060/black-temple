'use client';

import { GearItem } from '@root/@types/prisma';
import { slotBackgrounds } from '@root/utils/slot-backgrounds';
import Link from 'next/link';

interface GearSlotProps {
  item: GearItem | undefined;
  slot: string;
  index: number;
  column: 'left' | 'right' | 'middle';
}

export const GearSlot = ({ item, slot, index, column }: GearSlotProps) => {
  const bgPosition = slotBackgrounds[slot.toUpperCase()] || '0em';
  const isRight =
    column === 'right' || (column === 'middle' && slot === 'MAIN_HAND');
  const itemName = item?.itemName || '';
  const itemIcon = item?.itemImg;
  const itemLink = item?.itemLink;
  const enchantments = item?.itemEnchantImg;
  const enchantmentLink = item?.itemEnchantUrl;
  const gem = item?.itemSockets || [];

  return (
    <div className='relative'>
      <div
        key={`${slot}-${index}`}
        className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] text-[48px]"
        style={{ backgroundPosition: bgPosition }}
      >
        <Link
          href={itemLink || '#'}
          data-wh-color-link='false'
          data-wh-iconize-link='false'
          data-wh-rename-link='false'
          onClick={e => e.preventDefault()}
        >
          <div
            className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'
            style={{ backgroundImage: `url(${itemIcon})` }}
          />
        </Link>
      </div>

      {item && (
        <div
          className={`absolute -top-0.5 ${
            isRight ? 'right-[52px] text-right' : 'left-[52px] text-left'
          } w-[106px] cursor-default text-[12px] font-bold`}
        >
          <div className='text-multi-shadow line-clamp-2 h-[2.4em] leading-[1.2em]'>
            <Link
              href={itemLink || '#'}
              data-wh-color-link='false'
              data-wh-iconize-link='false'
              data-wh-rename-link='false'
              onClick={e => e.preventDefault()}
            >
              <span className='text-[#a335ee]'>{itemName}</span>
            </Link>
          </div>
          <div
            className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} items-center gap-0.5`}
          >
            {gem.map((gem, idx) => (
              <Link
                key={idx}
                href={gem.socketUrl || '#'}
                data-wh-color-link='false'
                data-wh-iconize-link='false'
                data-wh-rename-link='false'
                onClick={e => e.preventDefault()}
              >
                <div
                  className='h-[1em] w-[1em] cursor-pointer border-[2px] border-black bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                  style={{ backgroundImage: `url(${gem.socketImg})` }}
                />
              </Link>
            ))}
            {enchantments && (
              <Link
                href={enchantmentLink || '#'}
                data-wh-color-link='false'
                data-wh-iconize-link='false'
                data-wh-rename-link='false'
                onClick={e => e.preventDefault()}
              >
                <div
                  className='h-[1em] w-[1em] cursor-pointer border-[2px] border-black bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                  style={{ backgroundImage: `url(${enchantments})` }}
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
