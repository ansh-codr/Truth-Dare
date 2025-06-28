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
  experimental: {
    esmExternals: false,
  },
  // Generate static params for dynamic routes
  generateBuildId: async () => {
    return 'truth-dare-game'
  },
};

module.exports = nextConfig;