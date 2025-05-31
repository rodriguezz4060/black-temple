import type { Metadata } from 'next';

// Задаем metadataBase для формирования абсолютных URL
const metadataBase = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000');

export const metadata: Metadata = {
  metadataBase,
  title: 'Гайды по классам WoW | Актуальные сборки и ротации',
  description:
    'Полные руководства по всем классам World of Warcraft: билды, ротации, таланты, экипировка и советы для PvE и PvP. Актуальные гайды для текущего патча.',
  keywords: [
    'WoW гайды',
    'World of Warcraft классы',
    'PvE гайды WoW',
    'PvP гайды WoW',
    'ротации WoW',
    'таланты WoW',
    'билды WoW',
    'DPS гайды',
    'танк гайды',
    'хил гайды',
  ],
  openGraph: {
    title: 'Полные гайды по классам World of Warcraft',
    description:
      'Сборники лучших билдов, ротаций и советов для всех классов WoW',
    url: '/class-guides',
    siteName: 'WoW Guides',
    images: [
      {
        url: '/assets/class-guide.png',
        width: 1200,
        height: 630,
        alt: 'Гайды по классам WoW',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гайды по классам WoW',
    description: 'Актуальные руководства для всех классов World of Warcraft',
    images: ['/assets/class-guide.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/class-guides',
  },
};

export default function ClassGuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
