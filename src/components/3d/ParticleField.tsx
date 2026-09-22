"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motionStore } from "@/lib/motionStore";

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

// Deterministic PRNG (mulberry32) so the layout is stable and render stays pure.
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ParticleField({ count = 400, color = "#b9c3d6" }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const random = seededRandom(1102);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 18;
      pos[i * 3 + 1] = (random() - 0.5) * 14;
      pos[i * 3 + 2] = (random() - 0.5) * 8 - 3;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    const p = pointsRef.current;
    if (!p) return;
    const dt = Math.min(delta, 1 / 20);
    const { damp } = THREE.MathUtils;
    p.rotation.y = motionStore.sceneTime * 0.015;
    // Parallax: drift up as the page scrolls, lean with the pointer.
    p.position.y = damp(p.position.y, motionStore.scrollProgress * 2.5 + motionStore.pointerY * 0.15, 2, dt);
    p.position.x = damp(p.position.x, motionStore.pointerX * 0.2, 2, dt);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
