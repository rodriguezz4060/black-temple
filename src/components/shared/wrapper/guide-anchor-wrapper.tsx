import React from 'react';

interface GuideTitleProps {
  anchorId: string;
  title: string;
  patch: string;
  characterClass: string;
  spec: string;
}

export const GuideAnchorWrapper = ({
  anchorId,
  title,
  patch,
  characterClass,
  spec,
}: GuideTitleProps) => {
  return (
    <>
      <div className='clear-both m-0 h-5 p-0'></div>
      <div className='my-2 flex flex-col gap-0.5'>
        <div className='flex flex-wrap items-center justify-between gap-5 leading-[1.25] font-medium'>
          <div className='flex flex-wrap items-center gap-5'>
            <h2
              className='text-xl font-bold text-blue-500 uppercase'
              id={anchorId}
            >
              {title}
            </h2>
          </div>
          <span className='text-[#95989B]'>Patch {patch}</span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-xs leading-[1.25] text-[#95989B]'>
            {spec} {characterClass}
          </span>
          <span className='block h-[1px] flex-[1] bg-[#2B2C2C]'></span>
        </div>
      </div>
    </>
  );
};
