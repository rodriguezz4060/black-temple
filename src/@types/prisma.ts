import { classSelection } from "./../../prisma/constants";
import {
  ClassSelection,
  ClassSpecialization,
  Guide,
  HeroTalents,
  Prisma,
  SpecRole,
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

export type ClassFilter = Prisma.ClassSpecializationGetPayload<{
  include: {
    class: true;
    specRole: true;
  };
}>;

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
