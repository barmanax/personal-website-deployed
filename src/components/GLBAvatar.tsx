"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { SafeAsciiRenderer } from "@/components/fx/SafeAsciiRenderer";

/**
 * 3D avatar rendered as real-time ASCII art.
 *
 * The GLB model renders to a hidden WebGL canvas; SafeAsciiRenderer (our
 * fixed fork of drei's AsciiRenderer) converts each frame to a character
 * grid overlaid on top. The overlay has pointer-events: none and the
 * underlying canvas stays interactive, so click-to-animate and
 * drag-to-rotate still work.
 *
 * Click the avatar to cycle its animations.
 */

/** Braille spinner frames for the ASCII-flavored loading state */
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Model({ onLoad }: { onLoad: () => void }) {
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

      const animName = names[currentAnimIndex % names.length];
      const action = actions[animName];
      if (action) {
        action.reset().fadeIn(0.3).play();
        // Seek partway through the first clip so the idle pose looks natural on load
        if (currentAnimIndex === 0) {
          action.time = action.getClip().duration * 0.45;
        }
      }
    }
  }, [actions, names, currentAnimIndex]);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    // Cycle to next animation
    setCurrentAnimIndex((prev) => prev + 1);
  };

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.9}
      position={[0, -1.5, 0.0]}
      rotation={[0, 0.1, 0]}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  );
}

export function GLBAvatar() {
  const [loaded, setLoaded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  /* ASCII characters take their color from the theme's foreground token */
  const fgColor = isDark ? "#abb2bf" : "#1f2328";

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 1.8, 5.5], fov: 50 }}
        gl={{ alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/*
           * Opaque black background is required for correct ASCII shading:
           * with invert=true, black maps to empty space and lit surfaces
           * map to dense characters. (The hidden WebGL canvas never shows,
           * so the black never appears on the page.)
           */}
          <color attach="background" args={["black"]} />

          {/*
           * Low ambient + strong angled key light maximizes the luminance
           * gradient across the model - that gradient IS the ASCII detail.
           */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[2, 3, 3]} intensity={1.8} />
          <directionalLight position={[-2, 1, -1]} intensity={0.3} />

          <Model onLoad={() => setLoaded(true)} />

          <SafeAsciiRenderer
            fgColor={fgColor}
            characters=" .:-+*=%@#"
            invert
            resolution={0.22}
          />
        </Suspense>

        {/* Zoom disabled: scroll must keep scrolling the editor pane */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          target={[0, 0.2, 0]}
        />
      </Canvas>

      {/* ASCII-flavored loading state */}
      {!loaded && <AsciiSpinner />}
    </div>
  );
}

/** Centered mono loading indicator cycling through braille frames */
function AsciiSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_FRAMES.length),
      80
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="font-mono text-sm text-ide-fg-muted">
        {SPINNER_FRAMES[frame]} loading avatar.glb
      </p>
    </div>
  );
}

// Preload the GLB to avoid pop-in
useGLTF.preload("/avatar.glb");
