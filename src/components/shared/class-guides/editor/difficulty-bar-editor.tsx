'use client';

import Image from 'next/image';
import { Button } from '@root/components/ui/button';
import { OverviewDifficulty } from '@prisma/client';
import { useDifficultyEditor } from '@root/components/hooks/guide/edit';

interface RatingEditorProps {
  guideId: number;
  item: OverviewDifficulty;
  icon: string;
  spec: string;
  classColor: string;
  gameMode: string;
}

export const DifficultyBarEditor = ({
  guideId,
  icon,
  spec,
  classColor,
  gameMode,
  item,
}: RatingEditorProps) => {
  const {
    ratings,
    hasChanges,
    isPending,
    handleRatingClick,
    getActiveColor,
    getDescription,
    handleSave,
  } = useDifficultyEditor({ guideId, item });

  return (
    <div className='relative max-w-[360px] flex-1 rounded-[12px] border p-6'>
      <div className='flex flex-col gap-5'>
        {/* Spec Header */}
        <div className='flex h-16 items-center'>
          <div className='flex'>
            <Image
              src={icon}
              alt={spec}
              width={40}
              height={40}
              className='w-11'
            />
          </div>
          <span className='z-1 text-[16px] uppercase'>
            <span className='flex flex-col gap-0 pl-2.5'>
              <span
                className='font-bold'
                style={{
                  color: `${classColor}`,
                }}
              >
                {spec}
              </span>
              <span className='font-sans text-sm text-[#95989B] normal-case'>
                {gameMode}
              </span>
            </span>
          </span>
        </div>

        {ratings.map((rating, ratingIndex) => {
          const activeColor =
            rating.value > 0 ? getActiveColor(rating.value) : '';

          return (
            <div key={ratingIndex} className='flex flex-col gap-1'>
              <span className='text-[13px] font-bold uppercase'>
                {rating.label}
              </span>

              <div className='flex items-center gap-1'>
                {[...Array(rating.max)].map((_, i) => {
                  const value = i + 1;
                  const isActive = value <= rating.value;

                  return (
                    <div
                      key={i}
                      onClick={() => handleRatingClick(ratingIndex, value)}
                      className={`h-2 flex-1 cursor-pointer rounded-[4px] transition-colors ${isActive ? activeColor : 'bg-[#2B2C2C]'} hover:opacity-80`}
                    />
                  );
                })}
              </div>

              <span className='text-[13px] text-[#95989B]'>
                {getDescription(rating.value)}
              </span>
            </div>
          );
        })}
      </div>
      {hasChanges && (
        <div className='mt-3 flex justify-end'>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      )}
    </div>
  );
};
