import { Guide, HeroTalents, Tab } from "@prisma/client";

export type GuideProps = Guide & {
  heroTalents: (HeroTalents & { tabs: Tab[] }) | null;
};

export type TabData = Tab & {};
