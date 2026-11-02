/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace package shipped as TypeScript source
  transpilePackages: ['@runner/shared'],
};

export default nextConfig;
