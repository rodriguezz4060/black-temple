import { GuidePageProps, GuideProps } from '@root/@types/prisma';
import { TabsEditor } from './tabs-editor';
import { Container } from '@root/components/shared/container';
import { BisGearEditor } from './bis-gear-editor';

interface Props {
  guide: GuidePageProps;
  className?: string;
}

export const CreateGuide: React.FC<Props> = ({ guide }) => {
  // Преобразуем данные для компонента TabsEditor
  const tabsData =
    guide.heroTalents?.tabs.map(tab => ({
      id: tab.id,
      createdAt: tab.createdAt,
      updatedAt: tab.updatedAt,
      value: tab.value,
      label: tab.label,
      iconUrl: tab.iconUrl || '',
      content: tab.content,
      heroTalentsId: tab.heroTalentsId,
    })) || [];

  return (
    <div>
      <Container className='secondary max-w-[1250px] px-4 pb-10'>
        <BisGearEditor guideId={guide.id} overviewGear={guide.overviewGear} />
        {/* <TabsEditor
          initialTabs={tabsData}
          defaultTab='tab1'
          guideId={guide.id}
        /> */}
      </Container>
    </div>
  );
};
