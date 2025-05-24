'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const ThemeProvider = dynamic(
  () => import('./theme-provider').then(mod => mod.ThemeProvider),
  {
    ssr: false,
  }
);

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
};
