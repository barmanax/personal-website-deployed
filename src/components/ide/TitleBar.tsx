"use client";

import { Menu, PanelLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/data/content";

/**
 * Editor window title bar - decorative window dots, workspace title,
 * sidebar toggle (desktop) / drawer toggle (mobile), and theme switch.
 */
export function TitleBar({
  onToggleSidebar,
  onToggleMobileNav,
}: {
  onToggleSidebar: () => void;
  onToggleMobileNav: () => void;
}) {
  return (
    <header className="relative flex h-10 shrink-0 items-center gap-3 border-b border-ide-border bg-ide-bg-alt px-3 font-mono text-xs">
      {/* macOS-style window dots - purely decorative */}
      <div aria-hidden className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Sidebar toggle - desktop only */}
      <button
        onClick={onToggleSidebar}
        className="hidden rounded p-1 text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg lg:block"
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={15} />
      </button>

      {/* Mobile nav toggle */}
      <button
        onClick={onToggleMobileNav}
        className="rounded p-1 text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={15} />
      </button>

      {/* Centered workspace title */}
      <p className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 text-ide-fg-muted sm:block">
        {siteConfig.name.toLowerCase().replace(" ", "-")} - portfolio
      </p>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
