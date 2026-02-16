import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/content";

const socialLinks = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

/** Minimal footer with copyright and social icon links */
export function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-surface-500 dark:text-surface-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-surface-900 dark:text-surface-500
                         dark:hover:text-surface-100 transition-colors"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
