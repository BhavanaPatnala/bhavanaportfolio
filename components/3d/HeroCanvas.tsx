'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import HeroCore from './HeroCore';
import type { DeviceTier } from '@/lib/deviceTier';

/**
 * Owns the actual WebGL canvas: camera, lighting, pixel-ratio cap. Loaded
 * only client-side via dynamic import (see HeroScene) so it never touches
 * SSR and never ships to a visitor who won't render it.
 */
export default function HeroCanvas({ tier, frameloop = 'always' }: { tier: DeviceTier; frameloop?: 'always' | 'never' }) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const cap = tier === 'high' ? 2 : tier === 'medium' ? 1.5 : 1;
    setDpr(Math.min(cap, window.devicePixelRatio || 1));
  }, [tier]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      shadows={false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 2, 4]} intensity={1.1} color="#E07A4C" />
      <directionalLight position={[-4, -1, -3]} intensity={0.4} color="#F4F0E8" />
      <HeroCore tier={tier} />
    </Canvas>
  );
}
