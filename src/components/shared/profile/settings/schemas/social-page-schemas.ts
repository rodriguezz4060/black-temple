import { z } from 'zod';

export const addSocialLinkSchema = z.object({
  battleTag: z.string().optional(),
  discord: z.string().optional(),
  discordServer: z
    .string()
    .url({ message: 'Некорректная ссылка на Discord сервер' })
    .optional(),
  twitch: z
    .string()
    .url({ message: 'Некорректная ссылка на Twitch' })
    .optional(),
  youtube: z
    .string()
    .url({ message: 'Некорректная ссылка на YouTube' })
    .optional(),
  website: z
    .string()
    .url({ message: 'Некорректная ссылка на сайт' })
    .optional(),
  telegram: z.string().optional(),
  twitter: z
    .string()
    .url({ message: 'Некорректная ссылка на Twitter' })
    .optional(),
  patreon: z
    .string()
    .url({ message: 'Некорректная ссылка на Patreon' })
    .optional(),
  boosty: z
    .string()
    .url({ message: 'Некорректная ссылка на Boosty' })
    .optional(),
});

export type TAddSocialLinkSchema = z.infer<typeof addSocialLinkSchema>;
