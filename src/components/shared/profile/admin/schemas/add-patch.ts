import { z } from 'zod';

export const addPatchWowSchema = z.object({
  name: z.string().min(1, 'Название аддона обязательно'),
  patchName: z.string().min(1, 'Название патча обязательно'),
  patchVersion: z
    .string()
    .min(1, 'Версия патча обязательна')
    .regex(
      /^\d+\.\d+(\.\d+)?$/,
      'Неверный формат версии патча (пример: 11.1 или 11.1.5)'
    ),
});

export type TAddPatchWowSchema = z.infer<typeof addPatchWowSchema>;
