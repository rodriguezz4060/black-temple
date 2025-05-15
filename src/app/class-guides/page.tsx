import { ClassGuidesPage, Container } from "@root/components/shared";
import { prisma } from "@prisma/prisma-client";

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

  const modeFilter = await prisma.mode.findMany({});
  const specFilter = await prisma.classSpecialization.findMany({
    include: {
      class: true,
      specRole: true,
    },
  });

  return (
    <Container>
      <ClassGuidesPage
        guides={guides}
        specFilter={specFilter}
        modeFilter={modeFilter}
      />
    </Container>
  );
}
