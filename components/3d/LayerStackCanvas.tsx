'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import LayerStack from './LayerStack';
import type { DeviceTier } from '@/lib/deviceTier';

export default function LayerStackCanvas({
  tier,
  frameloop = 'always',
  onContextLost,
}: {
  tier: DeviceTier;
  frameloop?: 'always' | 'never';
  onContextLost?: () => void;
}) {
  const [dpr, setDpr] = useState(1);
  useEffect(() => {
    const cap = tier === 'high' ? 2 : tier === 'medium' ? 1.25 : 1;
    setDpr(Math.min(cap, window.devicePixelRatio || 1));
  }, [tier]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={frameloop}
      gl={{
        antialias: tier === 'high',
        alpha: true,
        powerPreference: tier === 'high' ? 'high-performance' : 'low-power',
      }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      shadows={false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      onCreated={(state) => {
        state.gl.domElement.addEventListener(
          'webglcontextlost',
          (e) => {
            e.preventDefault();
            onContextLost?.();
          },
          { once: true },
        );
      }}
    >
      <ambientLight intensity={0.6} />
      <LayerStack tier={tier} />
    </Canvas>
  );
}
