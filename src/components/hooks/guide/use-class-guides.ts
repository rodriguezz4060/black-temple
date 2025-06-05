'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ClassFilter,
  GuideButtonWithRelations,
  InitialClassSelection,
} from '@root/@types/prisma';
import { Expansion, Mode } from '@prisma/client';

interface InitialData {
  classes: InitialClassSelection[];
  modes: Mode[];
  expansions: Expansion[];
}

interface InitialFilters {
  initialClass: string | null;
  initialSpec: string | null;
  initialMode: string | null;
  initialRole: string | null;
}

interface UseClassGuidesProps {
  guides: GuideButtonWithRelations[];
  specFilter: ClassFilter[];
  modeFilter: Mode[];
  initialData: InitialData;
  initialFilters: InitialFilters;
}

export function useClassGuides({
  guides: initialGuides,
  specFilter,
  modeFilter,
  initialData,
  initialFilters,
}: UseClassGuidesProps) {
  const router = useRouter();

  // Инициализация состояний с учетом начальных параметров из URL
  const [selectedClass, setSelectedClass] = useState<string | null>(
    initialFilters.initialClass
  );
  const [selectedSpec, setSelectedSpec] = useState<string | null>(
    initialFilters.initialSpec
  );
  const [selectedMode, setSelectedMode] = useState<string | null>(
    initialFilters.initialMode
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(
    initialFilters.initialRole
  );

  // Формируем параметры URL
  const params = useMemo(() => {
    const urlParams = new URLSearchParams();
    if (selectedClass) urlParams.set('class', selectedClass);
    if (selectedSpec) urlParams.set('spec', selectedSpec);
    if (selectedMode) urlParams.set('mode', selectedMode);
    if (selectedRole) urlParams.set('role', selectedRole);
    return urlParams.toString();
  }, [selectedClass, selectedSpec, selectedMode, selectedRole]);

  useEffect(() => {
    const newUrl = params ? `?${params}` : '';
    router.replace(`${window.location.pathname}${newUrl}`, { scroll: false });
  }, [params, router]);

  // Клиентская фильтрация гайдов
  const filteredGuides = useMemo(() => {
    return initialGuides.filter(guide => {
      return (
        (!selectedClass || guide.class.name === selectedClass) &&
        (!selectedSpec || guide.specialization.name === selectedSpec) &&
        (!selectedMode || guide.modeRelation.name === selectedMode) &&
        (!selectedRole || guide.specialization.specRole.name === selectedRole)
      );
    });
  }, [initialGuides, selectedClass, selectedSpec, selectedMode, selectedRole]);

  return {
    filteredGuides,
    isLoading: false,
    error: null,
    specFilter,
    modeFilter,
    initialData,
    selectedClass,
    setSelectedClass,
    selectedSpec,
    setSelectedSpec,
    selectedMode,
    setSelectedMode,
    selectedRole,
    setSelectedRole,
  };
}
