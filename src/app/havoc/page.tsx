"use client";

import { Container } from "@root/components/shared";
import GuideButton from "@root/components/shared/guide-button";
import CreateGuideModal from "@root/components/shared/guide/create-guide/create-guide-modal";

export default function HavocPage() {
  return (
    <>
      <Container className="dark:bg-zinc-900">
        <CreateGuideModal />
        <GuideButton />
      </Container>
    </>
  );
}
