import { useCallback } from 'react';
import { Ability, VerticalRow } from '@root/@types/prisma';
import { saveRotation } from '@root/app/class-guides/_actions/rotation/save-rotation';

export const useSaveRotation = (
  tabId: number,
  rotationId: number | null,
  abilities: Ability[],
  verticalRows: VerticalRow[],
  setError: (error: string | null) => void
) => {
  const save = useCallback(async () => {
    try {
      // Вызываем серверный экшен
      const result = await saveRotation({
        tabId,
        rotationId,
        abilities,
        verticalRows,
      });

      if (!result.success) {
        throw new Error(result.message || 'Ошибка при сохранении');
      }

      setError(null);
      return result.rotationId; // Возвращаем ID ротации для обновления состояния
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Не удалось сохранить ротацию';
      setError(errorMessage);
      console.error('Ошибка сохранения:', error);
      return null;
    }
  }, [tabId, rotationId, abilities, verticalRows, setError]);

  return save;
};
