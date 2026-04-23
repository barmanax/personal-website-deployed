"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders a dark overlay with a transparent radial gradient centered on the
 * cursor, creating a "flashlight" effect in dark mode.
 *
 * The overlay sits above page content (z-30) but uses pointer-events-none so
 * it never blocks clicks or hover states. We defer rendering until after mount
 * to avoid a next-themes hydration mismatch on resolvedTheme.
 */
export function CursorLight() {
  const { resolvedTheme } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el || resolvedTheme !== "dark") return;

    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--cx", `${e.clientX}px`);
      el.style.setProperty("--cy", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        // Start the light off-screen until the mouse enters the window
        background:
          "radial-gradient(circle 220px at var(--cx, -500px) var(--cy, -500px), transparent 0%, rgba(0,0,0,0.82) 100%)",
      }}
    />
  );
}
