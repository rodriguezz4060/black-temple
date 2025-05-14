import { GuideButtonWithRelations } from "@root/@types/prisma";
import Image from "next/image";
import Link from "next/link";

interface GuideButtonProps {
  guides: GuideButtonWithRelations[];
}

export default function GuideButton({ guides }: GuideButtonProps) {
  console.log(guides);
  return (
    <>
      <div className="flex-1 pb-20 ml-4 mr-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Первая карточка */}
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="group relative overflow-hidden rounded-lg border-2"
            >
              <Link href={`/class-guides/${guide.id}`} className="block h-full">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage: `url(${guide.modeRelation.activityBg})`,
                  }}
                />

                {/* Flex container for image and content */}
                <div className="relative flex h-38">
                  {/* Image wrapper */}
                  <div className="w-1/3 overflow-hidden">
                    <Image
                      src={guide.specialization.specBackground}
                      alt={`${guide.class.name} ${guide.specialization.name} ${guide.modeRelation.name}`}
                      className="object-cover"
                      style={{
                        height: "100%",
                        maxWidth: "none",
                        width: "auto",
                        maskImage:
                          "linear-gradient(90deg, rgb(255, 255, 255) 25%, transparent 75%)",
                      }}
                      width={300}
                      height={300}
                    />
                  </div>

                  {/* Content */}
                  <div className="w-2/3 p-4 flex flex-col justify-between z-10">
                    <div className="flex items-start gap-3">
                      <Image
                        src={guide.specialization?.specIcon || ""}
                        width={40}
                        height={40}
                        alt="Havoc Demon Hunter"
                        className="border border-dark-500 rounded-lg"
                      />

                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          <span className="text-purple-500">
                            {guide.class.name} {guide.specialization.name}
                          </span>
                          <span className="block text-gray-300 text-sm">
                            {guide.modeRelation.name} Guide
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        {guide.patch}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src={guide.modeRelation.activityIcon}
                          width={16}
                          height={16}
                          alt={guide.modeRelation.name}
                          className="mr-1"
                        />
                        {guide.modeRelation.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src={guide.specialization!.specRole.roleIcon}
                          width={16}
                          height={16}
                          alt={guide.specialization!.specRole.name}
                          className="mr-1"
                        />
                        {guide.specialization!.specRole.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
