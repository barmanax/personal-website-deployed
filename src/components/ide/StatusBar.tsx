"use client";

import { usePathname } from "next/navigation";
import { Check, GitBranch, Github, Linkedin, Mail } from "lucide-react";
import { fileForPath } from "./ide.config";
import { siteConfig } from "@/data/content";

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

      <span className="ml-auto hidden sm:block">{file?.language ?? "Plain Text"}</span>
      <span className="hidden md:block">UTF-8</span>

      {/* Social links - the footer's job, relocated to the status bar */}
      <span className="flex items-center gap-3">
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
