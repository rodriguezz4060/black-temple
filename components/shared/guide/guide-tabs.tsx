import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-list";

export const GuideTabs = () => {
  return (
    <Tabs defaultValue="AR" className="">
      <TabsList className="grid w-[400px] grid-cols-2">
        <TabsTrigger value="AR">
          <span className="text-[16px]">
            <div className="bg-[position:50%] bg-[size:1.2em_auto] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 rounded-[0.2em] box-content inline-block h-4 w-4 bg-[url('https://assets-ng.maxroll.gg/wow/icons/sprites/27132.webp')] m-[0_.2em_-.2em]" />
            <span className="text-amber-400 font-medium">Aldrachi Reaver</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="FS">
          <span className="text-[16px]">
            <div className="bg-[position:50%] bg-[size:1.2em_auto] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 rounded-[0.2em] box-content inline-block h-4 w-4 bg-[url('https://assets-ng.maxroll.gg/wow/icons/sprites/27066.webp')] m-[0_.2em_-.2em]" />
            <span className="text-amber-400 font-medium">Fel-Scarred</span>
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="AR">
        <Card>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              Art of the Glaive makes your ‍Throw Glaive ability become
              ‍Reaver's Glaive, an ability that is off global cooldown that
              allows you to to cast either one of two combinations of abilities
              to trigger a debuff on your current target and do additional
              damage Casting ‍Blade Dance or ‍Death Sweep after ‍Reaver's Glaive
              into ‍Chaos Strike or ‍Annihilation makes you current target take
              14% more damage by you for the next 20 seconds. Casting ‍Chaos
              Strike or ‍Annihilation first after throwing your ‍Reaver's Glaive
              will make your target take 4% more damage by you for the next 20
              seconds and make your next ‍Blade Dance or ‍Death Sweep do
              additional damage. Additional to that after casting one of these
              two combinations you will get the ‍Thrill of the Fight buff, which
              increases your attack speed and overall damage done by 20% for the
              next 10 seconds
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="FS">
        <Card>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              The ‍Fel-Scarred talent tree is generally more passive than the
              ‍Aldrachi Reaver talent tree, ‍Monster Rising it is a bit counter
              intuitive as on one hand, it enhances your abilities during
              ‍Metamorphosis turning ‍Eye Beam into ‍Abyssal Gaze, ‍Sigil of
              Flame into ‍Sigil of Doom and ‍Immolation Aura into ‍Consuming
              Fire making them look fancy on your bar. On the other hand however
              the tree has talents like ‍Monster Rising, ‍Burning Blades and
              ‍Enduring Torment that significantly increase your output out of
              ‍Metamorphosis. Generally I would highly recommend to play this
              talent tree as it almost does the same damage as ‍Aldrachi Reaver
              with way less effort, which allows you to focus on more important
              stuff than dealing damage. Make sure to use your ‍Sigil of Flame,
              ‍Immolation Aura and ‍Eye Beam before using ‍Metamorphosis as
              ‍Violent Transformation resets those abilities.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
