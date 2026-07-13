"use client";

import { useEffect, useLayoutEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three-stdlib";

/**
 * Replacement for drei's <AsciiRenderer> fixing two bugs:
 *
 * 1. Crash: drei sizes the effect in a post-paint useEffect, so the first
 *    animation frame can hit getImageData() with undefined dimensions
 *    ("Value is not of type 'long'"). We size in useLayoutEffect, which
 *    always runs before the next rAF, and guard zero-sized frames.
 *
 * 2. Shading: AsciiEffect treats transparent pixels as full brightness
 *    (dense ink under invert), so a transparent scene renders as a wall of
 *    '#'. The correct setup for light-ink-on-dark themes is invert=true
 *    with an OPAQUE BLACK scene background - black maps to empty space,
 *    lit surfaces map to dense characters. Pair this component with
 *    <color attach="background" args={["black"]} /> in the Canvas.
 */
export function SafeAsciiRenderer({
  fgColor,
  bgColor = "transparent",
  characters = " .:-+*=%@#",
  invert = true,
  resolution = 0.2,
  renderIndex = 1,
}: {
  fgColor: string;
  bgColor?: string;
  characters?: string;
  invert?: boolean;
  resolution?: number;
  renderIndex?: number;
}) {
  const { size, gl, scene, camera } = useThree();

  const effect = useMemo(() => {
    const e = new AsciiEffect(gl, characters, { invert, resolution });
    e.domElement.style.position = "absolute";
    e.domElement.style.top = "0px";
    e.domElement.style.left = "0px";
    e.domElement.style.pointerEvents = "none";
    return e;
  }, [gl, characters, invert, resolution]);

  /* Size BEFORE the first frame - this is the crash fix */
  useLayoutEffect(() => {
    effect.setSize(Math.max(1, size.width), Math.max(1, size.height));
  }, [effect, size]);

  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [effect, fgColor, bgColor]);

  /* Hide the raw WebGL canvas and overlay the ASCII table */
  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentNode;
    canvas.style.opacity = "0";
    parent?.appendChild(effect.domElement);
    return () => {
      canvas.style.opacity = "1";
      parent?.removeChild(effect.domElement);
    };
  }, [effect, gl]);

  useFrame(() => {
    if (size.width > 0 && size.height > 0) effect.render(scene, camera);
  }, renderIndex);

  return null;
}
