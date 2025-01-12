import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Leave empty for default ports
        pathname: "/**", // Match all paths
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "", // Leave empty for default ports
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
