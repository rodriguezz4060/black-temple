import { z } from 'zod';

export const addSocialLinkSchema = z.object({
  battleTag: z.string().optional(),
  discord: z.string().optional(),
  discordServer: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на Discord сервер',
      }
    )
    .optional(),
  twitch: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на Twitch',
      }
    )
    .optional(),
  youtube: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на YouTube',
      }
    )
    .optional(),
  website: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на сайт',
      }
    )
    .optional(),
  telegram: z.string().optional(),
  twitter: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на Twitter',
      }
    )
    .optional(),
  patreon: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на Patreon',
      }
    )
    .optional(),
  boosty: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(
      val => val === undefined || z.string().url().safeParse(val).success,
      {
        message: 'Некорректная ссылка на Boosty',
      }
    )
    .optional(),
});

export type TAddSocialLinkSchema = z.infer<typeof addSocialLinkSchema>;
