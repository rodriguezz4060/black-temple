import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-ng.maxroll.gg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wow.zamimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'render.worldofwarcraft.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '.prisma/client': ['.prisma/client', 'node_modules/.prisma/client'],
      },
    },
  },
};
export default nextConfig;
