/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  // Required for AWS Amplify deployment
  output: 'standalone',
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Disable image optimization in production for Amplify compatibility
  experimental: {
    // Enable if you need server actions
    serverActions: true,
  },
};

export default nextConfig;
