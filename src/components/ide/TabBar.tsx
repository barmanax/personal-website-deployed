"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ideFiles } from "./ide.config";
import { ScrambleText } from "@/components/fx/ScrambleText";

/**
 * Editor tab strip. Tabs are closeable like a real editor: the open set
 * and close behavior live in IDEShell; the active tab is still derived
 * from the current route. Closing every tab reveals the welcome screen.
 */
export function TabBar({
  openTabs,
  onClose,
}: {
  /** Paths of currently open tabs, in the order they should render */
  openTabs: string[];
  onClose: (path: string) => void;
}) {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      aria-label="Open files"
      className="flex min-h-[33px] shrink-0 overflow-x-auto border-b border-ide-border bg-ide-bg-alt font-mono text-xs"
    >
      {openTabs.map((path) => {
        const f = ideFiles.find((file) => file.path === path);
        if (!f) return null;
        const active = pathname === f.path;

        return (
          <div
            key={f.path}
            className={`group relative flex shrink-0 items-stretch border-r border-ide-border ${
              active
                ? "bg-ide-bg text-ide-fg"
                : "text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg"
            }`}
          >
            {/* Accent indicator on the active tab */}
            {active && (
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ide-accent" />
            )}

            <Link
              href={f.path}
              role="tab"
              aria-selected={active}
              className="flex items-center gap-1.5 py-2 pl-3"
            >
              <f.icon size={13} className={`shrink-0 ${f.iconClass}`} />
              <ScrambleText text={f.file} />
            </Link>

            <button
              onClick={() => onClose(f.path)}
              aria-label={`Close ${f.file}`}
              className={`flex items-center rounded-sm px-1.5 text-ide-fg-muted hover:text-ide-fg ${
                active ? "" : "invisible group-hover:visible"
              }`}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
