import { GuidePageProps, GuideProps } from '@root/@types/prisma';
import { TabsEditor } from './tabs-editor';
import { Container } from '@root/components/shared/container';
import { BisGearEditor } from './bis-gear-editor';

interface GuideEditorProps {
  guide: GuidePageProps;
  className?: string;
}

export const GuideEditor: React.FC<GuideEditorProps> = ({ guide }) => {
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
        <BisGearEditor
          overviewGear={guide.overviewGear}
          gearCover={guide.specialization.gearBanner}
          spec={guide.specialization.name}
          characterClass={guide.class.name}
          classColor={guide.class.classColor}
          gameMode={guide.modeRelation.name}
        />
        {/* <TabsEditor
          initialTabs={tabsData}
          defaultTab='tab1'
          guideId={guide.id}
        /> */}
      </Container>
    </div>
  );
};
