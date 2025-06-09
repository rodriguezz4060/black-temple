import { GuideSpecGearProps } from '@root/@types/prisma';
import Image from 'next/image';
import { BisGearSlotEditor } from './bis-gear-slot-editor';

export const BisGearEditor = ({
  gearBanner,
  guideId,
  spec,
  classColor,
  gameMode,
  characterClass,
  gearData,
}: GuideSpecGearProps) => {
  const leftSlots = [
    'HEAD',
    'NECK',
    'SHOULDER',
    'BACK',
    'CHEST',
    'SHIRT',
    'TABARD',
    'WRIST',
  ];
  const rightSlots = [
    'HAND',
    'BELT',
    'LEGS',
    'FEET',
    'FINGER',
    'SECOND_FINGER',
    'TRINKET',
    'SECOND_TRINKET',
  ];
  const middleSlots = ['MAIN_HAND', 'OFF_HAND'];

  return (
    <div className='w-full grow-[1] md:flex-1 md:grow-[1]'>
      <figure className='embed relative mx-auto table text-center'>
        <div className='flex w-full origin-[top]! flex-col p-0'>
          <div className='h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin]'>
            <div className='inline-block'>
              <div className='m-0 box-border border-0 p-0 [vertical-align:initial] text-inherit [text-decoration:none]'>
                <div className='relative h-[500px] w-[340px]'>
                  <div className='absolute inset-0 grayscale-50'>
                    <Image
                      src={gearBanner}
                      alt={`${characterClass} ${spec} ${gameMode}`}
                      width={340}
                      height={500}
                      className=''
                      priority
                    />
                  </div>
                  {/* Левая колонка */}
                  <div className='absolute top-2.5 left-2.5 flex flex-col gap-1.5'>
                    {leftSlots.map((slot, index) => {
                      const item = gearData.find(
                        gear => gear.itemSlot === slot
                      );
                      return (
                        <BisGearSlotEditor
                          guideId={guideId}
                          key={slot}
                          item={item}
                          slot={slot}
                          index={index}
                          column='left'
                        />
                      );
                    })}
                  </div>
                  {/* Правая колонка */}
                  <div className='absolute top-2.5 right-2.5 flex flex-col gap-1.5'>
                    {rightSlots.map((slot, index) => {
                      const item = gearData.find(
                        gear => gear.itemSlot === slot
                      );
                      return (
                        <BisGearSlotEditor
                          guideId={guideId}
                          key={slot}
                          item={item}
                          slot={slot}
                          index={index}
                          column='right'
                        />
                      );
                    })}
                  </div>
                  {/* Центральная колонка */}
                  <div className='absolute bottom-2.5 left-[50%] flex translate-x-[-50%] flex-row gap-1.5'>
                    {middleSlots.map((slot, index) => {
                      const item = gearData.find(
                        gear => gear.itemSlot === slot
                      );
                      return (
                        <BisGearSlotEditor
                          guideId={guideId}
                          key={slot}
                          item={item}
                          slot={slot}
                          index={index}
                          column='middle'
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <figcaption className='font-title my-2 text-center text-sm'>
          <strong style={{ color: classColor }}>
            {characterClass} {spec}
          </strong>{' '}
          Лучшие слоты для {gameMode}
        </figcaption>
      </figure>
    </div>
  );
};
