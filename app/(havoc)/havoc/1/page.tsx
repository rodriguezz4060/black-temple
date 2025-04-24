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

              <div className="gap-x-2.5 gap-y-5 flex flex-wrap lg:flex-nowrap">
                <div className="md:flex-1 md:grow-[1] w-full grow-[1]">
                  <div className="w-full contain-inline-size flex gap-4">
                    <div className="border rounded-[12px_12px_12px_120px] relative flex items-center justify-center overflow-hidden flex-[0_0_104px] w-[104px] h-[414px]">
                      <Image
                        width={106}
                        height={414}
                        alt="Havoc"
                        className="w-auto max-w-none h-full brightness-80"
                        src="/assets/havoc/dh-havoc-difficulty-bar-banner.png"
                      />
                      <Image
                        width={60}
                        height={60}
                        alt="WoW"
                        className="absolute bottom-[14%] w-[48px] h-[48px]"
                        src="https://assets-ng.maxroll.gg/images/game-logos/wow-retail-icon-v3.webp"
                      />
                    </div>

                    {/*Difficulty Bar*/}
                    <div className="relative flex-1 max-w-[360px] border rounded-[12px]">
                      <div className="absolute w-full h-full rounded-[12px]"></div>
                      <div className="flex flex-col p-[24px_32px] gap-5 ">
                        <div className="flex h-16 items-center">
                          <div className="flex">
                            <Image
                              src="/assets/havoc/dh-havoc.png"
                              alt="DH Havoc spec icon"
                              width={40}
                              height={40}
                              className="w-11"
                            />
                          </div>
                          <span className="z-1 text-[16px] uppercase">
                            <span className="flex flex-col gap-0 pl-2.5">
                              <span className="text-[#A330C9] font-bold ">
                                Havoc DH
                              </span>
                              <span className="text-[#95989B] font-sans text-sm normal-case">
                                Mythic+
                              </span>
                            </span>
                          </span>
                        </div>

                        <div className="flex gap-1 flex-col">
                          <div className=" gap-1 flex-col">
                            <span className="text-[13px] font-bold leading-none uppercase">
                              Single-Target
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#2B2C2C] flex-1 h-2 rounded-[4px]"></div>
                            </div>
                            <span className="text-[13px] leading-none text-[#95989B]">
                              Strong
                            </span>
                          </div>
                          <div className=" gap-1 flex-col">
                            <span className="text-[13px] font-bold leading-none uppercase">
                              AoE
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#2B2C2C] flex-1 h-2 rounded-[4px]"></div>
                            </div>
                            <span className="text-[13px] leading-none text-[#95989B]">
                              Strong
                            </span>
                          </div>
                          <div className=" gap-1 flex-col">
                            <span className="text-[13px] font-bold leading-none uppercase">
                              Utility
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                            </div>
                            <span className="text-[13px] leading-none text-[#95989B]">
                              Excellent
                            </span>
                          </div>
                          <div className=" gap-1 flex-col">
                            <span className="text-[13px] font-bold leading-none uppercase">
                              Survivability
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#199F2F] flex-1 h-2 rounded-[4px]"></div>
                            </div>
                            <span className="text-[13px] leading-none text-[#95989B]">
                              Excellent
                            </span>
                          </div>
                          <div className=" gap-1 flex-col">
                            <span className="text-[13px] font-bold leading-none uppercase">
                              Mobility
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#F09A18] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#F09A18] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#F09A18] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#2B2C2C] flex-1 h-2 rounded-[4px]"></div>
                              <div className="bg-[#2B2C2C] flex-1 h-2 rounded-[4px]"></div>
                            </div>
                            <span className="text-[13px] leading-none text-[#95989B]">
                              Average
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex-1 md:grow-[1] w-full grow-[1]">
                  <figure className="embed relative mx-auto table mx-auto text-center">
                    <div className="origin-[top]! w-full p-0 flex flex-col">
                      <div className="h-full overflow-x-auto overflow-y-hidden w-full [scrollbar-width:thin]">
                        <div className="inline-block">
                          <div className="border-0 box-border text-inherit m-0 p-0 [text-decoration:none] [vertical-align:initial]">
                            <div className="h-[500px] relative w-[340px]">
                              <div className="inset-0 absolute grayscale-50">
                                <Image
                                  src="/assets/havoc/dh-havoc-cover.png"
                                  alt="DH Havoc spec icon"
                                  width={340}
                                  height={500}
                                  className=""
                                />
                              </div>
                              {/*Left Column*/}
                              <div className="flex-col left-2.5 top-2.5 gap-1.5 flex absolute">
                                {/*Head*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:0em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_raiddemonhuntergoblin_d_01.jpg')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Fel-Dealer's Visor
                                        </span>
                                      </div>
                                      <div className="gap-0.5 items-center flex flex-row ">
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/348538.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*Neck*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-1em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_11_0_ventureco_necklace01_color4.jpg')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Undermine Merc's Dog Tags
                                        </span>
                                      </div>
                                      <div className="gap-0.5 items-center flex flex-row ">
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*Shoulder*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-2em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_leather_raiddemonhuntergoblin_d_01.jpg')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Fel-Dealer's Recycled Reavers
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*back*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-14em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5359648.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Chef Chewie's Towel
                                        </span>
                                      </div>
                                      <div className="gap-0.5 items-center flex flex-row ">
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*Chest*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-4em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/6009145.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Fel-Dealer's Soul Engine
                                        </span>
                                      </div>
                                      <div className="gap-0.5 items-center flex flex-row ">
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*rybashka*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-3em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className=" absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                </div>
                                {/*nakidka*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-18em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className=" absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                </div>
                                {/*Wrist*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-8em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after">
                                    <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                      <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                        <span className="text-[#a335ee]">
                                          Rune-Branded Armbands
                                        </span>
                                      </div>
                                      <div className="gap-0.5 items-center flex flex-row ">
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                        <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*Right Column*/}
                              <div className="flex-col right-2.5 top-2.5 gap-1.5 flex absolute ">
                                {/*Hand*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-9em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse "></div>
                                  </div>
                                </div>
                                {/*Belt*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-5em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                                {/*Legs*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-6em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>

                                {/*feet*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-7em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                                {/*finger 1*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-11em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                                {/*finger 2*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-11em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                                {/*trinket 1*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-12em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className=" absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse "></div>
                                  </div>
                                </div>
                                {/*trinket 2*/}
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-13em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className=" absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Rune-Branded Armbands
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse "></div>
                                  </div>
                                </div>
                              </div>
                              {/*Middle*/}
                              <div className="bottom-2.5 flex-row left-[50%] translate-x-[-50%] absolute flex gap-1.5">
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-15em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/6214305.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="right-[52px] cursor-default text-[12px] font-bold absolute text-right -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Capo's Molten Knuckles
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex flex-row-reverse ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-[url('/assets/slots.png')] bg-[position:-16em] bg-[size:auto_1em] cursor-pointer text-[48px] h-[1em] relative w-[1em]">
                                  <div className="bg-[url('https://assets-ng.maxroll.gg/wow/icons/5524353.webp')] absolute inset-0 bg-[size:100%] bg-[position:50%] bg-no-repeat inline-block h-[1em] w-[1em] m-[0_0.2em_-0.1em_0] icon-after"></div>
                                  <div className="left-[52px] cursor-default text-[12px] font-bold absolute text-left -top-0.5 w-[106px]">
                                    <div className="h-[2.4em] leading-[1.2em] text-multi-shadow">
                                      <span className="text-[#a335ee]">
                                        Everforged Warglaive
                                      </span>
                                    </div>
                                    <div className="gap-0.5 items-center flex  ">
                                      <div className="cursor-pointer bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[position:-2px_-2px] bg-[size:1em] text-[20px] h-[1em] w-[1em] border-[2px]"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <figcaption className="text-center my-2 font-title text-sm">
                      <strong className="text-[#a330c9] ">
                        Havoc Demon Hunter
                      </strong>{" "}
                      Mythic+ Best in Slot
                    </figcaption>
                  </figure>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
