"use server";

import {
  Banner,
  Container,
  DifficultyBar,
  Gear,
  GuideTitle,
  LeftSideBar,
} from "@root/components/shared";
import { cn } from "@root/lib/utils";
import { Facebook, Link as LinkIcon, Twitter } from "lucide-react";
import { Button } from "@root/components/ui/button";
import { GuideTabs } from "@root/components/shared/";
import { Title } from "@root/components/ui/title";

export default function Home() {
  return (
    <>
      <Container className="secondary dark:bg-[#0f0f0f] px-4 pb-10 max-w-[1250px]">
        <div className="post-page flex h-max flex-col justify-center lg:flex-row pt-10">
          
              <GuideTitle
                anchorId="overview-header"
                title="Overview"
                patch="Patch 11.1.5 - Nightfall"
              />

              <div className="gap-x-2.5 gap-y-5 flex flex-wrap lg:flex-nowrap">
                <div className="md:flex-1 md:grow-[1] w-full grow-[1]">
                  <div className="w-full contain-inline-size flex gap-4">
                    <Banner />
                    <DifficultyBar
                      spec={{
                        icon: "/assets/havoc/dh-havoc.png",
                        name: "Havoc DH",
                        gameMode: "Mythic+",
                      }}
                      ratings={[
                        { label: "Single-Target", value: 4, max: 5 },
                        { label: "AoE", value: 2, max: 5 },
                        { label: "Utility", value: 5, max: 5 },
                        { label: "Survivability", value: 1, max: 5 },
                        { label: "Mobility", value: 3, max: 5 },
                      ]}
                    />
                  </div>
                </div>
                <Gear />
              </div>

              <GuideTitle
                anchorId="hero-talents-header"
                title="Hero Talents"
                patch="Patch 11.1.5 - Nightfall"
              />

              <GuideTabs tabs={tabsData} defaultTab="AR" />

              <GuideTitle
                anchorId="talents-header"
                title="Talents"
                patch="Patch 11.1.5 - Nightfall"
              />
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
