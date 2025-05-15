"use client";

import React, { useState } from "react";
import { Mode } from "@prisma/client";
import { ClassFilter } from "@root/@types/prisma";
import Image from "next/image";

interface GuidesFiltersProps {
  specFilter: ClassFilter[];
  modeFilter: Mode[];
}

export default function GuidesFilters({
  specFilter,
  modeFilter,
}: GuidesFiltersProps) {
  // Состояние для выбранного класса
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const uniqueClass = specFilter.filter(
    (classFilter, index, self) =>
      index === self.findIndex((c) => c.class.name === classFilter.class.name),
  );

  // Фильтрация специализаций: возвращаем только связанные с выбранным классом, иначе пустой массив
  const filteredSpecs = selectedClass
    ? specFilter.filter((spec) => spec.class.name === selectedClass)
    : [];

  const uniqueSpec = filteredSpecs.filter(
    (specFilter, index, self) =>
      index === self.findIndex((c) => c.name === specFilter.name),
  );

  const uniqueRole = specFilter.filter(
    (specFilter, index, self) =>
      index ===
      self.findIndex((c) => c.specRole.name === specFilter.specRole.name),
  );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-3">
        {/* Class Filter */}
        <div className="flex w-full items-center">
          <div className="flex flex-col rounded-2xl p-4 bg-[#171717] w-full">
            <div className="px-1.5">Выберите класс:</div>
            <div className="flex w-full gap-8">
              <ul className="flex w-full flex-wrap items-center gap-1 cursor-pointer">
                {uniqueClass.map((filter) => (
                  <li
                    key={filter.id}
                    style={{
                      color: `${filter.class.classColor}`,
                    }}
                    className={`relative whitespace-nowrap leading-none ${
                      selectedClass === filter.class.name
                        ? "bg-[#333333] rounded-lg"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedClass(
                        selectedClass === filter.class.name
                          ? null
                          : filter.class.name,
                      )
                    } // Сбрасываем выбор при повторном клике
                  >
                    <span className="relative flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm">
                      <Image
                        width="20"
                        height="20"
                        className="border-[#333333] rounded-[4px] border"
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

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {/* Spec Filter */}

          <div className="flex basis-1/3 items-center">
            {uniqueSpec.length > 0 && (
              <div className="flex flex-col rounded-2xl p-4 border-[#333333] border">
                <div className="px-1.5">Выберите специализацию:</div>
                <div className="flex w-full gap-8">
                  <ul className="flex w-full flex-wrap items-center gap-1 cursor-pointer">
                    {uniqueSpec.map((filter) => (
                      <li
                        key={filter.id}
                        className={`relative whitespace-nowrap leading-none  ${
                          selectedSpec === filter.name
                            ? "bg-[#1C1C1C] rounded-lg"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSpec(
                            selectedSpec === filter.name ? null : filter.name,
                          )
                        } // Сбрасываем выбор при повторном клике
                      >
                        <span className="relative flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm">
                          <span className="flex min-w-max items-center gap-2">
                            <Image
                              src={filter.specIcon}
                              className="border-[#333333] rounded-sm border"
                              width="24"
                              height="24"
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

          {/* Other Filters */}
          <div className="flex flex-1 flex-col gap-1 md:p-4">
            <span>Другие фильтра:</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-wrap md:items-center">
              {/* Mode Filters */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-end gap-16">
                  <ul className="flex h-10 items-center gap-4 list-none  cursor-pointer">
                    {modeFilter.map((filter) => (
                      <li
                        key={filter.id}
                        className={`text-[#95989B] p-[8_8] relative text-[12px] font-[600] leading-none whitespace-nowrap ${
                          selectedMode === filter.name
                            ? "bg-[#1C1C1C] text-white rounded-lg"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedMode(
                            selectedMode === filter.name ? null : filter.name,
                          )
                        } // Сбрасываем выбор при повторном клике
                      >
                        <span className="flex min-w-max items-center gap-2">
                          <Image
                            src={filter.activityIcon}
                            className="border-dark-5 rounded-[4px] border"
                            width="20"
                            height="20"
                            alt={filter.name}
                          />
                          {filter.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Role Filters */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-end gap-16">
                  <ul className="flex h-10 items-center gap-4 list-none m-0 p-0 cursor-pointer">
                    {uniqueRole.map((filter) => (
                      <li
                        key={filter.id}
                        className={`text-[#95989B] p-[8_8] relative text-[12px] font-[600] leading-none whitespace-nowrap ${
                          selectedRole === filter.name
                            ? "bg-[#1C1C1C] text-white rounded-lg"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedRole(
                            selectedRole === filter.name ? null : filter.name,
                          )
                        } // Сбрасываем выбор при повторном клике
                      >
                        <span className="flex min-w-max items-center gap-2">
                          <Image
                            src={filter.specRole.roleIcon}
                            className="border-dark-5 rounded-[4px] border"
                            width="20"
                            height="20"
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
