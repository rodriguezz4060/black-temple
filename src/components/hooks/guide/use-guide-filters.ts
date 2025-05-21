'use client';

import { Mode } from '@prisma/client';
import { ClassFilter } from '@root/@types/prisma';
import { useCallback, useMemo } from 'react';

interface UseGuideFiltersProps {
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

export function useGuideFilters({
  specFilter,
  modeFilter,
  selectedClass,
  setSelectedClass,
  selectedSpec,
  setSelectedSpec,
  selectedMode,
  setSelectedMode,
  selectedRole,
  setSelectedRole,
}: UseGuideFiltersProps) {
  // Уникальные классы
  const uniqueClass = useMemo(
    () =>
      specFilter.filter(
        (classFilter, index, self) =>
          index === self.findIndex(c => c.class.name === classFilter.class.name)
      ),
    [specFilter]
  );

  // Фильтрованные специализации
  const filteredSpecs = useMemo(
    () =>
      selectedClass
        ? specFilter.filter(spec => spec.class.name === selectedClass)
        : [],
    [selectedClass, specFilter]
  );

  // Уникальные специализации
  const uniqueSpec = useMemo(
    () =>
      filteredSpecs.filter(
        (specFilter, index, self) =>
          index === self.findIndex(c => c.name === specFilter.name)
      ),
    [filteredSpecs]
  );

  // Уникальные роли
  const uniqueRole = useMemo(
    () =>
      specFilter.filter(
        (specFilter, index, self) =>
          index ===
          self.findIndex(c => c.specRole.name === specFilter.specRole.name)
      ),
    [specFilter]
  );

  // Обработчик клика по классу
  const handleClassClick = useCallback(
    (className: string) => {
      const newClass = selectedClass === className ? null : className;
      setSelectedClass(newClass);
      setSelectedSpec(null);
    },
    [selectedClass, setSelectedClass, setSelectedSpec]
  );

  // Обработчик клика по специализации
  const handleSpecClick = useCallback(
    (specName: string) => {
      setSelectedSpec(selectedSpec === specName ? null : specName);
    },
    [selectedSpec, setSelectedSpec]
  );

  // Обработчик клика по режиму
  const handleModeClick = useCallback(
    (modeName: string) => {
      setSelectedMode(selectedMode === modeName ? null : modeName);
    },
    [selectedMode, setSelectedMode]
  );

  // Обработчик клика по роли
  const handleRoleClick = useCallback(
    (roleName: string) => {
      setSelectedRole(selectedRole === roleName ? null : roleName);
    },
    [selectedRole, setSelectedRole]
  );

  return {
    uniqueClass,
    uniqueSpec,
    uniqueRole,
    filteredSpecs,
    modeFilter,
    selectedClass,
    selectedSpec,
    selectedMode,
    selectedRole,
    handleClassClick,
    handleSpecClick,
    handleModeClick,
    handleRoleClick,
  };
}
