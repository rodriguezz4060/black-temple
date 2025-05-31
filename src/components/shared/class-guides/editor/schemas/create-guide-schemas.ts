import { z } from 'zod';

export const createGuideSchemas = z.object({
  classId: z
    .number({ invalid_type_error: 'classId должен быть числом' })
    .int({ message: 'classId должен быть целым числом' })
    .positive({ message: 'classId должен быть положительным' }),
  specializationId: z
    .number({ invalid_type_error: 'specializationId должен быть числом' })
    .int({ message: 'specializationId должен быть целым числом' })
    .positive({ message: 'specializationId должен быть положительным' }),
  modeId: z
    .number({ invalid_type_error: 'modeId должен быть числом' })
    .int({ message: 'modeId должен быть целым числом' })
    .positive({ message: 'modeId должен быть положительным' }),
  expansionId: z
    .number({ invalid_type_error: 'expansionId должен быть числом' })
    .int({ message: 'expansionId должен быть целым числом' })
    .positive({ message: 'expansionId должен быть положительным' }),
  userId: z
    .number({ invalid_type_error: 'userId должен быть числом' })
    .int({ message: 'userId должен быть целым числом' })
    .positive({ message: 'userId должен быть положительным' }),
  title: z.string().nullable(),
  slug: z.string().optional(),
});

export type TCreateGuideSchemas = z.infer<typeof createGuideSchemas>;
