"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Glyph pool the scramble resolves out of */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#";
/** Total animation frames (~200ms at 60fps) */
const TOTAL_FRAMES = 12;

/**
 * Text that "decrypts" on hover: characters flicker through random glyphs
 * and resolve left-to-right. Designed for monospace text so the width never
 * shifts during the animation.
 *
 * @param trigger - "parent" listens for hover on the parent element (use
 *   inside links/tabs so the whole hit area triggers it); "self" listens on
 *   the span itself (use for standalone headings)
 *
 * Skipped on touch devices (hover: none) and for prefers-reduced-motion.
 */
export function ScrambleText({
  text,
  className,
  trigger = "parent",
}: {
  text: string;
  className?: string;
  trigger?: "parent" | "self";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const animating = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  /* Keep display in sync if the text prop changes */
  useEffect(() => setDisplay(text), [text]);

  useEffect(() => {
    const el = ref.current;
    const target = trigger === "parent" ? el?.parentElement : el;
    if (!el || !target) return;
    if (reducedMotion || !window.matchMedia("(hover: hover)").matches) return;

    let rafId = 0;

    const onEnter = () => {
      if (animating.current) return;
      animating.current = true;
      let frame = 0;

      const tick = () => {
        frame++;
        // Characters left of the progress point are resolved; the rest flicker
        const resolved = Math.floor((frame / TOTAL_FRAMES) * text.length);
        let out = text.slice(0, resolved);
        for (let i = resolved; i < text.length; i++) {
          out +=
            text[i] === " "
              ? " "
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);

        if (frame < TOTAL_FRAMES) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
          animating.current = false;
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    target.addEventListener("mouseenter", onEnter);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
      animating.current = false;
    };
  }, [text, trigger, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
