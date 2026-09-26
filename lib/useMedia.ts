'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media query hook. Starts false, resolves after mount. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMedia('(min-width: 1024px) and (pointer: fine)');
export const useIsTouch = () => useMedia('(pointer: coarse)');
