'use client';

import { useRef, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const BONE = new THREE.Color('#F4F0E8');
const COPPER = new THREE.Color('#E07A4C');

/**
 * Five layers of one production application, stacked flush at rest and
 * pulled apart in Z as the visitor scrolls — the same idea a exploded
 * technical diagram uses, except the visitor drives it by hand.
 */
export default function ClaritiLayers({
  tier,
  progress,
}: {
  tier: DeviceTier;
  progress: RefObject<number>;
}) {
  const layers = useRef<THREE.Group[]>([]);
  const { viewport } = useThree();
  const detail = tier === 'high';

  const geo = useDisposable(() => new THREE.PlaneGeometry(3.2, 2), []);
  const edges = useDisposable(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.2, 2)), []);

  const labels = ['Interface', 'Components', 'Architecture', 'Data / Services', 'Production'];

  useFrame(() => {
    const p = progress.current ?? 0;
    // Eased spread: gentle at first, more separation as scroll deepens.
    const eased = 1 - Math.pow(1 - p, 2);
    const maxSpread = detail ? 1.15 : 0.85;
    layers.current.forEach((g, i) => {
      if (!g) return;
      const rest = (i - 2) * 0.05;
      const spread = (i - 2) * maxSpread;
      g.position.z = THREE.MathUtils.lerp(rest, spread, eased);
      g.rotation.y = THREE.MathUtils.lerp(0, (i - 2) * 0.04, eased);
    });
  });

  const scale = Math.min(1, Math.max(0.6, viewport.width / 9));

  return (
    <group scale={scale}>
      {labels.map((_, i) => {
        const isAccent = i === 2;
        return (
          <group key={i} ref={(el) => { if (el) layers.current[i] = el; }}>
            <mesh geometry={geo}>
              <meshBasicMaterial
                color={isAccent ? COPPER : BONE}
                transparent
                opacity={isAccent ? 0.08 : 0.045}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
            <lineSegments geometry={edges}>
              <lineBasicMaterial color={isAccent ? COPPER : BONE} transparent opacity={isAccent ? 0.6 : 0.28} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}
