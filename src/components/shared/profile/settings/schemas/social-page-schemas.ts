import { z } from 'zod';

export const addSocialLinkSchema = z.object({
  battleTag: z.string().optional(),
  discord: z.string().optional(),
  twitch: z.string().optional(),
  youtube: z.string().optional(),
  website: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  patreon: z.string().optional(),
  boosty: z.string().optional(),
});

export type TAddSocialLinkSchema = z.infer<typeof addSocialLinkSchema>;
