import { z } from 'zod';

export const talentSchemas = z.object({
  content: z.string(),
});

export type TTalentSchemas = z.infer<typeof talentSchemas>;
