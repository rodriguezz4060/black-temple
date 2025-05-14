import {
  ClassSelection,
  ClassSpecialization,
  Guide,
  HeroTalents,
  Prisma,
  Tab,
} from "@prisma/client";

export type GuideProps = Guide & {
  heroTalents: (HeroTalents & { tabs: Tab[] }) | null;
};

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

export type GuideButtonWithRelations = Prisma.GuideGetPayload<{
  include: {
    class: true;
    specialization: {
      include: {
        specRole: true;
      };
    };
    modeRelation: true;
  };
}>;
