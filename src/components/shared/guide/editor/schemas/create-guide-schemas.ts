import { z } from "zod";

export const createGuideSchemas = z.object({
  spec: z.string().min(2, "Специализация слишком короткая").max(50),
  mode: z.string().min(2, "Режим слишком короткий").max(50),
  patch: z.string().max(20).optional(),
  title: z.string().max(100).optional(),
});

export type TCreateGuideSchemas = z.infer<typeof createGuideSchemas>;
