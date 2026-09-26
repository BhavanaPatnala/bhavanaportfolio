'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import EvidenceField from './EvidenceField';
import type { DeviceTier } from '@/lib/deviceTier';

export default function EvidenceFieldCanvas({ tier, frameloop = 'always' }: { tier: DeviceTier; frameloop?: 'always' | 'never' }) {
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
    >
      <ambientLight intensity={0.6} />
      <EvidenceField tier={tier} />
    </Canvas>
  );
}
