import { z } from 'zod';

export const updateTabsSchemas = z.object({
  tabs: z.array(
    z.object({
      id: z.number().optional(),
      value: z.string(),
      label: z
        .string()
        .min(2, 'Название слишком короткое')
        .max(25, 'Название слишком длинное'),
      iconUrl: z.string().optional().nullable(),
      content: z.string().min(1, 'Контент не может быть пустым'),
      heroTalentsId: z.number(),
    })
  ),
  guideId: z.number(),
});

export type TUpdateTabsSchemas = z.infer<typeof updateTabsSchemas>;
