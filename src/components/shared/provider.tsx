'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ThemeProvider = dynamic(
  () => import('./theme-provider').then(mod => mod.ThemeProvider),
  {
    ssr: false,
  }
);

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
          },
        },
      })
  );
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
};
