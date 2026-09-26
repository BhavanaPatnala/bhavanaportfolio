'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks how far the browser has scrolled through a section, as a ref
 * (0 before it enters, 1 once it has fully passed) rather than React state.
 * R3F's useFrame reads this every frame without ever triggering a
 * component re-render on scroll — the whole point of a scroll-driven scene
 * is that scrolling must not re-render React at 60fps.
 *
 * For a plain (non-sticky) element's transit across the viewport.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      progress.current = Math.min(1, Math.max(0, traveled / total));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/**
 * For a `position: sticky` scrollytelling section: a tall outer element
 * (`min-height` several viewports) containing a `sticky top-0 h-[100svh]`
 * inner wrapper. Progress is 0 exactly when the sticky content starts
 * pinning (the outer element's top reaches the viewport top) and 1 exactly
 * when it stops (the outer element's bottom reaches the viewport bottom) —
 * the actual pinned window, not the section's full enter-to-exit transit,
 * which is a different (and, for this layout, wrong) span.
 */
export function useStickyScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const pinnedRange = rect.height - vh;
      if (pinnedRange <= 0) {
        progress.current = 0;
        return;
      }
      progress.current = Math.min(1, Math.max(0, -rect.top / pinnedRange));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
