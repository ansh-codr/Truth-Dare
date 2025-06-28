/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true 
  },
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: '',
  basePath: '',
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure all dynamic routes are properly handled
  generateBuildId: async () => {
    return 'truth-dare-game-build'
  },
};

module.exports = nextConfig;