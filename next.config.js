/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
  env: { NEXT_PUBLIC_JSON_API_URL: process.env.NEXT_PUBLIC_JSON_API_URL },
};

module.exports = nextConfig;
