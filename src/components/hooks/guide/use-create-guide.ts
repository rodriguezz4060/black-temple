'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createGuideAction } from '@root/app/class-guides/_actions/create-guide';

export function useCreateGuide() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [selectedExpansion, setSelectedExpansion] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !selectedClass ||
      !selectedSpec ||
      !selectedMode ||
      !selectedExpansion
    ) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('classId', `${selectedClass}`);
    formData.append('specializationId', `${selectedSpec}`);
    formData.append('modeId', `${selectedMode}`);
    formData.append('expansionId', `${selectedExpansion}`);

    // Поле title уже включено в formData, если пользователь его заполнил
    // Если title пустой, сервер обработает его как null

    try {
      const result = await createGuideAction(formData);
      if (result.success && result.guide) {
        toast.success('Гайд успешно создан!');
        console.log('Созданный slug:', result.guide.slug);
        router.push(`/class-guides/${result.guide.slug}`);
      } else {
        toast.error('Не удалось создать гайд');
      }
    } catch (error) {
      toast.error('Произошла ошибка при создании гайда');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedClass(null);
    setSelectedSpec(null);
    setSelectedMode(null);
    setSelectedExpansion(null);
  };

  return {
    selectedClass,
    selectedSpec,
    selectedMode,
    selectedExpansion,
    isLoading,
    setSelectedClass,
    setSelectedSpec,
    setSelectedMode,
    setSelectedExpansion,
    handleSubmit,
    resetSelection,
  };
}
