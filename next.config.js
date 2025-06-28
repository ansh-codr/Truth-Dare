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
  experimental: {
    esmExternals: false,
  },
  // Ensure proper static generation
  generateEtags: false,
  poweredByHeader: false,
};

module.exports = nextConfig;