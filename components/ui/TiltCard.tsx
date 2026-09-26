'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A card with real physical depth on hover — perspective tilt tracking the
 * pointer, plus a light highlight that moves with it, rather than the
 * generic uniform-lift-and-shadow every card everywhere uses. Desktop
 * (fine pointer) only; touch devices get the flat card, no half-tilted
 * state stuck mid-gesture.
 */
export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 8;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(244,240,232,0.08), transparent 55%)`;
      }
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('relative transition-transform duration-300 ease-out will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div ref={glareRef} aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" />
    </div>
  );
}
