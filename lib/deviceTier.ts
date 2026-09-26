'use client';

/**
 * A coarse capability tier, computed once on mount. Drives geometry detail,
 * particle counts and pixel-ratio cap in the 3D scene — cheap devices get a
 * simpler scene rather than a stuttering copy of the desktop one.
 */
export type DeviceTier = 'high' | 'medium' | 'low';

export function detectDeviceTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'medium';

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return 'low';

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const smallViewport = window.innerWidth < 768;

  if (coarsePointer && (smallViewport || cores <= 4 || mem <= 4)) return 'low';
  if (coarsePointer || cores <= 6 || mem <= 6) return 'medium';
  return 'high';
}
