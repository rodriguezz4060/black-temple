import Image from "next/image";

export const Banner = () => {
  return (
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
  );
};
