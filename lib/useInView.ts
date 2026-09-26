'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Whether an element is near the viewport, via IntersectionObserver rather
 * than a scroll listener — this drives each 3D scene's `frameloop`, not its
 * mount. A scene stays mounted (context created once, during idle time) but
 * only actually renders every frame while its section is on screen or about
 * to be; six independent WebGL render loops all running permanently, one
 * per section the visitor has ever scrolled past, is what made scrolling
 * feel heavy once more than a couple of sections had loaded.
 *
 * Starts optimistic (`true`) so a scene already in view at mount — the hero,
 * on first paint — never waits on the observer's first callback to render.
 */
export function useInView<T extends HTMLElement>(rootMargin = '400px 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
