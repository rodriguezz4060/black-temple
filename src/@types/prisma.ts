import {
  ClassSelection,
  ClassSpecialization,
  Guide,
  HeroTalents,
  Prisma,
  Tab,
} from '@prisma/client';

export type GuideProps = Guide & {
  heroTalents: (HeroTalents & { tabs: Tab[] }) | null;
};

export type GuidePageProps = Prisma.GuideGetPayload<{
  include: {
    class: true;
    specialization: true;
    modeRelation: true;
    overviewDifficulty: true;
    overviewGears: {
      include: {
        itemSockets: true;
      };
    };
    heroTalents: {
      include: {
        tabs: true;
      };
    };
  };
}>;

export type InitialClassSelection = ClassSelection & {
  specializations: ClassSpecialization[];
};

export type TabData = {
  value: string;
  label: string;
  iconUrl: string;
  content: string;
  heroTalentsId: number;
};

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
    patch: true;
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
