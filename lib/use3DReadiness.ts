'use client';

import { useEffect, useState } from 'react';
import { detectDeviceTier, type DeviceTier } from './deviceTier';

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * The shared adaptive gate every 3D section uses: device tier, a real
 * WebGL capability check, and idle-deferred readiness so a heavy Three.js
 * chunk never competes with first interaction. Extracted once so each new
 * section's scene wrapper is a few lines, not a re-implementation of this
 * logic — see HeroScene for the pattern this replaced.
 */
export function use3DReadiness() {
  const [tier, setTier] = useState<DeviceTier | null>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTier(detectDeviceTier());
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }

    const idleFn = (window as IdleWindow).requestIdleCallback;
    if (idleFn) {
      const id = idleFn(() => setReady(true), { timeout: 1500 });
      return () => (window as IdleWindow).cancelIdleCallback?.(id);
    }
    const timeoutId = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return { tier, showCanvas: ready && tier !== null && tier !== 'low' && webglOk };
}
