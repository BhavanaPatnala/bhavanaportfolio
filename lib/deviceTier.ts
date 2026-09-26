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

  // Genuinely low-end hardware — too little headroom for any 3D at all,
  // regardless of input type. This used to also trigger on any touch device
  // under 768px, which is nearly every phone in portrait: that conflated
  // "narrow screen" and "touch input" with "weak GPU", and meant most
  // visitors on a phone never saw the 3D scene at all, not a lighter one.
  if (cores <= 2 && mem <= 2) return 'low';

  // A touch device is capped at 'medium' — same scene, fewer particles, a
  // lower DPR ceiling and no antialiasing (set per-scene from this tier) —
  // for battery and thermal headroom, never excluded outright. `deviceMemory`
  // is unsupported on iOS Safari and falls back to 4, so this never
  // misclassifies an iPhone as low-end.
  if (coarsePointer) return 'medium';

  if (cores <= 4 || mem <= 4) return 'medium';
  return 'high';
}
