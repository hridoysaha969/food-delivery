/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable or disable strict mode as needed
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during the build
  },
};

export default nextConfig;
