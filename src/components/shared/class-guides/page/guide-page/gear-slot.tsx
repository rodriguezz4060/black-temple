import { GearItem } from '@root/components/constants/geatData';

interface GearSlotProps {
  item: GearItem | undefined;
  slot: string;
  index: number;
  column: 'left' | 'right' | 'middle';
}

const slotBackgrounds: { [key: string]: string } = {
  Head: '0em',
  Neck: '-1em',
  Shoulder: '-2em',
  Shirt: '-3em',
  Chest: '-4em',
  Belt: '-5em',
  Legs: '-6em',
  Feet: '-7em',
  Wrist: '-8em',
  Hand: '-9em',
  Finger1: '-11em',
  Finger2: '-11em',
  Trinket1: '-12em',
  Trinket2: '-13em',
  Back: '-14em',
  MainHand: '-15em',
  OffHand: '-16em',
  Tabard: '-18em',
};

export const GearSlot = ({ item, slot, index, column }: GearSlotProps) => {
  const bgPosition = slotBackgrounds[slot] || '0em';
  const isRight =
    column === 'right' || (column === 'middle' && slot === 'MainHand');
  const itemName = item?.name || '';
  const itemIcon = item?.icon || '/assets/slots.png';
  const enchantments = item?.enchantments || [];
  const gem = item?.gem || [];

  return (
    <div className='relative'>
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
      {item && (
        <div
          className={`absolute -top-0.5 ${
            isRight ? 'right-[52px] text-right' : 'left-[52px] text-left'
          } w-[106px] cursor-default text-[12px] font-bold`}
        >
          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
            <span className='text-[#a335ee]'>{itemName}</span>
          </div>
          <div
            className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} items-center gap-0.5`}
          >
            {enchantments.map((enchant, idx) => (
              <div
                key={idx}
                className='h-[1em] w-[1em] cursor-pointer border-[2px] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                style={{ backgroundImage: `url(${enchant})` }}
              />
            ))}
            {gem.map((gem, idx) => (
              <div
                key={idx}
                className='h-[1em] w-[1em] cursor-pointer border-[2px] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                style={{ backgroundImage: `url(${gem})` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
