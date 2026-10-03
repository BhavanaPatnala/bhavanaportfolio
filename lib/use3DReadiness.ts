'use client';

import { useCallback, useEffect, useState } from 'react';
import { detectDeviceTier, type DeviceTier } from './deviceTier';

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * The shared adaptive gate every 3D section uses: device tier, a real
 * WebGL capability check, idle-deferred readiness so a heavy Three.js
 * chunk never competes with first interaction, and a context-loss escape
 * hatch. `webglOk` only catches "WebGL never worked" (checked once, at
 * mount, against a throwaway canvas) — it says nothing about a context
 * that was rendering fine and then got lost at runtime (a GPU driver
 * reset, too many contexts, a mobile OS reclaiming GPU memory on
 * backgrounding). `reportContextLost` is what a Canvas component calls
 * from its own `webglcontextlost` listener; once called, `showCanvas`
 * permanently flips to false for that mount, same as any other failure
 * mode here — falling back to the already-rendered static SVG rather
 * than attempting a WebGL context restore, which the brief's own "don't
 * leave a broken blank space" standard doesn't require and which is
 * meaningfully more failure-prone than just degrading gracefully once.
 */
export function use3DReadiness() {
  const [tier, setTier] = useState<DeviceTier | null>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);

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

  const reportContextLost = useCallback(() => setContextLost(true), []);

  return {
    tier,
    showCanvas: ready && tier !== null && tier !== 'low' && webglOk && !contextLost,
    reportContextLost,
  };
}
