'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const COPPER = new THREE.Color('#E07A4C');
const BONE = new THREE.Color('#F4F0E8');

/**
 * The floating architectural core: software architecture rendered as an
 * object rather than a diagram. A wireframe shell (the system), an inner
 * faceted volume (the module), instanced node points at the vertices
 * (components), and a thin particle field around it (signal/data).
 *
 * Built from cheap primitives — line segments, instanced meshes, basic
 * materials — rather than MeshPhysicalMaterial transmission or
 * post-processing. It reads as glass and light without paying a
 * transmission pass on every frame.
 */
export default function HeroCore({ tier }: { tier: DeviceTier }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const detail = tier === 'high' ? 1 : 0;
  const particleCount = tier === 'high' ? 520 : tier === 'medium' ? 240 : 0;

  const outerGeo = useDisposable(() => {
    const base = new THREE.IcosahedronGeometry(1.55, detail);
    const edges = new THREE.EdgesGeometry(base, 1);
    base.dispose();
    return edges;
  }, [detail]);

  const innerShellGeo = useDisposable(() => new THREE.IcosahedronGeometry(1.42, detail), [detail]);

  const innerWireGeo = useDisposable(() => {
    const base = new THREE.IcosahedronGeometry(0.72, 0);
    const edges = new THREE.EdgesGeometry(base, 1);
    base.dispose();
    return edges;
  }, []);

  const nodePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, detail);
    const pos = geo.attributes.position;
    const unique: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(v);
    }
    geo.dispose();
    return unique;
  }, [detail]);

  const nodeGeo = useDisposable(() => new THREE.SphereGeometry(0.028, 10, 10), []);
  const nodeMat = useDisposable(() => new THREE.MeshBasicMaterial({ color: COPPER }), []);

  const particleGeo = useDisposable(() => {
    const count = Math.max(particleCount, 1);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [particleCount]);

  const particleMat = useDisposable(
    () =>
      new THREE.PointsMaterial({
        color: BONE,
        size: 0.02,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const nx = state.pointer.x * 0.5;
    const ny = state.pointer.y * 0.5;
    pointer.current.x += (nx - pointer.current.x) * 0.04;
    pointer.current.y += (ny - pointer.current.y) * 0.04;

    g.rotation.y += delta * 0.09;
    g.rotation.x = pointer.current.y * 0.18;
    g.rotation.z = -pointer.current.x * 0.12;

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.16;
      inner.current.rotation.x += delta * 0.05;
    }
    if (points.current) {
      points.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group
      ref={group}
      position={[viewport.width * 0.2, -viewport.height * 0.02, 0]}
      scale={Math.min(0.85, Math.max(0.55, viewport.width / 8.5))}
    >
      {/* Outer wireframe shell — the system boundary */}
      <lineSegments geometry={outerGeo}>
        <lineBasicMaterial color={BONE} transparent opacity={0.32} />
      </lineSegments>

      {/* Translucent facets — a cheap glass read via low-opacity backside
          fill, deliberately not a transmission material */}
      <mesh geometry={innerShellGeo}>
        <meshBasicMaterial color={COPPER} transparent opacity={0.05} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Inner module core, counter-rotating */}
      <group ref={inner}>
        <lineSegments geometry={innerWireGeo}>
          <lineBasicMaterial color={COPPER} transparent opacity={0.55} />
        </lineSegments>
      </group>

      {/* Component nodes at each vertex — one instanced draw call */}
      <instancedMesh
        args={[nodeGeo, nodeMat, nodePositions.length]}
        onUpdate={(mesh) => {
          const m = new THREE.Matrix4();
          nodePositions.forEach((v, i) => {
            m.setPosition(v);
            mesh.setMatrixAt(i, m);
          });
          mesh.instanceMatrix.needsUpdate = true;
        }}
      />

      {particleCount > 0 && <points ref={points} geometry={particleGeo} material={particleMat} />}
    </group>
  );
}
