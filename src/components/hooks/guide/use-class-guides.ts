'use client';

import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import {
  ClassFilter,
  GuideButtonWithRelations,
  InitialClassSelection,
} from '@root/@types/prisma';
import { Mode } from '@prisma/client';

interface InitialData {
  classes: InitialClassSelection[];
  modes: Mode[];
  patch: string;
}

interface UseClassGuidesProps {
  guides: GuideButtonWithRelations[];
  specFilter: ClassFilter[];
  modeFilter: Mode[];
  initialData: InitialData;
}

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch guides');
    return res.json();
  });

export function useClassGuides({
  guides: initialGuides,
  specFilter,
  modeFilter,
  initialData,
}: UseClassGuidesProps) {
  // Состояние для фильтров
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // Состояние для параметров фильтров
  const [filterParams, setFilterParams] = useState<string>('');

  // Формируем параметры фильтров
  const params = useMemo(() => {
    const urlParams = new URLSearchParams();
    if (selectedClass) urlParams.append('class', selectedClass);
    if (selectedSpec) urlParams.append('spec', selectedSpec);
    if (selectedMode) urlParams.append('mode', selectedMode);
    if (selectedRole) urlParams.append('role', selectedRole);
    return urlParams.toString();
  }, [selectedClass, selectedSpec, selectedMode, selectedRole]);

  // Дебаунсинг для обновления параметров
  const debouncedSetFilterParams = useMemo(
    () =>
      debounce((newParams: string) => {
        setFilterParams(newParams);
      }, 300),
    []
  );

  // Обновляем параметры с дебаунсингом
  useEffect(() => {
    debouncedSetFilterParams(params);
    return () => {
      debouncedSetFilterParams.cancel();
    };
  }, [params, debouncedSetFilterParams]);

  // Используем useSWR для получения данных
  const {
    data: filteredGuides,
    isLoading,
    error,
  } = useSWR(
    `/api/guides/filters?${filterParams}`, // Всегда отправляем запрос
    fetcher,
    {
      fallbackData: initialGuides, // Начальные данные для первого рендера
      revalidateOnFocus: false, // Отключить ревалидацию при фокусе
      revalidateOnReconnect: false, // Отключить ревалидацию при переподключении
      revalidateOnMount: false, // Отключить ревалидацию при монтировании
      dedupingInterval: 2000, // Дедупликация запросов в течение 2 секунд
    }
  );

  return {
    filteredGuides,
    isLoading,
    error,
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
