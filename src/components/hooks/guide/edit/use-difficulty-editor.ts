'use client';

import { useState, useTransition, useMemo } from 'react';
import { OverviewDifficulty } from '@prisma/client';
import { updateDifficulty } from '@root/app/class-guides/_actions/save-difficulty-bare';
import toast from 'react-hot-toast';

interface Rating {
  label: string;
  value: number;
  max: number;
}

interface DifficultyEditorState {
  singleTarget: number;
  multiTarget: number;
  utility: number;
  survivability: number;
  mobility: number;
}

interface UseDifficultyEditorProps {
  guideId: number;
  item: OverviewDifficulty;
}

interface UseDifficultyEditorReturn {
  ratings: Rating[];
  hasChanges: boolean;
  isPending: boolean;
  handleRatingClick: (ratingIndex: number, newValue: number) => void;
  getActiveColor: (value: number) => string;
  getDescription: (value: number) => string;
  handleSave: () => void;
}

export const useDifficultyEditor = ({
  guideId,
  item,
}: UseDifficultyEditorProps): UseDifficultyEditorReturn => {
  const [isPending, startTransition] = useTransition();
  const [itemState, setItemState] = useState<DifficultyEditorState>({
    singleTarget: item.singleTarget ?? 0,
    multiTarget: item.multiTarget ?? 0,
    utility: item.utility ?? 0,
    survivability: item.survivability ?? 0,
    mobility: item.mobility ?? 0,
  });

  // Сохраняем исходные значения для сравнения
  const initialState = useMemo(
    () => ({
      singleTarget: item.singleTarget ?? 0,
      multiTarget: item.multiTarget ?? 0,
      utility: item.utility ?? 0,
      survivability: item.survivability ?? 0,
      mobility: item.mobility ?? 0,
    }),
    [item]
  );

  // Проверяем, были ли изменения
  const hasChanges = useMemo(
    () =>
      itemState.singleTarget !== initialState.singleTarget ||
      itemState.multiTarget !== initialState.multiTarget ||
      itemState.utility !== initialState.utility ||
      itemState.survivability !== initialState.survivability ||
      itemState.mobility !== initialState.mobility,
    [itemState, initialState]
  );

  // Формируем массив рейтингов
  const ratings: Rating[] = [
    { label: 'Урон по одной цели', value: itemState.singleTarget, max: 5 },
    { label: 'АоЕ', value: itemState.multiTarget, max: 5 },
    { label: 'Утилити', value: itemState.utility, max: 5 },
    { label: 'Выживаемость', value: itemState.survivability, max: 5 },
    { label: 'Мобильность', value: itemState.mobility, max: 5 },
  ];

  const handleRatingClick = (ratingIndex: number, newValue: number) => {
    const fieldMap: { [key: number]: keyof DifficultyEditorState } = {
      0: 'singleTarget',
      1: 'multiTarget',
      2: 'utility',
      3: 'survivability',
      4: 'mobility',
    };

    const field = fieldMap[ratingIndex];
    setItemState(prev => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const getActiveColor = (value: number) => {
    if (value <= 1) return 'bg-[#E05B5B]'; // Красный
    if (value <= 3) return 'bg-[#F09A18]'; // Желтый
    return 'bg-[#199F2F]'; // Зеленый
  };

  const getDescription = (value: number) => {
    if (value === 0) return '';
    if (value <= 1) return 'Слабый';
    if (value <= 2) return 'Ниже среднего';
    if (value <= 3) return 'Средний';
    if (value <= 4) return 'Сильный';
    return 'Превосходный';
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const dataForDB = {
          guideId,
          item: {
            singleTarget: itemState.singleTarget,
            multiTarget: itemState.multiTarget,
            utility: itemState.utility,
            survivability: itemState.survivability,
            mobility: itemState.mobility,
          },
        };

        const result = await updateDifficulty(dataForDB);
        if (result.success) {
          toast.success('Данные успешно сохранены!');
          console.log('Успешно сохранено:', result.data);
        } else {
          toast.error('Ошибка при сохранении данных');
          console.error('Ошибка при сохранении:', result.error);
        }
      } catch (error) {
        toast.error('Ошибка при сохранении данных');
        console.error('Ошибка при сохранении данных:', error);
      }
    });
  };

  return {
    ratings,
    hasChanges,
    isPending,
    handleRatingClick,
    getActiveColor,
    getDescription,
    handleSave,
  };
};
