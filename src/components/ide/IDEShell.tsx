"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TitleBar } from "./TitleBar";
import { FileTree } from "./FileTree";
import { TabBar } from "./TabBar";
import { StatusBar } from "./StatusBar";

/* Ambient background simulation - client-only, no SSR value */
const GameOfLife = dynamic(
  () => import("@/components/fx/GameOfLife").then((m) => m.GameOfLife),
  { ssr: false }
);

/** localStorage key for the desktop sidebar preference */
const SIDEBAR_KEY = "ide-sidebar-open";

/**
 * The persistent IDE frame around every page.
 * Lives in the root layout, so navigation only swaps the editor pane -
 * the chrome (sidebar, tabs, status bar) never remounts.
 *
 * The editor pane (<main>) is the scroll container, not the window:
 * the frame stays fixed like a real editor.
 */
export function IDEShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* Restore the saved sidebar preference after mount (avoids hydration mismatch) */
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    if (saved !== null) setSidebarOpen(saved === "true");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((open) => {
      localStorage.setItem(SIDEBAR_KEY, String(!open));
      return !open;
    });
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <TitleBar
        onToggleSidebar={toggleSidebar}
        onToggleMobileNav={() => setMobileNavOpen(true)}
      />

      <div className="relative flex min-h-0 flex-1">
        {/* Desktop sidebar rail */}
        <aside
          className={`hidden shrink-0 overflow-hidden border-r border-ide-border bg-ide-bg-alt transition-[width] duration-200 lg:block ${
            sidebarOpen ? "w-56" : "w-0 border-r-0"
          }`}
        >
          <div className="w-56">
            <FileTree />
          </div>
        </aside>

        {/* Mobile drawer + backdrop */}
        {mobileNavOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-ide-border bg-ide-bg-alt lg:hidden">
              <FileTree onNavigate={() => setMobileNavOpen(false)} />
            </aside>
          </>
        )}

        {/* Editor column - relative so the ambient canvas can sit behind the pane */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          <GameOfLife />
          <TabBar />
          <main id="editor-pane" className="relative z-10 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
