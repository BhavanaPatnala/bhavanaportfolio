import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { site } from '@/data/site';
import SiteNav from '@/components/navigation/SiteNav';
import SiteFooter from '@/components/navigation/SiteFooter';
import RevealProvider from '@/components/motion/RevealProvider';
import Cursor from '@/components/ui/Cursor';
import Preloader from '@/components/ui/Preloader';

const sans = localFont({
  src: [
    { path: './fonts/Geist-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Geist-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Geist-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-geist-sans',
  adjustFontFallback: 'Arial',
});

const mono = localFont({
  src: './fonts/GeistMono-Regular.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-geist-mono',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  keywords: [
    'Bhavana P',
    'Principal Software Engineer',
    'Angular Principal Software Engineer',
    'Frontend Architect',
    'Angular TypeScript Engineer',
    'Frontend Performance Engineering',
    'AI Product Engineering',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.summary,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0D0C0B',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  worksFor: { '@type': 'Organization', name: site.company },
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: ['Angular', 'TypeScript', 'Frontend architecture', 'Frontend performance engineering', 'AI-assisted developer tooling'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.name} — ${site.role}`,
  url: site.url,
  description: site.summary,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-bone focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase focus:text-void"
        >
          Skip to content
        </a>
        <Preloader />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealProvider />
        <Cursor />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}
