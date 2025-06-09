import { z } from 'zod';

export const talentSchemas = z.object({
  importString: z.string(),
});

export type TTalentSchemas = z.infer<typeof talentSchemas>;
