import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '10.5.0.2',
        port: '8000',
        pathname: '/media/**',
      },
      // Add production domain here later
    ],
  },
};

export default nextConfig;
