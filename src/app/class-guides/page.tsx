import { Container } from '@root/components/shared';
import GuideButton from '@root/components/shared/guide-button';
import CreateGuideModal from '@root/components/shared/guide/create-guide/create-guide-modal';
import { GuideData } from './_actions/create-guide';
import { prisma } from '@prisma/prisma-client';

export default async function Page() {
  const guides = await prisma.guide.findMany({
    include: {
      class: true,
      specialization: {
        include: {
          specRole: true,
        },
      },
      modeRelation: true,
    },
  });

  const initialData = await GuideData();

  return (
    <Container className='dark:bg-zinc-900'>
      <CreateGuideModal initialData={initialData} />
      {guides.length === 0 ? (
        <p>Гайды пока не созданы. Нажмите кнопку, чтобы добавить новый гайд.</p>
      ) : (
        <GuideButton guides={guides} />
      )}
    </Container>
  );
}
