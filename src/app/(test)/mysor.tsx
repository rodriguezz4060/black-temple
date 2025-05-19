neckName    String?
    neckImg     String?
    neckLink    String?
    neckSocket1 String?
    neckSocket2 String?

    shouldersImg  String?
    shouldersLink String?

    backImg     String?
    backLink    String?
    backEnchant String?

    chestImg     String?
    chestLink    String?
    chestEnchant String?

    wristImg     String?
    wristLink    String?
    wristSocket1 String?
    wristEnchant String?

    handsImg     String?
    handsLink    String?
    handsEnchant String?

    waistImg     String?
    waistLink    String?
    waistSocket1 String?

    legsImg     String?
    legsLink    String?
    legsEnchant String?

    feetImg     String?
    feetLink    String?
    feetEnchant String?

    fingerOneImg     String?
    fingerOneLink1   String?
    fingerOneSocket1 String?
    fingerOneSocket2 String?
    fingerOneSocket3 String?
    fingerOneEnchant String?

    fingerTwoImg     String?
    fingerTwoLink    String?
    fingerTwoSocket1 String?
    fingerTwoSocket2 String?
    fingerTwoSocket3 String?
    fingerTwoEnchant String?

    trinketOneImg  String?
    trinketOneLink String?

    trinketTwoImg  String?
    trinketTwoLink String?

    mainHandImg     String?
    mainHandLink    String?
    mainHandEnchant String?

    offHandImg     String?
    offHandLink    String?
    offHandEnchant String?


    'use client';
import { Button } from '@root/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@root/components/ui/dialog';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { TooltipWrapper } from '@root/components/shared/wrapper';
import ItemFetcher from '@root/components/shared/blizzard/item-fetcher';
import { useState } from 'react';
import Link from 'next/link';

interface GearItem {
  name: string;
  icon: string;
  gearUrl: string;
}

export const BisGearEditor = () => {
  const [gear, setGear] = useState<{ [key: string]: GearItem }>({
    head: {
      name: "Fel-Dealer's Visor",
      icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_raiddemonhuntergoblin_d_01.jpg',
      gearUrl: '#',
    },
  });
  // Функция для обновления предмета в слоте
  const handleItemUpdate = (slot: string, item: GearItem) => {
    setGear(prev => ({
      ...prev,
      [slot]: item,
    }));
  };
  return (
    <div className='w-full grow-[1] md:flex-1 md:grow-[1]'>
      <figure className='embed relative mx-auto table text-center'>
        <div className='flex w-full origin-[top]! flex-col p-0'>
          <div className='h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin]'>
            <div className='inline-block'>
              <div className='m-0 box-border border-0 p-0 [vertical-align:initial] text-inherit [text-decoration:none]'>
                <div className='relative h-[500px] w-[340px]'>
                  <div className='absolute inset-0 grayscale-50'>
                    <Image
                      src='/assets/havoc/dh-havoc-cover.png'
                      alt='DH Havoc spec icon'
                      width={340}
                      height={500}
                      className=''
                    />
                  </div>
                  {/*Left Column*/}
                  <div className='absolute top-2.5 left-2.5 flex flex-col gap-1.5'>
                    {/* Head */}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:0em] text-[48px]">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className='group'>
                            <div className='absolute -top-1 -right-1 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                              <Pencil className='h-4 w-4 rounded-full bg-black p-[3px] shadow-sm' />
                            </div>
                            <TooltipWrapper content='Редактировать'>
                              <div
                                className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'
                                style={{
                                  backgroundImage: `url(${gear.head.icon})`,
                                }}
                              >
                                <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                                  <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                                    <span className='line-clamp-2 text-[#a335ee]'>
                                      {gear.head.name}
                                    </span>
                                  </div>
                                  <div className='flex flex-row items-center gap-0.5'>
                                    <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/348538.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                                  </div>
                                </div>
                              </div>
                            </TooltipWrapper>
                          </div>
                        </DialogTrigger>
                        <DialogContent
                          className='sm:max-w-[425px]'
                          aria-describedby={undefined}
                        >
                          <DialogHeader>
                            <DialogTitle>Шлем</DialogTitle>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <Link href={gear.head.gearUrl} passHref>
                              <div
                                className='rounded border p-2'
                                onClick={e => e.preventDefault()}
                              >
                                <div className='relative cursor-pointer text-[48px]'>
                                  <div
                                    className='h-[1em] w-[1em] bg-[size:100%]'
                                    style={{
                                      backgroundImage: `url(${gear.head.icon})`,
                                    }}
                                  >
                                    <div className='absolute -top-[1px] left-[52px] w-[206px] cursor-default text-left text-[12px] font-bold'>
                                      <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                                        <span className='text-[#a335ee]'>
                                          {gear.head.name}
                                        </span>
                                      </div>
                                      <div className='flex flex-row items-center gap-0.5'>
                                        <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/348538.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>

                            <ItemFetcher
                              onItemFetched={item =>
                                handleItemUpdate('head', item)
                              }
                            />
                          </div>
                          <DialogFooter>
                            <Button type='submit' form='item-fetcher-form'>
                              Сохранить
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/*Shoulder*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-2em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_leather_raiddemonhuntergoblin_d_01.jpg')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Fel-Dealer&apos;s Recycled Reavers
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*back*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-14em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5359648.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Chef Chewie&apos;s Towel
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-0.5'>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Chest*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-4em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/6009145.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Fel-Dealer&apos;s Soul Engine
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-0.5'>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*rybashka*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-3em] text-[48px]">
                      <div className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'></div>
                    </div>
                    {/*nakidka*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-18em] text-[48px]">
                      <div className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'></div>
                    </div>
                    {/*Wrist*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-8em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Rune-Branded Armbands
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-0.5'>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/463531.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Right Column*/}
                  <div className='absolute top-2.5 right-2.5 flex flex-col gap-1.5'>
                    {/*Hand*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-9em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'></div>
                      </div>
                    </div>
                    {/*Belt*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-5em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                    {/*Legs*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-6em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>

                    {/*feet*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-7em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                    {/*finger 1*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-11em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                    {/*finger 2*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-11em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5648238.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                    {/*trinket 1*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-12em] text-[48px]">
                      <div className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'></div>
                      </div>
                    </div>
                    {/*trinket 2*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-13em] text-[48px]">
                      <div className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Rune-Branded Armbands
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'></div>
                      </div>
                    </div>
                  </div>
                  {/*Middle*/}
                  <div className='absolute bottom-2.5 left-[50%] flex translate-x-[-50%] flex-row gap-1.5'>
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-15em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/6214305.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 right-[52px] w-[106px] cursor-default text-right text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Capo&apos;s Molten Knuckles
                          </span>
                        </div>
                        <div className='flex flex-row-reverse items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-16em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5524353.webp')] bg-[size:100%] bg-[position:50%] bg-no-repeat"></div>
                      <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                        <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                          <span className='text-[#a335ee]'>
                            Everforged Warglaive
                          </span>
                        </div>
                        <div className='flex items-center gap-0.5'>
                          <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <figcaption className='font-title my-2 text-center text-sm'>
          <strong className='text-[#a330c9]'>Havoc Demon Hunter</strong> Mythic+
          Best in Slot
        </figcaption>
      </figure>
    </div>
  );
};
