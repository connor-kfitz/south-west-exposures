import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '9wlfj5sp6hz84cyh.public.blob.vercel-storage.com',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'swexposures.vercel.app',
          },
        ],
        destination: 'https://swexposures.com/:path*',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
