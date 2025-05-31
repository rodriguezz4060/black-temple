'use client';

import React from 'react';
import Image from 'next/image';
import { ClassFilter } from '@root/@types/prisma';
import { Mode } from '@prisma/client';
import { useGuideFilters } from '@root/components/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@root/components/ui/select';

interface GuidesFiltersProps {
  specFilter: ClassFilter[];
  modeFilter: Mode[];
  selectedClass: string | null;
  setSelectedClass: (value: string | null) => void;
  selectedSpec: string | null;
  setSelectedSpec: (value: string | null) => void;
  selectedMode: string | null;
  setSelectedMode: (value: string | null) => void;
  selectedRole: string | null;
  setSelectedRole: (value: string | null) => void;
}

export default function GuidesFilters(props: GuidesFiltersProps) {
  const {
    uniqueClass,
    uniqueSpec,
    uniqueRole,
    modeFilter,
    selectedClass,
    selectedSpec,
    selectedMode,
    selectedRole,
    handleClassClick,
    handleSpecClick,
    handleModeClick,
    handleRoleClick,
  } = useGuideFilters(props);

  return (
    <>
      {/* Mobile/Tablet Select (visible on small screens) */}
      <div className='flex flex-1 flex-col gap-1 md:p-4'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-wrap md:items-center lg:hidden'>
          {/* Селект класса (всегда виден) */}
          <Select>
            <SelectTrigger size='xs' className='w-full'>
              <SelectValue placeholder='Класс' />
            </SelectTrigger>
            <SelectContent avoidCollisions={false}>
              {uniqueClass.map(filter => (
                <SelectItem key={filter.id} value={filter.class.name}>
                  <span onClick={() => handleClassClick(filter.class.name)}>
                    {filter.class.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Селект специализации (виден только при выбранном классе) */}
          {selectedClass && (
            <Select>
              <SelectTrigger size='xs' className='w-full'>
                <SelectValue placeholder='Специализация' />
              </SelectTrigger>
              <SelectContent avoidCollisions={false}>
                {uniqueSpec.map(filter => (
                  <SelectItem key={filter.id} value={filter.name}>
                    <span onClick={() => handleSpecClick(filter.name)}>
                      {filter.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select>
            <SelectTrigger size='xs' className='w-full'>
              <SelectValue placeholder='Режим' />
            </SelectTrigger>
            <SelectContent avoidCollisions={false}>
              {modeFilter.map(filter => (
                <SelectItem key={filter.id} value={filter.name}>
                  <span onClick={() => handleModeClick(filter.name)}>
                    {filter.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger size='xs' className='w-full'>
              <SelectValue placeholder='Роль' />
            </SelectTrigger>
            <SelectContent avoidCollisions={false}>
              {uniqueRole.map(filter => (
                <SelectItem key={filter.id} value={filter.specRole.name}>
                  <span onClick={() => handleRoleClick(filter.specRole.name)}>
                    {filter.specRole.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter full screen (hidden on small screens, visible on large screens) */}
      <div className='hidden flex-col gap-3 lg:block'>
        <div className='flex w-full items-center'>
          <div className='flex w-full flex-col rounded-2xl bg-[#F0F8FF] p-4 dark:bg-[#171717]'>
            <div className='px-1.5'>Выберите класс:</div>
            <div className='flex w-full gap-8'>
              <ul className='flex w-full cursor-pointer flex-wrap items-center gap-1'>
                {uniqueClass.map(filter => (
                  <li
                    key={filter.id}
                    style={{ color: `${filter.class.classColor}` }}
                    className={`relative leading-none whitespace-nowrap ${
                      selectedClass === filter.class.name
                        ? 'rounded-lg bg-[#333333]'
                        : ''
                    }`}
                    onClick={() => handleClassClick(filter.class.name)}
                  >
                    <span className='relative flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm'>
                      <Image
                        width='20'
                        height='20'
                        className='rounded-[4px] border border-[#333333]'
                        src={filter.class.classIcon}
                        alt={filter.class.name}
                      />
                      {filter.class.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-between gap-4 py-1 md:flex-row'>
          <div className='flex basis-1/3 items-center'>
            {uniqueSpec.length > 0 && (
              <div className='flex flex-col rounded-2xl border border-[#333333] p-4'>
                <div className='px-1.5'>Выберите специализацию:</div>
                <div className='flex w-full gap-8'>
                  <ul className='flex w-full cursor-pointer flex-wrap items-center gap-1'>
                    {uniqueSpec.map(filter => (
                      <li
                        key={filter.id}
                        className={`relative leading-none whitespace-nowrap ${
                          selectedSpec === filter.name
                            ? 'rounded-lg bg-[#1C1C1C]'
                            : ''
                        }`}
                        onClick={() => handleSpecClick(filter.name)}
                      >
                        <span className='relative flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm'>
                          <span className='flex min-w-max items-center gap-2'>
                            <Image
                              src={filter.specIcon}
                              className='rounded-sm border border-[#333333]'
                              width='24'
                              height='24'
                              alt={filter.name}
                            />
                            {filter.name}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-1 flex-col gap-1 md:p-4'>
            <span>Другие фильтры:</span>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-wrap md:items-center'>
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex items-end gap-16'>
                  <ul className='flex h-10 cursor-pointer list-none items-center gap-4'>
                    {modeFilter.map(filter => (
                      <li
                        key={filter.id}
                        className={`relative p-[8_8] text-[12px] leading-none font-[600] whitespace-nowrap text-[#95989B] ${
                          selectedMode === filter.name
                            ? 'rounded-lg bg-[#1C1C1C] text-white'
                            : ''
                        }`}
                        onClick={() => handleModeClick(filter.name)}
                      >
                        <span className='flex min-w-max items-center gap-2'>
                          <Image
                            src={filter.activityIcon}
                            className='border-dark-5 rounded-[4px] border'
                            width='20'
                            height='20'
                            alt={filter.name}
                          />
                          {filter.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex items-end gap-16'>
                  <ul className='m-0 flex h-10 cursor-pointer list-none items-center gap-4 p-0'>
                    {uniqueRole.map(filter => (
                      <li
                        key={filter.id}
                        className={`relative p-[8_8] text-[12px] leading-none font-[600] whitespace-nowrap text-[#95989B] ${
                          selectedRole === filter.specRole.name
                            ? 'rounded-lg bg-[#1C1C1C] text-white'
                            : ''
                        }`}
                        onClick={() => handleRoleClick(filter.specRole.name)}
                      >
                        <span className='flex min-w-max items-center gap-2'>
                          <Image
                            src={filter.specRole.roleIcon}
                            className='border-dark-5 rounded-[4px] border'
                            width='20'
                            height='20'
                            alt={filter.specRole.name}
                          />
                          {filter.specRole.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
