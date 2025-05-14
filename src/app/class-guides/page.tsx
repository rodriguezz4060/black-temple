import { Container } from "@root/components/shared";
import GuideButton from "@root/components/shared/guide-button";
import CreateGuideModal from "@root/components/shared/guide/create-guide/create-guide-modal";
import { GuideData } from "./_actions/create-guide";
import { prisma } from "@prisma/prisma-client";
import { notFound } from "next/navigation";

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

  if (!guides.length) {
    return notFound();
  }

  const initialData = await GuideData();
  return (
    <>
      <Container className="dark:bg-zinc-900">
        <CreateGuideModal initialData={initialData} />
        <GuideButton guides={guides} />
      </Container>
    </>
  );
}
