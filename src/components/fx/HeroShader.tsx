"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Mouse-reactive GLSL background for the hero section.
 *
 * A fullscreen quad runs a small fragment shader: two layers of value noise
 * (domain-warped for the drifting "code fog" look) tinted with theme colors,
 * plus a soft glow that trails the pointer. Rendered at DPR 1 and kept very
 * low-contrast so text stays perfectly readable on top.
 *
 * Kill switches: prefers-reduced-motion (not rendered), off-screen
 * (IntersectionObserver pauses the frameloop), hidden tab (same), no WebGL.
 */

/* Trivial vertex shader - the plane's [-1,1] coords are already clip space */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;      /* spring-damped pointer position in UV space */
  uniform float uAspect;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  /* Classic 2D value noise: hash lattice points, bilinear-smooth between them */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  /* 3-octave fractal brownian motion */
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 mouse = vec2(uMouse.x * uAspect, uMouse.y);

    /* Domain-warped noise: fbm fed with fbm gives the slow organic drift */
    float n = fbm(uv * 2.5 + uTime * 0.04 + fbm(uv * 2.0 - uTime * 0.02));

    /* Soft glow following the (damped) pointer */
    float glow = smoothstep(0.6, 0.0, distance(uv, mouse));

    vec3 color = mix(uColorA, uColorB, n);

    /* Keep it a whisper: peak alpha ~0.14 near the pointer, ~0.07 elsewhere */
    float alpha = n * 0.07 + glow * 0.07;
    gl_FragColor = vec4(color, alpha);
  }
`;

/** The fullscreen quad + per-frame uniform updates (must live inside <Canvas>) */
function ShaderPlane({ mouseTarget }: { mouseTarget: React.RefObject<THREE.Vector2> }) {
  const { resolvedTheme } = useTheme();

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uAspect: { value: 1 },
          uColorA: { value: new THREE.Color("#61afef") },
          uColorB: { value: new THREE.Color("#c678dd") },
        },
      }),
    []
  );

  /* Feed theme tokens into the shader whenever the theme flips */
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--ide-accent").trim();
    const func = styles.getPropertyValue("--syn-func").trim();
    if (accent) material.uniforms.uColorA.value.set(accent);
    if (func) material.uniforms.uColorB.value.set(func);
  }, [resolvedTheme, material]);

  useFrame((state, delta) => {
    material.uniforms.uTime.value += delta;
    material.uniforms.uAspect.value = state.size.width / state.size.height;
    /* Spring-damp the mouse so the glow trails instead of snapping */
    if (mouseTarget.current) {
      material.uniforms.uMouse.value.lerp(mouseTarget.current, 0.06);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/**
 * Absolute-positioned shader background. Place inside a `relative isolate`
 * section; it fills the section and ignores pointer events.
 */
export function HeroShader() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const [webglOk, setWebglOk] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  /* Track the pointer over the parent section, in UV coords (y up) */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = wrapper?.parentElement;
    if (!section) return;

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      mouseTarget.current.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  /* Pause rendering when off-screen or the tab is hidden */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let inView = true;
    const sync = () =>
      setFrameloop(inView && !document.hidden ? "always" : "never");

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(wrapper);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  /* Bail out entirely without WebGL support */
  useEffect(() => {
    if (!window.WebGLRenderingContext) setWebglOk(false);
  }, []);

  if (reducedMotion || !webglOk) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <Canvas dpr={1} frameloop={frameloop} gl={{ alpha: true, antialias: false }}>
        <ShaderPlane mouseTarget={mouseTarget} />
      </Canvas>
    </div>
  );
}
