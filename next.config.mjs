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
// Audited against the actual app, not assumed: no analytics/trackers, no
// third-party scripts, no iframes, no remote image domains, no <form>
// anywhere in the codebase, and every next/image source is local. That's
// what makes most of this list able to go to 'none'/'self' — a site that
// actually called out to other origins would need a wider policy, not a
// copy-pasted strict one.
//
// script-src and style-src keep 'unsafe-inline': Next's App Router inlines
// its own hydration payload on every page (no nonce plumbing exists here,
// which would require opting the whole site out of static prerendering via
// middleware), and this codebase uses inline `style={{transitionDelay}}`
// props plus a few component-scoped `<style>` keyframe blocks throughout.
// Removing 'unsafe-inline' with neither a nonce nor a hash allowlist would
// break hydration and every scoped animation, which is the "blindly added
// a CSP that breaks the app" failure mode. There is no live injection point
// for it to actually protect against today (confirmed above), so it's a
// defense-in-depth trade-off, not a current gap.
//
// connect-src is 'self' only — there is no client-side fetch to another
// origin yet. If a future feature calls out to e.g. api.github.com, this
// line is where that origin gets added, deliberately, not widened blindly.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  // includeSubDomains without `preload`: preload is a near-irreversible,
  // separate opt-in (submitting the domain to the browser-shipped HSTS
  // list at hstspreload.org) — worth doing, but as a deliberate follow-up,
  // not a side effect of adding this header.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

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
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
