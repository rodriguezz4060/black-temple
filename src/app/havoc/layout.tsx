import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Главная",
  description: "",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
