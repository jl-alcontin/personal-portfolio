/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  // Optimize bundle size
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  }
};

module.exports = nextConfig;