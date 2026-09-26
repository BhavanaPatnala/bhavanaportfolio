'use client';

import { useEffect, useMemo } from 'react';

type Disposable = { dispose: () => void };

/**
 * Creates a Three.js object via `factory` and guarantees it is disposed —
 * on dependency change and on unmount. Needed for anything built with
 * `useMemo` and handed to a JSX primitive as a prop: R3F only auto-disposes
 * objects it creates directly from JSX children, not ones passed in as
 * props, so those are ours to clean up or they leak GPU memory silently.
 */
export function useDisposable<T extends Disposable>(factory: () => T, deps: React.DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(factory, deps);
  useEffect(() => () => value.dispose(), [value]);
  return value;
}
