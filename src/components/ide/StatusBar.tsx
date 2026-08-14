"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, GitBranch, Github, Linkedin, Mail } from "lucide-react";
import { fileForPath, LINE_HEIGHT_PX } from "./ide.config";
import { siteConfig } from "@/data/content";

/**
 * Derives an honest-but-playful "Ln" readout from the editor pane's scroll
 * position - scrolling the page moves the cursor line, like a real editor.
 *
 * Shares LINE_HEIGHT_PX with the gutter, so this number now matches the line
 * number actually rendered at the top of the pane rather than approximating it.
 */
function useEditorLine(): number {
  const [line, setLine] = useState(1);

  useEffect(() => {
    const pane = document.getElementById("editor-pane");
    if (!pane) return;

    const onScroll = () =>
      setLine(Math.floor(pane.scrollTop / LINE_HEIGHT_PX) + 1);
    onScroll();
    pane.addEventListener("scroll", onScroll, { passive: true });
    return () => pane.removeEventListener("scroll", onScroll);
  }, []);

  return line;
}

const socialLinks = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

/**
 * IDE status bar - replaces the traditional footer.
 * Shows git-style readouts on the left and file/social info on the right.
 */
export function StatusBar() {
  const pathname = usePathname();
  const file = fileForPath(pathname);
  const line = useEditorLine();

  return (
    <footer className="flex h-6 shrink-0 items-center gap-4 border-t border-ide-border bg-ide-bg-alt px-3 font-mono text-[11px] text-ide-fg-muted">
      <span className="flex items-center gap-1">
        <GitBranch size={11} />
        main
      </span>
      <span className="hidden items-center gap-1 sm:flex">
        <Check size={11} />
        0 errors
      </span>

      <span className="ml-auto hidden sm:block">Ln {line}, Col 1</span>
      <span className="hidden sm:block">{file?.language ?? "Plain Text"}</span>
      <span className="hidden md:block">UTF-8</span>

      {/* Social links - the footer's job, relocated to the status bar.
          ml-auto only below sm, where the readouts that normally push
          right are hidden */}
      <span className="ml-auto flex items-center gap-3 sm:ml-0">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="hover:text-ide-fg"
          >
            <link.icon size={12} />
          </a>
        ))}
      </span>
    </footer>
  );
}
