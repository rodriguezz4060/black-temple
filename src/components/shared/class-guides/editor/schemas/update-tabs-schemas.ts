import { z } from 'zod';

export const updateTabsSchema = z.object({
  tabs: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      iconUrl: z.string().nullable(),
      content: z.string(),
      sectionId: z.number(),
    })
  ),
  sectionId: z.number(),
});

export type TUpdateTabsSchemas = z.infer<typeof updateTabsSchema>;
