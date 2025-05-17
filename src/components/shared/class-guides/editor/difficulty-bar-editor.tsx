import { useState } from "react";
import Image from "next/image";

interface Rating {
  label: string;
  value: number;
  max: number;
}

interface RatingEditorProps {
  initialRatings?: Rating[];
  onRatingsChange?: (ratings: Rating[]) => void;
}

export const DifficultyBarEditor = ({
  initialRatings,
  onRatingsChange,
}: RatingEditorProps) => {
  const defaultRatings: Rating[] = [
    { label: "Single-Target", value: 0, max: 5 },
    { label: "AoE", value: 0, max: 5 },
    { label: "Utility", value: 0, max: 5 },
    { label: "Survivability", value: 0, max: 5 },
    { label: "Mobility", value: 0, max: 5 },
  ];

  const [ratings, setRatings] = useState<Rating[]>(
    initialRatings || defaultRatings
  );
  const [activeSpec, setActiveSpec] = useState<"havoc" | "veng">("havoc");
  const [activeMode, setActiveMode] = useState<"mplus" | "raid">("mplus");

  const handleRatingClick = (ratingIndex: number, newValue: number) => {
    const updatedRatings = ratings.map((rating, index) =>
      index === ratingIndex ? { ...rating, value: newValue } : rating
    );

    setRatings(updatedRatings);

    if (onRatingsChange) {
      onRatingsChange(updatedRatings);
    }
  };

  // Функция возвращает цвет для ВСЕХ активных блоков в зависимости от значения
  const getActiveColor = (value: number) => {
    if (value <= 1) return "bg-[#E05B5B]"; // Красный
    if (value <= 3) return "bg-[#F09A18]"; // Желтый
    return "bg-[#199F2F]"; // Зеленый
  };

  const getDescription = (value: number) => {
    if (value === 0) return "Not selected";
    if (value <= 1) return "Weak";
    if (value <= 2) return "Below Average";
    if (value <= 3) return "Average";
    if (value <= 4) return "Strong";
    return "Excellent";
  };

  const handleSpecClick = (spec: "havoc" | "veng") => {
    setActiveSpec(spec);
  };

  return (
    <div className="relative flex-1 max-w-[360px] border rounded-[12px] p-6">
      <div className="flex flex-col gap-5">
        {/* Spec Header */}
        <div className="flex h-16 items-center mb-4">
          <div className="flex gap-2">
            {/* Havoc DH Button */}
            <button
              onClick={() => handleSpecClick("havoc")}
              className={`transition-all cursor-pointer ${
                activeSpec === "havoc"
                  ? "border-2 border-[#199F2F]"
                  : "border-2 border-transparent filter grayscale hover:filter-none"
              }`}
            >
              <Image
                src="/assets/havoc/dh-havoc.png"
                alt="Havoc DH"
                width={40}
                height={40}
                className="w-11"
              />
            </button>

            {/* Vengeance DH Button */}
            <button
              onClick={() => handleSpecClick("veng")}
              className={`transition-all cursor-pointer ${
                activeSpec === "veng"
                  ? "border-2 border-[#199F2F]"
                  : "border-2 border-transparent filter grayscale hover:filter-none"
              }`}
            >
              <Image
                src="/assets/veng/dh-veng.png"
                alt="Vengeance DH"
                width={40}
                height={40}
                className="w-11"
              />
            </button>
          </div>

          <span className="z-1 text-[16px] uppercase">
            <span className="flex flex-col gap-0 pl-2.5">
              <span className="text-[#A330C9] font-bold">
                {activeSpec === "havoc" ? "Havoc DH" : "Vengeance DH"}
              </span>
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => setActiveMode("mplus")}
                  className={`text-sm px-2 py-1 rounded ${
                    activeMode === "mplus"
                      ? "bg-[#2B2C2C] text-white"
                      : "text-[#95989B] hover:bg-[#1E1E1E]"
                  }`}
                >
                  Mythic+
                </button>
                <button
                  onClick={() => setActiveMode("raid")}
                  className={`text-sm px-2 py-1 rounded ${
                    activeMode === "raid"
                      ? "bg-[#2B2C2C] text-white"
                      : "text-[#95989B] hover:bg-[#1E1E1E]"
                  }`}
                >
                  Raid
                </button>
              </div>
            </span>
          </span>
        </div>

        {ratings.map((rating, ratingIndex) => {
          // Определяем цвет для всех активных блоков этого рейтинга
          const activeColor =
            rating.value > 0 ? getActiveColor(rating.value) : "";

          return (
            <div key={ratingIndex} className="flex flex-col gap-1">
              <span className="text-[13px] font-bold uppercase">
                {rating.label}
              </span>

              <div className="flex items-center gap-1">
                {[...Array(rating.max)].map((_, i) => {
                  const value = i + 1;
                  const isActive = value <= rating.value;

                  return (
                    <div
                      key={i}
                      onClick={() => handleRatingClick(ratingIndex, value)}
                      className={`
                        flex-1 h-2 rounded-[4px] cursor-pointer transition-colors
                        ${isActive ? activeColor : "bg-[#2B2C2C]"}
                        hover:opacity-80
                      `}
                    />
                  );
                })}
              </div>

              <span className="text-[13px] text-[#95989B]">
                {getDescription(rating.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
