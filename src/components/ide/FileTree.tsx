"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { ideFiles } from "./ide.config";
import { ScrambleText } from "@/components/fx/ScrambleText";

/**
 * Explorer-style file tree used as the site navigation.
 * Folders expand/collapse like a real editor; page files live under
 * portfolio/src. Rendered in the desktop sidebar rail and the mobile drawer.
 * @param onNavigate - called after a link is clicked (mobile drawer closes itself)
 */
export function FileTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);

  return (
    <nav aria-label="Site navigation" className="flex h-full flex-col font-mono text-[13px]">
      <p className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-ide-fg-muted">
        Explorer
      </p>

      {/* Root folder */}
      <button
        onClick={() => setPortfolioOpen((open) => !open)}
        aria-expanded={portfolioOpen}
        className="flex w-full items-center gap-1 px-3 py-0.5 text-left text-ide-fg hover:bg-ide-bg-hover"
      >
        {portfolioOpen ? (
          <ChevronDown size={14} className="shrink-0 text-ide-fg-muted" />
        ) : (
          <ChevronRight size={14} className="shrink-0 text-ide-fg-muted" />
        )}
        <span className="font-semibold">portfolio</span>
      </button>

      {portfolioOpen && (
        <>
          {/* src folder */}
          <button
            onClick={() => setSrcOpen((open) => !open)}
            aria-expanded={srcOpen}
            className="flex w-full items-center gap-1 py-0.5 pl-6 pr-3 text-left text-ide-fg hover:bg-ide-bg-hover"
          >
            {srcOpen ? (
              <ChevronDown size={14} className="shrink-0 text-ide-fg-muted" />
            ) : (
              <ChevronRight size={14} className="shrink-0 text-ide-fg-muted" />
            )}
            {srcOpen ? (
              <FolderOpen size={14} className="shrink-0 text-ide-accent" />
            ) : (
              <Folder size={14} className="shrink-0 text-ide-accent" />
            )}
            <span>src</span>
          </button>

          {/* Page files */}
          {srcOpen && (
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
                      <ScrambleText text={f.file} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </nav>
  );
}
