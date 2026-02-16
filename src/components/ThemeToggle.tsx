"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Animated theme toggle button.
 * Uses useEffect to avoid hydration mismatch — the icon only renders
 * after mount when we know the actual resolved theme.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    /* Render a placeholder the same size to prevent layout shift */
    return <div className="h-9 w-9" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full
                 text-surface-600 hover:text-surface-900 dark:text-surface-400
                 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800
                 transition-colors"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
