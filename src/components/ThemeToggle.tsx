"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Animated theme toggle button.
 * Uses useEffect to avoid hydration mismatch -the icon only renders
 * after mount when we know the actual resolved theme.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    /* Render a placeholder the same size to prevent layout shift */
    return <div className="h-7 w-7" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-7 w-7 items-center justify-center rounded
                 text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg
                 transition-colors"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
