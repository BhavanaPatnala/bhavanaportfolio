import Link from 'next/link';
import { Suspense } from 'react';
import { site } from '@/data/site';
import BuildLog from '@/components/ui/BuildLog';

const values = ['Engineering', 'Curiosity', 'AI', 'Attention to detail'];

export default function SiteFooter() {
  return (
    <footer className="border-t border-glass-border bg-void-sunken">
      <div className="shell py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pb-12">
          <p className="text-d3 text-bone">Build something intelligent.</p>
          <Link
            href="/#contact"
            data-cursor="link"
            className="tap link-underline font-mono text-micro uppercase tracking-[0.14em] text-signature hover:text-bone"
          >
            Invite Bhavana →
          </Link>
        </div>
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-4">
            <p className="font-mono text-meta uppercase tracking-[0.18em] text-bone">Bhavana&nbsp;P</p>
            <p className="mt-2 text-small text-bone-3">{site.role}</p>
          </div>

          <div className="md:col-span-4">
            <p className="label text-bone-4">Built with</p>
            <ul className="mt-3 space-y-1">
              {values.map((item) => (
                <li key={item} className="text-small text-bone-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 md:text-right">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="tap link-underline font-mono text-micro uppercase tracking-[0.14em] text-bone-3 hover:text-bone"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="tap link-underline font-mono text-micro uppercase tracking-[0.14em] text-bone-3 hover:text-bone"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/resume"
                  data-cursor="link"
                  className="tap link-underline font-mono text-micro uppercase tracking-[0.14em] text-bone-3 hover:text-bone"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-glass-border pt-5">
          <p className="label text-bone-4">
            Next.js · React Three Fiber · TypeScript · Tailwind · Geist · No analytics, no trackers
          </p>
          <p className="label metric text-bone-4">© {new Date().getFullYear()}</p>
        </div>

        <div className="mt-4">
          <Suspense fallback={null}>
            <BuildLog />
          </Suspense>
        </div>
      </div>
    </footer>
  );
}
