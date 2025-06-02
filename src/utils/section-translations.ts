import { SectionType } from '@prisma/client';

export const sectionTypeTranslations: Record<SectionType, string> = {
  HERO_TALENTS: 'Героические таланты',
  TALENTS: 'Таланты',
  ROTATION_SINGLE_TARGET: 'Ротация для одной цели',
  ROTATION_AOE_DUNGEON: 'Ротация для АоЕ в подземельях',
  GEAR: 'Экипировка',
  ENCHANTS: 'Чары',
  CONSUMABLES: 'Расходуемые предметы',
};
