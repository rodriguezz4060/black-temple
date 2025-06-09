import { SectionType } from '@prisma/client';

export const sectionTypeTranslations: Record<SectionType, string> = {
  HERO_TALENTS: 'Героические таланты',
  TALENTS: 'Таланты',
  ROTATION: 'Ротация',
  DEEP_DIVE: 'Подробный разбор',
  GEAR: 'Экипировка',
  STAT_PRIORITY: 'Приоритеты характеристик',
  MACROS: 'Макросы',
  WEAK_AURAS: 'WeakAuras',
  ADDONS: 'Аддоны',
  CONSUMABLES: 'Расходуемые предметы',
  DUNGEONS: 'Подземелья',
};
