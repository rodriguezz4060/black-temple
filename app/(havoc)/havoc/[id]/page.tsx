import { Container } from "@/components/shared";
import { CreateGuide } from "@/components/shared/guide/editor/create-guide";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const guide = await prisma.guide.findFirst({
    where: { id: Number(id) },
    include: {
      heroTalents: {
        include: {
          tabs: true,
        },
      },
    },
  });

  if (!guide) {
    return notFound();
  }

  return (
    <>
      <Container className="secondary dark:bg-zinc-900 px-4 pb-10">
        <CreateGuide guide={guide} />
      </Container>
    </>
  );
}
