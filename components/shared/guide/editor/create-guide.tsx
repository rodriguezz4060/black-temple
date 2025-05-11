import { GuideProps } from "@/@types/prisma";
import { TabsEditor } from "./tabs-editor";

interface Props {
  guide: GuideProps;
  className?: string;
}

export const CreateGuide: React.FC<Props> = ({ guide }) => {
  console.log(guide);

  // Преобразуем данные для компонента TabsEditor
  const tabsData =
    guide.heroTalents?.tabs.map((tab) => ({
      id: tab.id,
      createdAt: tab.createdAt,
      updatedAt: tab.updatedAt,
      value: tab.value,
      label: tab.label,
      iconUrl: tab.iconUrl || "",
      content: tab.content,
      heroTalentsId: tab.heroTalentsId,
    })) || [];

  return (
    <div>
      <TabsEditor initialTabs={tabsData} defaultTab="tab1" guideId={guide.id} />
    </div>
  );
};
