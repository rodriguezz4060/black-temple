import Image from "next/image";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export const LeftSideBar = () => {
  return (
    <>
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
    </>
  );
};
