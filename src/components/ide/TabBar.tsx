"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ideFiles } from "./ide.config";

/**
 * Editor tab strip - all four pages are permanently "open" tabs.
 * The active tab is derived from the current route (no local state),
 * so deep links, back/forward, and prefetching all work for free.
 */
export function TabBar() {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      aria-label="Open files"
      className="flex shrink-0 overflow-x-auto border-b border-ide-border bg-ide-bg-alt font-mono text-xs"
    >
      {ideFiles.map((f) => {
        const active = pathname === f.path;
        return (
          <Link
            key={f.path}
            href={f.path}
            role="tab"
            aria-selected={active}
            className={`group relative flex shrink-0 items-center gap-1.5 border-r border-ide-border px-3 py-2 ${
              active
                ? "bg-ide-bg text-ide-fg"
                : "text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg"
            }`}
          >
            {/* Accent indicator on the active tab */}
            {active && (
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ide-accent" />
            )}
            <f.icon size={13} className={`shrink-0 ${f.iconClass}`} />
            {f.file}
            {/* Decorative close glyph, VS Code style */}
            <X
              size={12}
              aria-hidden
              className={active ? "text-ide-fg-muted" : "invisible group-hover:visible text-ide-fg-muted"}
            />
          </Link>
        );
      })}
    </div>
  );
}
