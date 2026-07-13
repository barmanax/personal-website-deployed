"use client";

import { ideFiles } from "./ide.config";

/**
 * Shown in the editor pane when every tab has been closed - the IDE
 * equivalent of VS Code's empty-workspace welcome page. The "recent files"
 * list reopens tabs, so closing everything is a detour, not a dead end.
 */

/* figlet-style "ADITYA" banner (standard font) */
const BANNER = String.raw`
    _    ____ ___ _____ __   __ _
   / \  |  _ \_ _|_   _|\ \ / // \
  / _ \ | | | || |  | |  \ V // _ \
 / ___ \| |_| || |  | |   | |/ ___ \
/_/   \_\____/|___| |_|   |_/_/   \_\
`;

export function WelcomeScreen({
  onOpenFile,
}: {
  onOpenFile: (path: string) => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 font-mono">
      <pre
        aria-label="Aditya"
        className="mb-6 select-none text-[7px] leading-tight text-ide-accent sm:text-[10px] md:text-xs"
      >
        {BANNER}
      </pre>

      <p className="mb-10 text-sm text-ide-fg-muted">no files open</p>

      <div className="w-full max-w-xs">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-ide-fg-muted">
          Recent
        </p>
        <ul className="space-y-1">
          {ideFiles.map((f) => (
            <li key={f.path}>
              <button
                onClick={() => onOpenFile(f.path)}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm
                           text-ide-fg-muted hover:bg-ide-bg-hover hover:text-ide-fg"
              >
                <f.icon size={14} className={`shrink-0 ${f.iconClass}`} />
                {f.file}
                <span className="ml-auto text-xs text-ide-fg-muted/60">
                  ~/portfolio/src
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-ide-fg-muted/70">
          <span className="text-syn-comment">{"// "}</span>
          or pick a file from the explorer
        </p>
      </div>
    </div>
  );
}
