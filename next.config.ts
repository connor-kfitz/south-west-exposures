import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '9wlfj5sp6hz84cyh.public.blob.vercel-storage.com',
      }
    ]
  }
};

export default nextConfig;
