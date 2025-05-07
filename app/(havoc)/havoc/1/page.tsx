"use client";

import {
  Banner,
  Container,
  DifficultyBar,
  Gear,
  GuideTitle,
  LeftSideBar,
  Title,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import { Facebook, Link as LinkIcon, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GuideTabs } from "@/components/shared/";

export default function Home() {
  const tabsData = [
    {
      value: "AR",
      label: "Aldrachi Reaver",
      iconUrl: "https://assets-ng.maxroll.gg/wow/icons/sprites/27132.webp",
      content:
        "Art of the Glaive makes your Throw Glaive ability become Reaver's Glaive...",
    },
    {
      value: "FS",
      label: "Fel-Scarred",
      iconUrl: "https://assets-ng.maxroll.gg/wow/icons/sprites/27066.webp",
      content:
        "The Fel-Scarred talent tree is generally more passive than the Aldrachi Reaver...",
    },
    // Добавьте новые табы по необходимости
    {
      value: "NEW",
      label: "New Tab",
      iconUrl: "https://example.com/new-icon.webp",
      content: "This is content for new tab...",
    },
  ];

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // Логика копирования
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <Container className="secondary dark:bg-[#0f0f0f] px-4 pb-10 max-w-[1250px]">
        <div className="post-page flex h-max flex-col justify-center lg:flex-row pt-10">
          <LeftSideBar />

          {/* Main Content */}
          <div className="flex w-full flex-col flex-1 pt-2 lg:w-[815px] lg:pt-0 xl:mx-auto">
            <div className="origin-top container mt-0 flex w-full flex-1 flex-col gap-y-4">
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col gap-6">
                  <Title
                    text="Havoc Demon Hunter Mythic+ Guide"
                    size="sm"
                    className={cn(
                      "font-title mt-0 md:text-3xl lg:mt-[-4px] lg:text-5xl lg:leading-tight"
                    )}
                  />
                  <div className="text-grey-275 mb-4 flex flex-wrap gap-x-4 gap-y-2 font-sans text-lg font-semibold">
                    <span className="bg-[#057AF0] rounded-sm gap-6 h-9 pl-2.5 pr-2.5 flex items-center">
                      <span>11.1.5 - Nightfall</span>
                    </span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div>
                    <div className="mt-4 lg:w-[300px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-dark-5 mb-3 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div>
                <div className="text-grey-3 flex flex-col font-sans text-sm leading-tight md:text-base lg:text-lg">
                  <p className="flex flex-wrap items-center gap-2 whitespace-nowrap text-[#95989B]">
                    <span className="italic">Last Updated:</span>
                    <span className="italic">March 22, 2025</span>
                    <span className="flex items-center gap-2">
                      <span>|</span>
                      <a
                        href="#changelog-header"
                        className="inline cursor-pointer text-blue-500"
                      >
                        Changelog
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              {/*Social*/}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="bg-dark-4 border-dark-5 group flex items-center justify-center rounded-md border h-8 w-8 hover:bg-dark-3 transition-colors cursor-pointer"
                  title="Copy"
                >
                  <LinkIcon className="text-gray-400 w-5 h-5 group-hover:text-white transition-colors" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="bg-dark-4 border-dark-5 group flex items-center justify-center rounded-md border h-8 w-8 hover:bg-dark-3 transition-colors cursor-pointer"
                  title="Copy"
                >
                  <Twitter className="text-gray-400 w-5 h-5 group-hover:text-white transition-colors" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="bg-dark-4 border-dark-5 group flex items-center justify-center rounded-md border h-8 w-8 hover:bg-dark-3 transition-colors cursor-pointer"
                  title="Copy"
                >
                  <Facebook className="text-gray-400 w-5 h-5 group-hover:text-white transition-colors" />
                </Button>
              </div>
            </div>

            <article className="mt-2">
              <p>
                Welcome to the
                <strong>
                  <strong className="text-[#A330C9]">
                    {" "}
                    Havoc Demon Hunter{" "}
                  </strong>
                </strong>
                Mythic+ guide for the World of Warcraft patch 11.1.5! This guide
                covers everything you need to know to understand your character!
              </p>

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
