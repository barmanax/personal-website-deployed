"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { TitleBar } from "./TitleBar";
import { FileTree } from "./FileTree";
import { TabBar } from "./TabBar";
import { StatusBar } from "./StatusBar";
import { WelcomeScreen } from "./WelcomeScreen";
import { ideFiles, fileForPath } from "./ide.config";

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
 * Owns the open-tab set: tabs close like a real editor (closing the active
 * tab activates its neighbor), navigating to a route reopens its tab, and
 * closing everything shows the welcome screen instead of page content.
 */
export function IDEShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openTabs, setOpenTabs] = useState<string[]>(() =>
    ideFiles.map((f) => f.path)
  );
  const prevPathname = useRef(pathname);

  /* Restore the saved sidebar preference after mount (avoids hydration mismatch) */
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    if (saved !== null) setSidebarOpen(saved === "true");
  }, []);

  /*
   * Navigating to a route (link, back button, deep link) reopens its tab.
   * Only reacts to actual pathname CHANGES - otherwise closing the active
   * tab would immediately reopen itself.
   */
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    if (fileForPath(pathname)) {
      setOpenTabs((tabs) =>
        tabs.includes(pathname) ? tabs : [...tabs, pathname]
      );
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarOpen((open) => {
      localStorage.setItem(SIDEBAR_KEY, String(!open));
      return !open;
    });
  };

  /** Reopen a tab (and navigate to it) - used by FileTree and WelcomeScreen */
  const openTab = (path: string) => {
    setOpenTabs((tabs) => (tabs.includes(path) ? tabs : [...tabs, path]));
    if (path !== pathname) router.push(path);
  };

  /** Close a tab; closing the active one activates its nearest neighbor */
  const closeTab = (path: string) => {
    const index = openTabs.indexOf(path);
    const remaining = openTabs.filter((p) => p !== path);
    setOpenTabs(remaining);
    if (path === pathname && remaining.length > 0) {
      router.push(remaining[Math.min(index, remaining.length - 1)]);
    }
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
            <FileTree onOpenFile={openTab} />
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
              <FileTree
                onOpenFile={openTab}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </aside>
          </>
        )}

        {/* Editor column - relative so the ambient canvas can sit behind the pane */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          <GameOfLife />
          <TabBar openTabs={openTabs} onClose={closeTab} />
          <main id="editor-pane" className="relative z-10 flex-1 overflow-y-auto">
            {openTabs.length === 0 ? (
              <WelcomeScreen onOpenFile={openTab} />
            ) : (
              children
            )}
          </main>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
