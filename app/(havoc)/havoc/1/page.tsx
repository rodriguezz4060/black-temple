"use client";

import { Container, Title } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Facebook, Link as LinkIcon, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
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
          <aside className="container sticky top-5 z-10 -mx-5 -mt-9 flex w-[calc(100%_+_40px)] shrink-0 flex-col self-start px-5 md:mx-0 md:w-full md:p-0 lg:mt-0 lg:block lg:h-auto lg:w-[228px] lg:bg-none lg:pr-4 origin-top-right ">
            {/*Author*/}

            <div className="flex flex-col gap-3 ">
              <div className="hidden lg:block relative justify-between gap-5 lg:flex-col lg:justify-start border-dark-5 dark:bg-[#171717] rounded-lg border">
                <div className="flex justify-between gap-5 px-3 pt-4 pb-3 lg:flex-col lg:justify-start">
                  <div className="flex gap-[10px]">
                    <div className="z-[1] flex h-[52px] w-[52px] shrink-0 grow-0 items-center justify-center overflow-hidden border-dark-4 rounded-full border-4">
                      <Image
                        src="https://cdn.discordapp.com/avatars/211007313476059136/bd48de04e1469782f73723661e7e74c1.webp"
                        alt="rodriga"
                        className="max-w-none h-full w-full"
                        width={52}
                        height={52}
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="flex flex-col items-start gap-[2px]">
                        <span className="text-grey-1 font-sans text-sm font-light leading-none">
                          Author
                        </span>
                        <span className="font-sans text-base font-bold leading-none">
                          Rodriga
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/*Anchor full screen*/}
              <div className="flex max-h-[calc(100vh-120px)] flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-lg lg:border-dark-5 lg:dark:bg-[#171717] lg:border lg:pt-3">
                    <h2 className="hidden px-3 font-sans text-sm font-semibold uppercase lg:block">
                      Table of Contents
                    </h2>
                    <div className="hidden max-h-[calc(100vh_-_260px)] flex-col gap-0 overflow-y-auto lg:flex pb-2">
                      <a
                        href="#overview-header"
                        className="bg-blue-500 dark:hover:text-white text-white flex-[1_0] hover:text-[#95989B] flex min-h-[38px] items-center px-3 py-2 leading-tight "
                      >
                        <div className="flex items-start gap-1">
                          <span>1.</span>
                          <span>Overview</span>
                        </div>
                      </a>
                      <a
                        href="#hero-talents-header"
                        className="dark:text-[#95989B] dark:hover:text-white hover:text-[#95989B] flex-[1_0] flex min-h-[38px] items-center px-3 py-2 leading-tight border-dark-5 border-t"
                      >
                        <div className="flex items-start gap-1">
                          <span>2.</span>
                          <span>Hero Talents</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile/Tablet Select (visible on small screens) */}
          <div className="sticky top-0 pt-2 pb-2 z-10 lg:hidden bg-white dark:bg-[#0f0f0f] w-screen -mx-4 px-4">
            <Select>
              <SelectTrigger size="xs" className="w-full">
                <SelectValue placeholder="Table of Contents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">
                  <div className="flex items-center gap-1">
                    <a
                      href="#overview-header"
                      className="dark:text-[#95989B] dark:hover:text-white hover:text-[#95989B] "
                    >
                      <span>1.</span>
                      <span>Overview</span>
                    </a>
                  </div>
                </SelectItem>
                <SelectItem value="hero-talents">
                  <div className="flex items-center gap-1">
                    <a
                      href="#hero-talents-header"
                      className="dark:text-[#95989B] dark:hover:text-white hover:text-[#95989B] "
                    >
                      <span>2.</span>
                      <span>Hero Talents</span>
                    </a>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

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
              <div className="clear-both m-0 p-0 h-10"></div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="overview-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-0.5">
                <div className="items-center flex justify-between flex-wrap gap-5 font-medium leading-[1.25]">
                  <div className="items-center flex flex-wrap gap-5">
                    <h2
                      className="text-xl font-bold uppercase text-blue-500"
                      id="hero-talents-header"
                    >
                      Overview
                    </h2>
                  </div>
                  <span className="text-[#95989B]">
                    Patch 11.1.5 - Nightfall
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#95989B] leading-[1.25]">
                    Havoc Demon Hunter
                  </span>
                  <span className="flex-[1] h-[1px] block bg-[#2B2C2C]"></span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
