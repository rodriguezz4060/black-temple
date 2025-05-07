import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TabData {
  value: string;
  label: string;
  iconUrl: string;
  content: string;
}

interface HeroTalentsProps {
  initialTabs: TabData[];
  defaultTab?: string;
  editable?: boolean;
}

export const HeroTalents = ({ initialTabs, defaultTab }: HeroTalentsProps) => {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(
    defaultTab || initialTabs[0]?.value || ""
  );

  const addNewTab = () => {
    const newTabNumber = tabs.length + 1;
    const newTab: TabData = {
      value: `newTab${newTabNumber}`,
      label: `New Tab ${newTabNumber}`,
      iconUrl:
        "https://assets-ng.maxroll.gg/wow/icons/sprites/default-icon.webp",
      content: "Edit this content...",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.value);
  };

  const updateTabContent = (value: string, newContent: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.value === value ? { ...tab, content: newContent } : tab
      )
    );
  };

  return (
    <div className="space-y-4 ">
      <Button variant="outline" size="sm" onClick={addNewTab} className="h-8">
        <Plus className="h-4 w-4" />
      </Button>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center gap-2">
          <ScrollArea type="always" className="max-w-full whitespace-nowrap  ">
            <div className="flex w-max pb-3">
              <TabsList className={cn()}>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn("cursor-pointer ")}
                  >
                    <span className="text-[16px]">
                      <div
                        className="bg-[position:50%] bg-[size:1.2em_auto] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 rounded-[0.2em] box-content inline-block h-4 w-4 m-[0_.2em_-.2em]"
                        style={{ backgroundImage: `url('${tab.iconUrl}')` }}
                      />
                      <span className="text-amber-400 font-medium">
                        {tab.label}
                      </span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" className={cn("p-[3px]")} />
          </ScrollArea>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            <Card className="rounded-none border-none bg-[#171717]">
              <CardContent className="space-y-2 ">
                <textarea
                  className="w-full min-h-[200px] p-2 border rounded"
                  value={tab.content}
                  onChange={(e) => updateTabContent(tab.value, e.target.value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
