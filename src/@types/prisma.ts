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
    overviewGear: true;
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

export interface GearItem {
  slot: string;
  name: string;
  icon: string;
  gem?: string[];
  enchantments: string[];
}

export interface GuideSpecGearProps {
  gearBanner: string;
  characterClass: string;
  classColor: string;
  gameMode: string;
  spec: string;
  gearData: GearItem[];
}

// Интерфейсы для работы с бис листом
export interface Socket {
  id: string;
  img: string; // Ссылка на иконку сокета
  link: string; // Ссылка на Wowhead
}

export interface Enchant {
  id: string;
  icon: string; // Ссылка на иконку зачарования
  enchantUrl: string; // Ссылка на Wowhead
}

export interface ItemData {
  name?: string; // headName
  icon?: string; // headImg
  gearUrl?: string; // headLink
  sockets: Socket[]; // headSockets
  enchant: Enchant | null; // headEnchantImg, headEnchantUrl
}

export interface OverviewGear {
  id: number;
  headName?: string;
  headImg?: string;
  headLink?: string;
  headEnchantImg?: string;
  headEnchantUrl?: string;
  headSockets: { id: number; img?: string; link?: string }[];
}
