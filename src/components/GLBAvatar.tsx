"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * 3D avatar using a GLB model file with animation support.
 * Place your avatar.glb file in the /public folder.
 *
 * Click the avatar to trigger animations.
 * OrbitControls lets users drag to rotate, scroll to zoom.
 */

function Model({ onLoad, onClick }: { onLoad: () => void; onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions, names } = useAnimations(animations, group);
  const [currentAnimIndex, setCurrentAnimIndex] = useState(0);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    // Play the current animation
    if (names.length > 0) {
      // Stop all animations first
      Object.values(actions).forEach((action) => action?.stop());

      // Play the current animation
      const animName = names[currentAnimIndex % names.length];
      actions[animName]?.reset().fadeIn(0.3).play();
    }
  }, [actions, names, currentAnimIndex]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Cycle to next animation
    setCurrentAnimIndex((prev) => prev + 1);
    onClick();
  };

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.5}
      position={[0, -0.8, 0]}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  );
}

export function GLBAvatar() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[500px] w-full sm:h-[550px] lg:h-[600px]">
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 55 }}
        className="rounded-xl"
      >
        <Suspense fallback={null}>
          {/* Soft ambient lighting */}
          <ambientLight intensity={0.5} />

          {/* Main directional light from front-top */}
          <directionalLight position={[2, 3, 2]} intensity={1} />

          {/* Fill light from the side for softer shadows */}
          <directionalLight position={[-2, 1, -1]} intensity={0.3} />

          {/* Subtle rim light from behind */}
          <pointLight position={[0, 2, -2]} intensity={0.4} color="#60a5fa" />

          {/* Environment map for realistic reflections */}
          <Environment preset="city" />

          <Model onLoad={() => setLoaded(true)} onClick={() => {}} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          target={[0, 0.2, 0]}
        />
      </Canvas>

      {/* Loading state - only show when not loaded */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-950/50 rounded-xl">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-surface-700 border-t-accent" />
        </div>
      )}
    </div>
  );
}

// Preload the GLB to avoid pop-in
useGLTF.preload("/avatar.glb");
