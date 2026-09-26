'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { nav, site } from '@/data/site';
import { cn } from '@/lib/cn';
import Mark from '@/components/ui/Mark';

/**
 * Floating navigation. Transparent over the hero, picks up a glass surface
 * once the visitor scrolls past it, and condenses in height at the same
 * moment — the two changes read as one gesture rather than two.
 */
export default function SiteNav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out',
        condensed ? 'py-3' : 'py-5',
      )}
    >
      <nav aria-label="Primary" className="shell">
        <div
          className={cn(
            'flex items-center justify-between gap-6 rounded-full px-5 transition-all duration-500 ease-out',
            condensed ? 'glass h-14' : 'h-16 border border-transparent bg-transparent',
          )}
        >
          <Link href="/" className="tap flex items-center gap-2.5" data-cursor="link">
            <span className="h-6 w-6 text-bone">
              <Mark />
            </span>
            <span className="font-mono text-meta uppercase tracking-[0.18em] text-bone">
              Bhavana&nbsp;P
            </span>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="link"
                  className="tap group flex items-baseline gap-1.5 font-mono text-micro uppercase tracking-[0.14em] text-bone-3 transition-colors hover:text-bone"
                >
                  <span className="text-bone-3 transition-colors group-hover:text-signature">{item.n}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/resume"
              data-cursor="link"
              className="tap hidden font-mono text-micro uppercase tracking-[0.14em] text-bone transition-colors hover:text-signature lg:inline"
            >
              Resume
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 block h-px w-5 bg-bone transition-all duration-300 ease-out',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-px w-5 bg-bone transition-all duration-300 ease-out',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          'glass mx-4 mt-2 origin-top rounded-2xl transition-[opacity,transform,visibility] duration-300 ease-out lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <ul className="divide-y divide-glass-border px-5 py-2">
          {[...nav, { n: '', label: 'Resume', href: '/resume' }].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 text-h2 text-bone"
              >
                {item.label}
                <span className="font-mono text-micro text-bone-3">{item.n}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 border-t border-glass-border px-5 py-4">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-micro uppercase tracking-[0.14em] text-bone-3">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-micro uppercase tracking-[0.14em] text-bone-3">
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
