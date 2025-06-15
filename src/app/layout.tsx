import { Header } from '@root/components/shared';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@root/components/shared/provider';
import NextTopLoader from 'nextjs-toploader';
import WowheadInitializer from '@root/components/shared/wrapper/wowhead-initializer';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://black-temple.vercel.app';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Black Temple - Гайды по World of Warcraft',
  description:
    'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
  keywords: [
    'World of Warcraft',
    'WoW гайды',
    'рейды',
    'мифик+',
    'классы WoW',
    'гайды по WoW',
    'Black Temple',
  ],
  openGraph: {
    title: 'Black Temple - Гайды по World of Warcraft',
    description:
      'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
    url: baseUrl,
    siteName: 'Black Temple',
    images: [
      {
        url: `${baseUrl}/assets/meta/main-page.png`,
        width: 1200,
        height: 630,
        alt: 'Black Temple - Гайды по World of Warcraft',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Temple - Гайды по World of Warcraft',
    description:
      'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
    images: [`${baseUrl}/assets/meta/main-page.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          property='og:title'
          content='Black Temple - Гайды по World of Warcraft'
        />
        <meta
          property='og:description'
          content='Гайды по World of Warcraft: рейды, мифик+, классы и специализации.'
        />
        <meta
          property='og:image'
          content={`${baseUrl}/assets/meta/main-page.png`}
        />
        <meta property='og:url' content={baseUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Black Temple' />
        <Script id='wowhead-tooltips-config' strategy='beforeInteractive'>
          {`const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`}
        </Script>

        <Script
          src='https://wow.zamimg.com/js/tooltips.js'
          strategy='afterInteractive'
          async
        />
        <link data-rh='true' rel='icon' href='/favicon.png' />
      </head>
      <body className={nunito.className}>
        <main className='min-h-screen'>
          <Providers>
            <Header />
            <NextTopLoader />
            <WowheadInitializer />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
