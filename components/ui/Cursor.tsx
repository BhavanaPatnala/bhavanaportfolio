'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'idle' | 'link' | 'view' | 'open' | 'explore';

const LABELS: Record<Mode, string> = {
  idle: '',
  link: '',
  view: 'View',
  open: 'Open',
  explore: 'Explore',
};

/**
 * A trailing satellite, not a cursor replacement — the native pointer stays
 * visible. Desktop + fine pointer + motion-allowed only; never mounted
 * otherwise, so it can never interfere with touch input.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, shown: false, raf: 0 });

  useEffect(() => {
    const ok =
      window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const s = state.current;

    const onMove = (e: MouseEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (!s.shown) {
        s.x = e.clientX;
        s.y = e.clientY;
        s.shown = true;
        el.style.opacity = '1';
      }
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      const next = (target?.getAttribute('data-cursor') as Mode) ?? 'idle';
      setMode((prev) => (prev === next ? prev : next));
    };
    const onLeave = () => {
      s.shown = false;
      el.style.opacity = '0';
    };
    const tick = () => {
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      s.raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    s.raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(s.raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = LABELS[mode];
  const active = mode !== 'idle';

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-300 mix-blend-difference">
      <div
        className={[
          'flex items-center justify-center rounded-full border border-[#8a877f] font-mono text-[10px] uppercase tracking-[0.14em] text-[#F1EFE9]',
          'transition-[width,height,opacity,background-color] duration-300 ease-out',
          label ? 'h-[64px] w-[64px] bg-[#F1EFE9]/10' : active ? 'h-4 w-4' : 'h-7 w-7',
        ].join(' ')}
        style={{ transform: 'translate(calc(-50% + 16px), calc(-50% + 16px))' }}
      >
        {label}
      </div>
    </div>
  );
}
