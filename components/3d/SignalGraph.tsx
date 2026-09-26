'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const BONE = new THREE.Color('#F4F0E8');
const COPPER = new THREE.Color('#E07A4C');

/**
 * A third 3D vocabulary, distinct from the hero's polyhedron and the
 * layered panels elsewhere: a small signal graph. Outer nodes feed a
 * central one, with a pulse travelling each edge — "deterministic code
 * decides, the model explains" rendered as a diagram rather than said.
 */
export default function SignalGraph({ tier }: { tier: DeviceTier }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = tier === 'high' ? 7 : 5;
  const radius = 1.5;

  const outerPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.72;
      arr[i * 3 + 2] = Math.sin(angle * 2) * 0.35;
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const nodeGeo = useDisposable(() => new THREE.IcosahedronGeometry(0.055, 1), []);
  const centerGeo = useDisposable(() => new THREE.IcosahedronGeometry(0.09, 1), []);
  const pulseGeo = useDisposable(() => new THREE.SphereGeometry(0.028, 8, 8), []);

  const edgesGeo = useDisposable(() => {
    const positions = new Float32Array(count * 2 * 3);
    for (let i = 0; i < count; i++) {
      positions.set([outerPositions[i * 3], outerPositions[i * 3 + 1], outerPositions[i * 3 + 2]], i * 6);
      positions.set([0, 0, 0], i * 6 + 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, outerPositions]);

  const scale = Math.min(1.15, Math.max(0.75, viewport.width / 9));
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      const nx = state.pointer.x * 0.4;
      const ny = state.pointer.y * 0.4;
      pointer.current.x += (nx - pointer.current.x) * 0.03;
      pointer.current.y += (ny - pointer.current.y) * 0.03;
      g.rotation.y = pointer.current.x * 0.25 + state.clock.elapsedTime * 0.03;
      g.rotation.x = -pointer.current.y * 0.15;
    }

    const mesh = pulses.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const phase = (t * 0.28 + i / count) % 1;
      const ox = outerPositions[i * 3];
      const oy = outerPositions[i * 3 + 1];
      const oz = outerPositions[i * 3 + 2];
      dummy.position.set(ox * (1 - phase), oy * (1 - phase), oz * (1 - phase));
      const s = 0.6 + Math.sin(phase * Math.PI) * 0.8;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    void delta;
  });

  return (
    <group ref={group} scale={scale} position={[viewport.width * 0.18, 0, 0]}>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={BONE} transparent opacity={0.22} />
      </lineSegments>

      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} geometry={nodeGeo} position={[outerPositions[i * 3], outerPositions[i * 3 + 1], outerPositions[i * 3 + 2]]}>
          <meshBasicMaterial color={BONE} wireframe transparent opacity={0.7} />
        </mesh>
      ))}

      <mesh geometry={centerGeo}>
        <meshBasicMaterial color={COPPER} wireframe transparent opacity={0.9} />
      </mesh>

      <instancedMesh ref={pulses} args={[pulseGeo, undefined, count]}>
        <meshBasicMaterial color={COPPER} transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}
