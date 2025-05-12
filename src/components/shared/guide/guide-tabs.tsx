import { Card, CardContent } from "@root/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@root/components/ui/tabs-list";

interface TabData {
  value: string;
  label: string;
  iconUrl: string;
  content: string;
}

interface GuideTabsProps {
  tabs: TabData[];
  defaultTab?: string;
}

export const GuideTabs = ({ tabs, defaultTab }: GuideTabsProps) => {
  const defaultValue = defaultTab || tabs[0]?.value || "";

  return (
    <Tabs defaultValue={defaultValue} className="">
      <TabsList className="grid justify-start grid-flow-col">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <span className="text-[16px]">
              <div
                className="bg-[position:50%] bg-[size:1.2em_auto] border border-t-gray-300 border-r-gray-600 border-b-gray-700 border-l-gray-600 rounded-[0.2em] box-content inline-block h-4 w-4 m-[0_.2em_-.2em]"
                style={{ backgroundImage: `url('${tab.iconUrl}')` }}
              />
              <span className="text-amber-400 font-medium">{tab.label}</span>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Card>
            <CardContent className="space-y-2">
              <div className="space-y-1">{tab.content}</div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
