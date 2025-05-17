'use client';

import React from 'react';
import {
  ClassFilter,
  GuideButtonWithRelations,
  InitialClassSelection,
} from '@root/@types/prisma';
import {
  GuideButton,
  CreateGuideModal,
  GuidesFilters,
} from '@root/components/shared';
import { Mode } from '@prisma/client';
import { useClassGuides } from '@root/components/hooks';

interface InitialData {
  classes: InitialClassSelection[];
  modes: Mode[];
  patch: string;
}

interface ClassGuidesPageProps {
  guides: GuideButtonWithRelations[];
  specFilter: ClassFilter[];
  modeFilter: Mode[];
  initialData: InitialData;
  className?: string;
}

export default function ClassGuidesPage({
  guides,
  specFilter,
  modeFilter,
  initialData,
  className,
}: ClassGuidesPageProps) {
  const {
    filteredGuides,
    isLoading,
    error,
    specFilter: filters,
    modeFilter: modes,
    initialData: data,
    selectedClass,
    setSelectedClass,
    selectedSpec,
    setSelectedSpec,
    selectedMode,
    setSelectedMode,
    selectedRole,
    setSelectedRole,
  } = useClassGuides({
    guides,
    specFilter,
    modeFilter,
    initialData,
  });

  return (
    <div className={`mt-4 flex flex-col gap-6 ${className || ''}`}>
      {/* Title */}
      <div className='flex flex-col'>
        <div className='flex flex-col border-b border-[#2B2B2B] contain-inline-size'>
          <div className='flex flex-col pb-2 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-y-0'>
              <div className='flex max-w-80 items-center gap-1 p-3'>
                <span className='h-3 w-3 rounded-[2px] bg-blue-500'></span>
                <h2 className='text-[20px]'>Гайды по классам</h2>
              </div>
            </div>
            <div className='flex items-center justify-end px-3 sm:pr-5'>
              <CreateGuideModal initialData={data} />
            </div>
          </div>
        </div>
      </div>
      <GuidesFilters
        specFilter={filters}
        modeFilter={modes}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSpec={selectedSpec}
        setSelectedSpec={setSelectedSpec}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <div>
        {isLoading ? (
          <div className='flex justify-center py-8'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent' />
          </div>
        ) : error ? (
          <p className='py-4 text-center text-red-400'>
            Ошибка при загрузке гайдов. Попробуйте позже.
          </p>
        ) : filteredGuides.length === 0 ? (
          <p className='py-4 text-center text-gray-400'>
            {selectedClass || selectedSpec || selectedMode
              ? 'Гайды по выбранным фильтрам не найдены'
              : 'Гайды пока не созданы'}
          </p>
        ) : (
          <GuideButton guides={filteredGuides} />
        )}
      </div>
    </div>
  );
}
