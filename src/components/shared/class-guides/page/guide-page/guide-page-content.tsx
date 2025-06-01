import {
  Container,
  GuideAnchorWrapper,
  LeftSideBar,
} from '@root/components/shared';
import { GuideTitle } from './guide-title';
import { GuideSpecBanner } from './guide-spec-banner';
import { GuideDifficultyBar } from './guide-difficulty-bar';
import { GuideSpecGear } from './guide-spec-gear';
import { GuidePageProps } from '@root/@types/prisma';

interface GuideProps {
  guide: GuidePageProps;
}

export const GuidePageContent = ({ guide }: GuideProps) => {
  return (
    <div>
      <Container className='secondary max-w-[1250px] px-4 pb-10'>
        <div className='post-page flex h-max flex-col justify-center pt-10 lg:flex-row'>
          <LeftSideBar guide={guide} />

          <div className='flex w-full flex-1 flex-col pt-2 lg:w-[815px] lg:pt-0 xl:mx-auto'>
            <GuideTitle
              characterClass={guide.class.name}
              classColor={guide.class.classColor}
              spec={guide.specialization.name}
              patch={guide.expansion.patchVersion}
              mode={guide.modeRelation.name}
              updateDate={guide.updatedAt.toISOString()}
            />
            <GuideAnchorWrapper
              anchorId='overview-header'
              title='Обзор'
              characterClass={guide.class.name}
              spec={guide.specialization.name}
              patch={guide.expansion.patchVersion}
            />

            <div className='flex flex-wrap gap-x-2.5 gap-y-5 lg:flex-nowrap'>
              <div className='w-full grow-[1] md:flex-1 md:grow-[1]'>
                <div className='flex w-full gap-4 contain-inline-size'>
                  <GuideSpecBanner
                    specBanner={guide.specialization.difficultyBarBanner}
                    spec={guide.specialization.name}
                  />
                  {guide.overviewDifficulty && (
                    <GuideDifficultyBar
                      guideId={guide.id}
                      icon={guide.specialization.specIcon}
                      spec={guide.specialization.name}
                      classColor={guide.class.classColor}
                      gameMode={guide.modeRelation.name}
                      item={guide.overviewDifficulty}
                    />
                  )}
                </div>
              </div>
              <GuideSpecGear
                guideId={guide.id}
                gearBanner={guide.specialization.gearBanner}
                characterClass={guide.class.name}
                classColor={guide.class.classColor}
                spec={guide.specialization.name}
                gameMode={guide.modeRelation.name}
                gearData={guide.overviewGears}
              />
            </div>
            <GuideAnchorWrapper
              anchorId='hero-talents-header'
              title='Героические таланты'
              characterClass={guide.class.name}
              spec={guide.specialization.name}
              patch={guide.expansion.patchVersion}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
