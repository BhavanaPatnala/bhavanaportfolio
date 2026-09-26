'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const BONE = new THREE.Color('#F4F0E8');
const COPPER = new THREE.Color('#E07A4C');

/**
 * A different 3D vocabulary from the hero's core: flat translucent panels,
 * stacked with depth — the same visual idea as a system built in layers,
 * rendered as an object rather than a diagram, but never repeating the
 * hero's polyhedron so each section reads as its own space.
 */
export default function LayerStack({ tier }: { tier: DeviceTier }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = tier === 'high' ? 5 : 4;
  const panelGeo = useDisposable(() => new THREE.PlaneGeometry(2.6, 1.6), []);
  const edgesGeo = useDisposable(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.6, 1.6)), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const nx = state.pointer.x * 0.5;
    const ny = state.pointer.y * 0.5;
    pointer.current.x += (nx - pointer.current.x) * 0.035;
    pointer.current.y += (ny - pointer.current.y) * 0.035;
    g.rotation.y = 0.32 + pointer.current.x * 0.15;
    g.rotation.x = -0.18 + pointer.current.y * 0.1;
    g.rotation.z += delta * 0.01;
  });

  const scale = Math.min(1, Math.max(0.6, viewport.width / 8));

  return (
    <group ref={group} scale={scale} position={[viewport.width * 0.16, 0, 0]}>
      {Array.from({ length: count }).map((_, i) => {
        const z = (i - (count - 1) / 2) * 0.34;
        const isAccent = i === Math.floor(count / 2);
        return (
          <group key={i} position={[0, 0, z]}>
            <mesh geometry={panelGeo}>
              <meshBasicMaterial
                color={isAccent ? COPPER : BONE}
                transparent
                opacity={isAccent ? 0.07 : 0.035}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
            <lineSegments geometry={edgesGeo}>
              <lineBasicMaterial color={isAccent ? COPPER : BONE} transparent opacity={isAccent ? 0.55 : 0.22} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}
