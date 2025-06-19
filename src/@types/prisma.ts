import {
  ClassSelection,
  ClassSpecialization,
  Expansion,
  Prisma,
} from '@prisma/client';

export type GuidePageProps = Prisma.GuideGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        fullName: true;
        avatar: true;
      };
    };
    class: true;
    specialization: true;
    modeRelation: true;
    expansion: true;
    overviewDifficulty: true;
    overviewGears: {
      include: {
        itemSockets: true;
      };
    };
    sections: {
      include: {
        tabGroups: {
          include: {
            tabs: true;
          };
        };
        textFields: true;
      };
    };
  };
}>;

export type InitialClassSelection = ClassSelection & {
  specializations: ClassSpecialization[];
};

export type TabGroupProps = Prisma.TabGroupGetPayload<{
  include: {
    tabs: true;
  };
}>;

export type ClassFilter = Prisma.ClassSpecializationGetPayload<{
  select: {
    id: true;
    name: true;
    specIcon: true;
    specBackground: true;
    class: { select: { name: true; classColor: true; classIcon: true } };
    specRole: { select: { name: true; roleIcon: true } };
  };
}>;

// Тип который я использую в class-guides
export type GuideButtonWithRelations = Prisma.GuideGetPayload<{
  select: {
    id: true;
    slug: true;
    user: {
      select: {
        fullName: true;
      };
    };
    class: {
      select: {
        name: true;
        classColor: true;
        classIcon: true;
      };
    };
    specialization: {
      select: {
        name: true;
        specIcon: true;
        specBackground: true;
        specRole: {
          select: {
            name: true;
            roleIcon: true;
          };
        };
      };
    };
    modeRelation: {
      select: {
        name: true;
        activityIcon: true;
        activityBg: true;
      };
    };
    expansion: {
      select: {
        name: true;
        patchName: true;
        patchVersion: true;
      };
    };
  };
}>;

export type GearItem = Prisma.OverviewGearGetPayload<{
  include: {
    itemSockets: true;
  };
}>;

export interface GuideSpecGearProps {
  guideId: number;
  gearBanner: string;
  characterClass: string;
  classColor: string;
  gameMode: string;
  spec: string;
  gearData: GearItem[];
}

export type ExpansionProps = Expansion & {};

export interface Ability {
  id: string;
  url: string;
  spellId?: string; // Извлекается из URL
  type?: 'spell' | 'item'; // Извлекается из URL
  isPtr?: boolean; // Извлекается из URL
  isPrepull: boolean; // Может быть в JSON
  order: number; // Присутствует в JSON
  verticalRowId?: string | null; // Присутствует в JSON
}

export interface VerticalRow {
  id: string;
  positionAfter?: string;
  order?: number;
  abilities: Ability[];
}

export interface TabData {
  id?: number;
  value: string;
  label: string;
  iconUrl: string | null;
  content: string;
  importString: string;
  tabGroupId: number;
  isNew?: boolean;
  rotationId?: number | null;
  rotation?: {
    id: number;
    abilities: Ability[];
    verticalRows: VerticalRow[];
  } | null;
}
