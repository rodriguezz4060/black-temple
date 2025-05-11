import { Container } from "@/components/shared";
import { Title } from "@/components/ui/title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container className="secondary dark:bg-zinc-900 px-4 pb-10">
        <Title text="Black Temple" size="lg" className="font-extrabold pt-4" />
      </Container>

      <Container className="dark:bg-zinc-900 ">
        <div className="flex-1 pb-20">
          <Link href="/havoc">Истребление</Link>
        </div>
      </Container>
    </>
  );
}
