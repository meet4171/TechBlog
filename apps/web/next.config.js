/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['images.pexels.com'],
    unoptimized: true

  },
};

module.exports = nextConfig;
