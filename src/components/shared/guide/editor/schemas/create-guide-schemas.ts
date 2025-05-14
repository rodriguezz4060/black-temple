import { z } from "zod";

export const createGuideSchemas = z.object({
  classId: z
    .number({ invalid_type_error: "classId должен быть числом" })
    .int({ message: "classId должен быть целым числом" })
    .positive({ message: "classId должен быть положительным" }),
  specializationId: z
    .number({ invalid_type_error: "specializationId должен быть числом" })
    .int({ message: "specializationId должен быть целым числом" })
    .positive({ message: "specializationId должен быть положительным" }),
  modeId: z
    .number({ invalid_type_error: "modeId должен быть числом" })
    .int({ message: "modeId должен быть целым числом" })
    .positive({ message: "modeId должен быть положительным" }),
  patch: z
    .string({ invalid_type_error: "patch должен быть строкой" })
    .min(1, { message: "patch не может быть пустым" })
    .regex(/^\d+\.\d+\.\d+$/, { message: "patch должен быть в формате X.Y.Z" }),
});

export type TCreateGuideSchemas = z.infer<typeof createGuideSchemas>;
