"use client";

import { Container, GuideTitle, LeftSideBar } from "@/components/shared";
import { TabsEditor } from "@/components/shared/guide/editor/tabs-editor";

export default function Home() {
  return (
    <>
      <Container className="secondary dark:bg-[#0f0f0f] px-4 pb-10 max-w-[1250px]">
        <div className="post-page flex h-max flex-col justify-center lg:flex-row pt-10">
          <LeftSideBar />

          {/* Main Content */}
          <div className="flex w-full flex-col flex-1 pt-2 lg:w-[815px] lg:pt-0 xl:mx-auto">
            <article className="mt-2">
              <GuideTitle
                anchorId="hero-talents-header"
                title="Hero Talents"
                patch="Patch 11.1.5 - Nightfall"
              />

              <TabsEditor
                initialTabs={[
                  {
                    value: "tab1",
                    label: "‍Aldrachi Reaver M+ Build",
                    iconUrl:
                      "https://assets-ng.maxroll.gg/wow/icons/sprites/27132.webp",
                    content: "Content for tab 1",
                  },
                ]}
                defaultTab="tab1"
              />
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
