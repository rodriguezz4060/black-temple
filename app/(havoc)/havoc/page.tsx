import { Container, Title } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container className="secondary dark:bg-zinc-900 px-4 pb-10">
        <Title text="Истребление" size="lg" className="font-extrabold pt-4" />
      </Container>

      <Container className="dark:bg-zinc-900">
        <div className="flex-1 pb-20 ml-4 mr-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* Первая карточка */}
            <article className="group relative overflow-hidden rounded-lg border-2">
              <Link href="/#" className="block h-full">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage:
                      "url(https://assets-ng.maxroll.gg/images/wow/build-guides/activity-bkgs/mythic-plus-activity-bg-wow.webp)",
                  }}
                />

                {/* Flex container for image and content */}
                <div className="relative flex h-38">
                  {/* Image wrapper */}
                  <div className="w-1/3 overflow-hidden">
                    <Image
                      src="https://assets-ng.maxroll.gg/wordpress/dh-havoc-spec-background.webp"
                      alt="Havoc Demon Hunter Mythic+ Guide"
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
                        src="https://assets-ng.maxroll.gg/images/wow/build-guides/class-icons/demon-hunter-havoc-class-icon.webp"
                        width={40}
                        height={40}
                        alt="Havoc Demon Hunter"
                        className="border border-dark-500 rounded-lg"
                      />

                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          <span className="text-purple-500">
                            Havoc Demon Hunter
                          </span>
                          <span className="block text-gray-300 text-sm">
                            Mythic+ Guide
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        11.1.5 Nightfall
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src="https://assets-ng.maxroll.gg/images/wow/build-guides/activity-icons/mythic-plus-activity-icon.webp"
                          width={16}
                          height={16}
                          alt="Mythic+"
                          className="mr-1"
                        />
                        Mythic+
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src="https://assets-ng.maxroll.gg/images/wow/build-guides/role-icons/role-icon-dps.webp"
                          width={16}
                          height={16}
                          alt="DPS"
                          className="mr-1"
                        />
                        DPS
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* Вторая карточка */}
            <article className="group relative overflow-hidden rounded-lg border-2">
              <Link href="/#" className="block h-full">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage:
                      "url(https://assets-ng.maxroll.gg/images/wow/build-guides/activity-bkgs/raid-activity-bg-wow.webp)",
                  }}
                />

                {/* Flex container for image and content */}
                <div className="relative flex h-38">
                  {/* Image wrapper */}
                  <div className="w-1/3 overflow-hidden">
                    <Image
                      src="https://assets-ng.maxroll.gg/wordpress/dh-havoc-spec-background.webp"
                      alt="Havoc Demon Hunter Mythic+ Guide"
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
                        src="https://assets-ng.maxroll.gg/images/wow/build-guides/class-icons/demon-hunter-havoc-class-icon.webp"
                        width={40}
                        height={40}
                        alt="Havoc Demon Hunter"
                        className="border border-dark-500 rounded-lg"
                      />

                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          <span className="text-purple-500">
                            Havoc Demon Hunter
                          </span>
                          <span className="block text-gray-300 text-sm">
                            Mythic+ Guide
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        11.1.5 Nightfall
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src="https://assets-ng.maxroll.gg/images/wow/build-guides/activity-icons/mythic-plus-activity-icon.webp"
                          width={16}
                          height={16}
                          alt="Mythic+"
                          className="mr-1"
                        />
                        Mythic+
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">
                        <Image
                          src="https://assets-ng.maxroll.gg/images/wow/build-guides/role-icons/role-icon-dps.webp"
                          width={16}
                          height={16}
                          alt="DPS"
                          className="mr-1"
                        />
                        DPS
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
