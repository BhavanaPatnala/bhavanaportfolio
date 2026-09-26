'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const MAX_MS = 1800;

/**
 * A short, skippable preloader — never a blocking "Loading 27%" bar. A
 * small line-drawing of the same architectural core assembles itself while
 * the page's own assets settle, then the site is revealed. Any key, click,
 * or reduced-motion preference skips straight through.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => setDone(true), MAX_MS);
    const onDismiss = () => setDone(true);
    window.addEventListener('keydown', onDismiss);
    window.addEventListener('pointerdown', onDismiss);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onDismiss);
      window.removeEventListener('pointerdown', onDismiss);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setSkip(true), 500);
    return () => window.clearTimeout(t);
  }, [done]);

  if (skip) return null;

  return (
    <div
      aria-hidden={done}
      role="status"
      aria-label="Loading"
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-void transition-opacity duration-500',
        done ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
    >
      <svg viewBox="0 0 200 200" className="h-24 w-24 text-bone" fill="none">
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <path
            d="M100 30 L165 68 L165 132 L100 170 L35 132 L35 68 Z"
            strokeDasharray="440"
            strokeDashoffset="440"
            style={{ animation: 'draw 1.1s var(--ease-cinematic, ease) forwards' }}
          />
          <path
            d="M100 30 L100 170 M35 68 L165 132 M165 68 L35 132"
            strokeOpacity="0.5"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{ animation: 'draw 1.1s var(--ease-cinematic, ease) 0.3s forwards' }}
          />
        </g>
        <circle cx="100" cy="100" r="3" fill="#E07A4C" opacity="0" style={{ animation: 'fade-in-dot 0.4s ease 1.1s forwards' }} />
      </svg>

      <div className="text-center">
        <p className="font-mono text-meta uppercase tracking-[0.2em] text-bone">Bhavana P</p>
        <p className="mt-2 font-mono text-micro uppercase tracking-[0.24em] text-bone-3">
          System initializing
        </p>
      </div>

      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes fade-in-dot { to { opacity: 1; } }
      `}</style>
    </div>
  );
}
