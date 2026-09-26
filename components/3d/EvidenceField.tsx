'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const BONE = new THREE.Color('#F4F0E8');
const COPPER = new THREE.Color('#E07A4C');
const MARKER_COUNT = 4;

/**
 * A fourth 3D vocabulary: a sparse field, not an object. Fine bone dust
 * drifts slowly across the whole frame; a handful of larger copper markers
 * — one per kind of recognition — bob gently, brighter than the rest.
 * Deliberately the emptiest scene on the site: this section is about
 * evidence gathered over years, not a dense system.
 */
export default function EvidenceField({ tier }: { tier: DeviceTier }) {
  const dust = useRef<THREE.Points>(null);
  const markers = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const dustCount = tier === 'high' ? 220 : 140;

  const dustGeo = useDisposable(() => {
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [dustCount]);

  const dustMat = useDisposable(
    () =>
      new THREE.PointsMaterial({
        color: BONE,
        size: 0.016,
        transparent: true,
        opacity: 0.3,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [],
  );

  const markerGeo = useDisposable(() => new THREE.OctahedronGeometry(0.075, 0), []);
  const markerPositions = [
    [-2.1, 0.9, -0.4],
    [1.9, 1.1, 0.2],
    [-1.6, -1.0, 0.3],
    [2.2, -0.8, -0.2],
  ] as const;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (dust.current) dust.current.rotation.y += delta * 0.01;

    const mesh = markers.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < MARKER_COUNT; i++) {
      const [x, y, z] = markerPositions[i];
      dummy.position.set(x, y + Math.sin(t * 0.5 + i * 1.7) * 0.12, z);
      dummy.rotation.set(t * 0.2 + i, t * 0.15, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  const scale = Math.min(1.1, Math.max(0.7, viewport.width / 10));

  return (
    <group scale={scale}>
      <points ref={dust} geometry={dustGeo} material={dustMat} />
      <instancedMesh ref={markers} args={[markerGeo, undefined, MARKER_COUNT]}>
        <meshBasicMaterial color={COPPER} wireframe transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}
