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
 *
 * Also returns `hasBeenInView`: latches to `true` the first time `inView`
 * does, and never resets. A scene below the fold mounting during idle time
 * *regardless of scroll position* (six of them, unconditionally, on every
 * load) measured out as ~6s of contiguous main-thread work in Lighthouse —
 * the single largest cost on the page, paid even by a visitor who never
 * scrolls past the hero. `hasBeenInView` lets a Scene defer its Canvas's
 * first mount until the section is actually about to be seen, while still
 * never unmounting it afterward — the original "stays mounted once shown"
 * guarantee this hook's `inView` already provided for `frameloop` is
 * unchanged; only the *first* mount becomes conditional, not every one.
 */
export function useInView<T extends HTMLElement>(rootMargin = '400px 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  // Deliberately pessimistic (unlike `inView` above): starting this `true`
  // for every instance would mount every section immediately regardless of
  // position, which is exactly the cost this exists to avoid. The real
  // IntersectionObserver callback fires within a frame or two of mount, so
  // the hero — genuinely in view at load — still mounts essentially
  // immediately; it just isn't assumed true ahead of the actual check.
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView, hasBeenInView };
}
