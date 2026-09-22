"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motionStore } from "@/lib/motionStore";

type Pose = { x: number; y: number; z: number; s: number };

// Keyframes along the page (scroll progress 0..1). Interpolated with smoothstep.
const DESKTOP: [number, Pose][] = [
  [0.0, { x: 1.75, y: 0.3, z: 0, s: 0.9 }],
  [0.3, { x: -1.9, y: 0.2, z: -1.2, s: 0.8 }],
  [0.6, { x: 2.0, y: -0.2, z: -1.8, s: 0.7 }],
  [1.0, { x: 0, y: -0.3, z: -0.8, s: 0.95 }],
];
// Tablets and small laptops: orb tucked into the top-right corner, away from the text column.
const TABLET: [number, Pose][] = [
  [0.0, { x: 2.1, y: 1.0, z: -0.6, s: 0.72 }],
  [0.3, { x: -2.1, y: 0.4, z: -1.6, s: 0.62 }],
  [0.6, { x: 2.2, y: -0.4, z: -2.0, s: 0.58 }],
  [1.0, { x: 0, y: -0.3, z: -1.2, s: 0.8 }],
];
// Portrait phones and tablets: centered above the headline.
const MOBILE: [number, Pose][] = [
  [0.0, { x: 0.3, y: 1.35, z: -1, s: 0.6 }],
  [0.5, { x: 0, y: 0.2, z: -2.2, s: 0.65 }],
  [1.0, { x: 0, y: -0.2, z: -1.4, s: 0.75 }],
];

export type SceneLayout = "mobile" | "tablet" | "desktop";

/** Chooses the choreography from the canvas size in CSS px. */
export function sceneLayout(width: number, height: number): SceneLayout {
  if (width / height < 0.9) return "mobile";
  if (width < 1280 || width / height < 1.4) return "tablet";
  return "desktop";
}

const POSES: Record<SceneLayout, [number, Pose][]> = { mobile: MOBILE, tablet: TABLET, desktop: DESKTOP };

function samplePose(frames: [number, Pose][], t: number): Pose {
  for (let i = 0; i < frames.length - 1; i++) {
    const [t0, a] = frames[i];
    const [t1, b] = frames[i + 1];
    if (t <= t1) {
      const k = THREE.MathUtils.smoothstep(t, t0, t1);
      return {
        x: a.x + (b.x - a.x) * k,
        y: a.y + (b.y - a.y) * k,
        z: a.z + (b.z - a.z) * k,
        s: a.s + (b.s - a.s) * k,
      };
    }
  }
  return { ...frames[frames.length - 1][1] };
}

const DISTORT_SPEED = 1.1;

export default function LiquidChromeMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matRef = useRef<any>(null);
  // Re-renders only when the layout bucket changes (e.g. rotating a tablet), not on every resize.
  const layout = useThree((s) => sceneLayout(s.size.width, s.size.height));

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dt = Math.min(delta, 1 / 20);
    motionStore.sceneTime += dt;
    const t = motionStore.sceneTime;

    const pose = samplePose(POSES[layout], motionStore.scrollProgress);
    // Wide screens: push the orb further out so it stays beside the text column.
    if (layout === "desktop") pose.x *= Math.min(Math.max(state.viewport.aspect / 1.45, 1), 1.6);
    const { damp } = THREE.MathUtils;

    mesh.position.x = damp(mesh.position.x, pose.x, 3, dt);
    mesh.position.y = damp(mesh.position.y, pose.y + Math.sin(t * 0.6) * 0.06, 3, dt);
    mesh.position.z = damp(mesh.position.z, pose.z, 3, dt);
    mesh.scale.setScalar(damp(mesh.scale.x, pose.s, 3, dt));

    // Gentle pointer lean on top of a slow idle spin.
    mesh.rotation.x = damp(mesh.rotation.x, -motionStore.pointerY * 0.3, 2.5, dt);
    mesh.rotation.y = damp(mesh.rotation.y, t * 0.12 + motionStore.pointerX * 0.4, 2.5, dt);

    // Scrolling faster makes the surface a little more liquid.
    if (matRef.current) {
      // Overrides drei's own clock-based time (its useFrame runs first) with the pausable scene time.
      matRef.current.time = t * DISTORT_SPEED;
      const target = 0.28 + Math.min(Math.abs(motionStore.scrollVelocity) * 0.01, 0.18);
      matRef.current.distort = damp(matRef.current.distort, target, 4, dt);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, layout === "mobile" ? 20 : 32]} />
      <MeshDistortMaterial
        ref={matRef}
        speed={DISTORT_SPEED}
        distort={0.28}
        color="#dfe3ea"
        roughness={0.2}
        metalness={1}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[120, 420]}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}
