'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState, type RefObject } from 'react';
import JourneyPath from './JourneyPath';
import type { DeviceTier } from '@/lib/deviceTier';

export default function JourneyCanvas({
  tier,
  progress,
  activeStage,
  frameloop = 'always',
}: {
  tier: DeviceTier;
  progress: RefObject<number>;
  activeStage: RefObject<number>;
  frameloop?: 'always' | 'never';
}) {
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
      camera={{ position: [-1, 0, 5], fov: 45 }}
      shadows={false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <JourneyPath tier={tier} progress={progress} activeStage={activeStage} />
    </Canvas>
  );
}
