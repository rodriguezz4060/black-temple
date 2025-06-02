'use client';

import { GearItem } from '@root/@types/prisma';
import { Dialog, DialogTrigger } from '@root/components/ui/dialog';
import { TooltipWrapper } from '@root/components/shared/wrapper';
import { GearSlotEditorDialog } from './gear-slot-editor-dialog';
import { slotBackgrounds } from '@root/utils/slot-backgrounds';

interface GearSlotProps {
  guideId: number;
  item: GearItem | undefined;
  slot: string;
  index: number;
  column: 'left' | 'right' | 'middle';
}

export const BisGearSlotEditor = ({
  item,
  guideId,
  slot,
  index,
  column,
}: GearSlotProps) => {
  const bgPosition = slotBackgrounds[slot.toUpperCase()] || '0em';
  const isRight =
    column === 'right' || (column === 'middle' && slot === 'MAIN_HAND');
  const itemName = item?.itemName || '';
  const itemIcon = item?.itemImg;
  const enchantments = item?.itemEnchantImg;
  const gem = item?.itemSockets || [];

  return (
    <div className='relative'>
      <Dialog>
        <TooltipWrapper content='Редактировать'>
          <DialogTrigger asChild>
            <div
              key={`${slot}-${index}`}
              className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] text-[48px]"
              style={{ backgroundPosition: bgPosition }}
            >
              <div
                className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'
                style={{ backgroundImage: `url(${itemIcon})` }}
              />
            </div>
          </DialogTrigger>
        </TooltipWrapper>
        <GearSlotEditorDialog slot={slot} item={item} guideId={guideId} />
      </Dialog>
      {item && (
        <div
          className={`absolute -top-0.5 ${
            isRight ? 'right-[52px] text-right' : 'left-[52px] text-left'
          } w-[106px] cursor-default text-[12px] font-bold`}
        >
          <div className='text-multi-shadow line-clamp-2 h-[2.4em] leading-[1.2em]'>
            <span className='text-[#a335ee]'>{itemName}</span>
          </div>
          <div
            className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} items-center gap-0.5`}
          >
            {gem.map((gem, idx) => (
              <div
                key={idx}
                className='h-[1em] w-[1em] cursor-pointer border-[2px] border-black bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                style={{ backgroundImage: `url(${gem.socketImg})` }}
              />
            ))}
            {enchantments && (
              <div
                className='h-[1em] w-[1em] cursor-pointer border-[2px] border-black bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                style={{ backgroundImage: `url(${enchantments})` }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
