import { Container } from "@root/components/shared";
import GuideButton from "@root/components/shared/guide-button";
import CreateGuideModal from "@root/components/shared/guide/create-guide/create-guide-modal";
import { GuideData } from "./_actions/create-guide";

export default async function Page() {
  const initialData = await GuideData();
  return (
    <>
      <Container className="dark:bg-zinc-900">
        <CreateGuideModal initialData={initialData} />
        <GuideButton />
      </Container>
    </>
  );
}
