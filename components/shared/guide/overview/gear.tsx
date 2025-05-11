import Image from "next/image";

export const Gear = () => {
  return (
    <div className="md:flex-1 md:grow-[1] w-full grow-[1]">
      <figure className="embed relative mx-auto table text-center">
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
                              Fel-Dealer&apos;s Visor
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
                              Undermine Merc&apos;s Dog Tags
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
                              Fel-Dealer&apos;s Recycled Reavers
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
                              Chef Chewie&apos;s Towel
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
                              Fel-Dealer&apos;s Soul Engine
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
                            Capo&apos;s Molten Knuckles
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
          <strong className="text-[#a330c9] ">Havoc Demon Hunter</strong>{" "}
          Mythic+ Best in Slot
        </figcaption>
      </figure>
    </div>
  );
};
