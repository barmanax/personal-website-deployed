"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { experience, ExperienceEntry } from "@/data/content";
import { Briefcase, GraduationCap } from "lucide-react";

/** Experience page — vertical timeline showing work and education history */
export default function ExperiencePage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Experience</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            My journey so far — work experience and education.
          </p>
        </FadeIn>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-surface-200 dark:bg-surface-800 sm:left-8" />

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

/**
 * Single timeline entry — renders an icon, title, organization, dates, and bullets.
 * Work entries get a briefcase icon; education entries get a graduation cap.
 */
function TimelineEntry({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const Icon = entry.type === "work" ? Briefcase : GraduationCap;

  return (
    <FadeIn delay={index * 0.1} className="relative pl-12 sm:pl-20">
      {/* Timeline dot */}
      <div
        className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center
                   rounded-full border-2 border-surface-200 dark:border-surface-700
                   bg-white dark:bg-surface-950 sm:left-5"
      >
        <Icon size={14} className="text-accent" />
      </div>

      {/* Content card */}
      <div
        className="rounded-xl border border-surface-200 dark:border-surface-800
                   bg-surface-50 dark:bg-surface-900/50 p-6"
      >
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">{entry.title}</h3>
          <span className="text-sm text-surface-500 dark:text-surface-500">
            {entry.startDate} — {entry.endDate}
          </span>
        </div>
        <p className="mb-3 text-sm font-medium text-accent">
          {entry.organization}
        </p>
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet, j) => (
            <li
              key={j}
              className="text-sm text-surface-600 dark:text-surface-400 before:mr-2 before:content-['▹'] before:text-accent"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}
