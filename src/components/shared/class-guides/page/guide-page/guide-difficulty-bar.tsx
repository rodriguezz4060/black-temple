import Image from 'next/image';

interface DifficultyBarProps {
  icon: string;
  spec: string;
  classColor: string;
  gameMode: string;
  ratings: {
    label: string;
    value: number;
    max: number;
  }[];
}

export const GuideDifficultyBar = ({
  icon,
  spec,
  classColor,
  gameMode,
  ratings,
}: DifficultyBarProps) => {
  // Функция для определения цвета в зависимости от значения
  const getColorClass = (value: number) => {
    if (value <= 1) return 'bg-[#E05B5B]'; // Красный
    if (value <= 3) return 'bg-[#F09A18]'; // Желтый
    return 'bg-[#199F2F]'; // Зеленый
  };

  // Функция для автоматического описания на основе значения
  const getDescription = (value: number) => {
    if (value <= 1) return 'Слабый';
    if (value <= 2) return 'Ниже среднего';
    if (value <= 3) return 'Средний';
    if (value <= 4) return 'Сильный';
    return 'Превосходный';
  };

  return (
    <div className='relative max-w-[360px] flex-1 rounded-[12px] border'>
      <div className='absolute h-full w-full rounded-[12px]'></div>
      <div className='flex flex-col gap-5 p-[24px_32px]'>
        {/* Spec Header */}
        <div className='flex h-16 items-center'>
          <div className='flex'>
            <Image
              src={icon}
              alt={spec}
              width={40}
              height={40}
              className='w-11'
            />
          </div>
          <span className='z-1 text-[16px] uppercase'>
            <span className='flex flex-col gap-0 pl-2.5'>
              <span
                className='font-bold'
                style={{
                  color: `${classColor}`,
                }}
              >
                {spec}
              </span>
              <span className='font-sans text-sm text-[#95989B] normal-case'>
                {gameMode}
              </span>
            </span>
          </span>
        </div>

        {/* Ratings */}
        <div className='flex flex-col gap-1'>
          {ratings.map((rating, index) => (
            <div key={index} className='flex-col gap-1'>
              <span className='text-[13px] leading-none font-bold uppercase'>
                {rating.label}
              </span>
              <div className='flex items-center gap-1'>
                {[...Array(rating.max)].map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      i < rating.value
                        ? getColorClass(rating.value)
                        : 'bg-[#2B2C2C]'
                    } h-2 flex-1 rounded-[4px]`}
                  ></div>
                ))}
              </div>
              <span className='text-[13px] leading-none text-[#95989B]'>
                {getDescription(rating.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
