import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["assets-ng.maxroll.gg", "cdn.discordapp.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-ng.maxroll.gg",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
