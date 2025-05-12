import React from "react";

interface GuideTitleProps {
  anchorId: string;
  title: string;
  patch: string;
}

export const GuideTitle = ({ anchorId, title, patch }: GuideTitleProps) => {
  return (
    <>
      <div className="clear-both m-0 p-0 h-5"></div>
      <div className="my-2 flex flex-col gap-0.5">
        <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
          <div className="items-center flex flex-wrap gap-5">
            <h2
              className="text-xl font-bold uppercase text-blue-500"
              id={anchorId}
            >
              {title}
            </h2>
          </div>
          <span className="text-[#95989B]">{patch}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#95989B] leading-[1.25]">
            Havoc Demon Hunter
          </span>
          <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
        </div>
      </div>
    </>
  );
};
