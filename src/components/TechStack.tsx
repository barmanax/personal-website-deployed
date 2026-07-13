"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { techStack, TechCategory } from "@/data/content";

/** Tab definitions -id maps to TechCategory (or "all" for no filter) */
const TABS: { id: "all" | TechCategory; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend",   label: "Backend" },
  { id: "data",      label: "Data Engineering" },
];

/**
 * Interactive tech stack section with tab-based category filtering.
 * Skills tagged with multiple categories will appear under each matching tab.
 *
 * Uses Framer Motion's AnimatePresence (not the scroll-triggered FadeIn) so
 * pills animate in/out correctly on every tab switch, not just on first scroll.
 */
export function TechStack() {
  const [activeTab, setActiveTab] = useState<"all" | TechCategory>("all");

  // Filter to skills that belong to the active tab; "all" shows everything
  const visible = activeTab === "all"
    ? techStack
    : techStack.filter((tech) => tech.categories.includes(activeTab));

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 overflow-x-auto border-b border-ide-border font-mono">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "shrink-0 px-4 py-2 text-sm transition-colors -mb-px",
              activeTab === tab.id
                // Active: accent underline that sits flush on the container border
                ? "text-ide-accent border-b-2 border-ide-accent font-semibold"
                : "text-ide-fg-muted hover:text-ide-fg",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill pills -AnimatePresence tracks which keys enter/exit the DOM */}
      <div className="flex flex-wrap gap-3">
        <AnimatePresence mode="popLayout">
          {visible.map((tech) => {
            // Shared Tailwind classes for both linked and non-linked pills
            const pillClass =
              "whitespace-nowrap rounded border border-ide-border bg-ide-bg-alt " +
              "px-3 py-1.5 font-mono text-sm text-ide-fg-muted " +
              "hover:border-ide-accent/60 hover:text-ide-accent transition-colors";

            const motionProps = {
              key: tech.name,
              // Scale + fade: pills pop in from slightly smaller, shrink away on exit
              initial: { opacity: 0, scale: 0.85 },
              animate: { opacity: 1, scale: 1 },
              exit:    { opacity: 0, scale: 0.85 },
              transition: { duration: 0.15 },
            };

            return tech.link ? (
              <motion.a
                {...motionProps}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={pillClass + " cursor-pointer"}
              >
                {tech.name}
              </motion.a>
            ) : (
              <motion.span {...motionProps} className={pillClass + " cursor-default"}>
                {tech.name}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
