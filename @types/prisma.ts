import {
  ClassSelection,
  ClassSpecialization,
  Guide,
  HeroTalents,
  Tab,
} from "@prisma/client";

export type GuideProps = Guide & {
  heroTalents: (HeroTalents & { tabs: Tab[] }) | null;
};

export type ClassChoice = ClassSelection & {
  specializations: ClassSpecialization[];
};

export type TabData = {
  value: string;
  label: string;
  iconUrl: string;
  content: string;
  heroTalentsId: number;
};
