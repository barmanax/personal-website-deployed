"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FolderOpen } from "lucide-react";
import { ideFiles } from "./ide.config";

/**
 * Explorer-style file tree used as the site navigation.
 * Rendered in the desktop sidebar rail and inside the mobile drawer.
 * @param onNavigate - called after a link is clicked (mobile drawer closes itself)
 */
export function FileTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Site navigation" className="flex h-full flex-col font-mono text-[13px]">
      <p className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-ide-fg-muted">
        Explorer
      </p>

      {/* Root folder */}
      <div className="flex items-center gap-1 px-3 py-0.5 text-ide-fg">
        <ChevronDown size={14} className="shrink-0 text-ide-fg-muted" />
        <span className="font-semibold">portfolio</span>
      </div>

      {/* src folder */}
      <div className="flex items-center gap-1 py-0.5 pl-6 pr-3 text-ide-fg">
        <ChevronDown size={14} className="shrink-0 text-ide-fg-muted" />
        <FolderOpen size={14} className="shrink-0 text-ide-accent" />
        <span>src</span>
      </div>

      {/* Page files */}
      <ul>
        {ideFiles.map((f) => {
          const active = pathname === f.path;
          return (
            <li key={f.path}>
              <Link
                href={f.path}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 border-l-2 py-1 pl-10 pr-3 ${
                  active
                    ? "border-ide-accent bg-ide-bg-hover text-ide-fg"
                    : "border-transparent text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg"
                }`}
              >
                <f.icon size={14} className={`shrink-0 ${f.iconClass}`} />
                {f.file}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
