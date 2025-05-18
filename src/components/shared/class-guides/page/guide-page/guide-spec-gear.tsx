import Image from 'next/image';

interface GuideSpecGearProps {
  gearBanner: string;
}

export const GuideSpecGear = ({ gearBanner }: GuideSpecGearProps) => {
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
                      src={gearBanner}
                      alt='DH Havoc spec icon'
                      width={340}
                      height={500}
                      className=''
                    />
                  </div>
                  {/*Left Column*/}
                  <div className='absolute top-2.5 left-2.5 flex flex-col gap-1.5'>
                    {/*Head*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:0em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_raiddemonhuntergoblin_d_01.jpg')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Fel-Dealer&apos;s Visor
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-0.5'>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/348538.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Neck*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:-1em] text-[48px]">
                      <div className="icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[url('https://wow.zamimg.com/images/wow/icons/large/inv_11_0_ventureco_necklace01_color4.jpg')] bg-[size:100%] bg-[position:50%] bg-no-repeat">
                        <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                          <div className='text-multi-shadow h-[2.4em] leading-[1.2em]'>
                            <span className='text-[#a335ee]'>
                              Undermine Merc&apos;s Dog Tags
                            </span>
                          </div>
                          <div className='flex flex-row items-center gap-0.5'>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                            <div className="h-[1em] w-[1em] cursor-pointer border-[2px] bg-[url('https://assets-ng.maxroll.gg/wow/icons/5931403.webp')] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]"></div>
                          </div>
                        </div>
                      </div>
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
