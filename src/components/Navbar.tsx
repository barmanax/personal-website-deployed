"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/data/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/connect", label: "Connect" },
];

/**
 * Fixed top navbar with glass/blur backdrop effect.
 * Collapses into a hamburger menu on mobile.
 */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-accent transition-colors"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg
                       text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-surface-200 dark:border-surface-800 px-6 py-4 md:hidden glass">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
