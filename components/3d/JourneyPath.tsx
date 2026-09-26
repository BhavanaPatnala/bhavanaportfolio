'use client';

import { useMemo, useRef, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceTier } from '@/lib/deviceTier';
import { useDisposable } from '@/lib/useDisposable';

const BONE = new THREE.Color('#F4F0E8');
const COPPER = new THREE.Color('#E07A4C');

/** Four waypoints, one per career stage — a gentle curve, not a straight
 *  line, so the camera's travel reads as a path through space rather than
 *  a mechanical slide. */
const WAYPOINTS: [number, number, number][] = [
  [-1.6, -0.3, 2.5],
  [-0.5, 0.4, 0.5],
  [0.7, -0.2, -1.5],
  [1.8, 0.3, -3.5],
];

export default function JourneyPath({
  tier,
  progress,
  activeStage,
}: {
  tier: DeviceTier;
  progress: RefObject<number>;
  activeStage: RefObject<number>;
}) {
  const camera = useThree((s) => s.camera);
  const nodeGroups = useRef<THREE.Group[]>([]);
  const lastLook = useRef(new THREE.Vector3());
  // Scratch vectors, reused every frame instead of allocated — `lerp` and
  // `getPointAt` only ever read these synchronously, so one instance each
  // is safe to mutate and pass in on every call.
  const camPoint = useRef(new THREE.Vector3());
  const lookPoint = useRef(new THREE.Vector3());
  const camTarget = useRef(new THREE.Vector3());
  const scaleTarget = useRef(new THREE.Vector3());

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(WAYPOINTS.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.5),
    [],
  );

  const trackGeo = useDisposable(() => {
    const points = curve.getPoints(tier === 'high' ? 80 : 40);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve, tier]);

  const nodeGeo = useDisposable(() => new THREE.OctahedronGeometry(0.22, 0), []);
  const ringGeo = useDisposable(() => new THREE.TorusGeometry(0.34, 0.012, 8, 32), []);

  useFrame((_, delta) => {
    const p = progress.current ?? 0;
    const camT = 0.06 + p * 0.82; // stay just behind the last node, not past it
    const camPos = curve.getPointAt(Math.min(1, Math.max(0, camT)), camPoint.current);
    const lookT = Math.min(1, camT + 0.14);
    const lookPos = curve.getPointAt(lookT, lookPoint.current);

    const lerpAlpha = 1 - Math.pow(0.001, delta);
    camTarget.current.set(camPos.x * 0.6, camPos.y * 0.6 + 0.1, camPos.z + 3.2);
    camera.position.lerp(camTarget.current, lerpAlpha);
    lastLook.current.lerp(lookPos, lerpAlpha);
    camera.lookAt(lastLook.current.x * 0.6, lastLook.current.y * 0.6, lastLook.current.z);

    const active = activeStage.current ?? 0;
    nodeGroups.current.forEach((g, i) => {
      if (!g) return;
      const isActive = i === active;
      const targetScale = isActive ? 1.25 : 0.85;
      scaleTarget.current.set(targetScale, targetScale, targetScale);
      g.scale.lerp(scaleTarget.current, 0.08);
      g.rotation.y += delta * (isActive ? 0.5 : 0.15);
    });
  });

  return (
    <group>
      <line>
        <primitive object={trackGeo} attach="geometry" />
        <lineBasicMaterial color={BONE} transparent opacity={0.28} />
      </line>

      {WAYPOINTS.map((pos, i) => (
        <group key={i} position={pos} ref={(el) => { if (el) nodeGroups.current[i] = el; }}>
          <mesh geometry={nodeGeo}>
            <meshBasicMaterial color={i === 0 ? BONE : COPPER} wireframe />
          </mesh>
          <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={COPPER} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
