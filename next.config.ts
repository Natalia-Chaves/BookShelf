/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // <== adiciona isso aqui
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
