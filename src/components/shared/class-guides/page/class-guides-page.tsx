import React from "react";
import Image from "next/image";
import { ClassFilter, GuideButtonWithRelations } from "@root/@types/prisma";
import { GuideData } from "@root/app/class-guides/_actions/create-guide";

import {
  GuideButton,
  CreateGuideModal,
  GuidesFilters,
} from "@root/components/shared";
import { Mode } from "@prisma/client";

interface ClassGuidesPageProps {
  guides: GuideButtonWithRelations[];
  specFilter: ClassFilter[];
  modeFilter: Mode[];
  className?: string;
}

export const ClassGuidesPage: React.FC<ClassGuidesPageProps> = async ({
  guides,
  specFilter,
  modeFilter,
}: ClassGuidesPageProps) => {
  const initialData = await GuideData();
  console.log(specFilter);
  return (
    <div className=" mt-4 flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col ">
        <div className="contain-inline-size flex flex-col border-b border-[#2B2B2B]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center flex-wrap gap-y-0">
              <div className="max-w-80 p-3 gap-1 flex items-center">
                <span className="bg-blue-500 w-3 h-3 rounded-[2px]"></span>
                <h2 className="text-[20px]">Гайды по классам</h2>
              </div>
            </div>
            <div className="flex items-center justify-end px-3 sm:pr-5 ">
              <CreateGuideModal initialData={initialData} />
            </div>
          </div>
        </div>
      </div>
      <GuidesFilters specFilter={specFilter} modeFilter={modeFilter} />

      <div className="mt-5">
        {guides.length === 0 ? (
          <p>
            Гайды пока не созданы. Нажмите кнопку, чтобы добавить новый гайд.
          </p>
        ) : (
          <GuideButton guides={guides} />
        )}
      </div>
    </div>
  );
};
