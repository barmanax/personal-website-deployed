"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders a soft radial glow that follows the cursor in dark mode.
 * Uses an additive approach (glow element at cursor) rather than a subtractive
 * overlay, so it brightens the cursor area without dimming the rest of the page.
 */
export function CursorLight() {
  const { resolvedTheme } = useTheme();
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = glowRef.current;
    if (!el || resolvedTheme !== "dark") return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)",
        // Start off-screen until mouse enters
        left: "-500px",
        top: "-500px",
      }}
    />
  );
}
