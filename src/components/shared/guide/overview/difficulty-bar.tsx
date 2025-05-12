import Image from "next/image";

interface DifficultyBarProps {
  spec: {
    icon: string;
    name: string;
    gameMode: string;
  };
  ratings: {
    label: string;
    value: number;
    max: number;
  }[];
}

export const DifficultyBar = ({ spec, ratings }: DifficultyBarProps) => {
  // Функция для определения цвета в зависимости от значения
  const getColorClass = (value: number) => {
    if (value <= 1) return "bg-[#E05B5B]"; // Красный
    if (value <= 3) return "bg-[#F09A18]"; // Желтый
    return "bg-[#199F2F]"; // Зеленый
  };

  // Функция для автоматического описания на основе значения
  const getDescription = (value: number) => {
    if (value <= 1) return "Weak";
    if (value <= 2) return "Below Average";
    if (value <= 3) return "Average";
    if (value <= 4) return "Strong";
    return "Excellent";
  };

  return (
    <div className="relative flex-1 max-w-[360px] border rounded-[12px]">
      <div className="absolute w-full h-full rounded-[12px]"></div>
      <div className="flex flex-col p-[24px_32px] gap-5">
        {/* Spec Header */}
        <div className="flex h-16 items-center">
          <div className="flex">
            <Image
              src={spec.icon}
              alt={`${spec.name} spec icon`}
              width={40}
              height={40}
              className="w-11"
            />
          </div>
          <span className="z-1 text-[16px] uppercase">
            <span className="flex flex-col gap-0 pl-2.5">
              <span className="text-[#A330C9] font-bold ">{spec.name}</span>
              <span className="text-[#95989B] font-sans text-sm normal-case">
                {spec.gameMode}
              </span>
            </span>
          </span>
        </div>

        {/* Ratings */}
        <div className="flex gap-1 flex-col">
          {ratings.map((rating, index) => (
            <div key={index} className="gap-1 flex-col">
              <span className="text-[13px] font-bold leading-none uppercase">
                {rating.label}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(rating.max)].map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      i < rating.value
                        ? getColorClass(rating.value)
                        : "bg-[#2B2C2C]"
                    } flex-1 h-2 rounded-[4px]`}
                  ></div>
                ))}
              </div>
              <span className="text-[13px] leading-none text-[#95989B]">
                {getDescription(rating.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
