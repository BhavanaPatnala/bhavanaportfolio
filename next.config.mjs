/**
 * `next dev` and `next build`/`next start` both write to `.next/` by
 * default. Running a QA build while the dev server is also running against
 * the same directory corrupts the dev server's live module graph — its
 * client has chunk references that a concurrent `next build` just
 * overwrote or removed, so a client-side navigation 404s on the next chunk
 * fetch and the page loses its styles entirely. QA builds now write to a
 * separate `.next-qa/` (set `BUILD_TARGET=qa`) so the two can never collide.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: process.env.BUILD_TARGET === 'qa' ? '.next-qa' : '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/drei'],
  },
};

export default nextConfig;
