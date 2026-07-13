"use client";

import { FadeIn } from "@/components/FadeIn";
import { experience, education, ExperienceEntry, EducationEntry } from "@/data/content";
import { Briefcase, GraduationCap } from "lucide-react";

/** Experience page - vertical work timeline followed by an education section */
export default function ExperiencePage() {
  return (
    <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Experience</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            My journey so far - work experience and education.
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

        {/* Education */}
        <FadeIn>
          <h2 className="section-heading mb-8 mt-20">Education</h2>
        </FadeIn>
        <div className="space-y-6">
          {education.map((entry, i) => (
            <EducationCard key={entry.institution} entry={entry} index={i} />
          ))}
        </div>
    </section>
  );
}

/** Single timeline entry - icon, title, organization, location, dates, and bullets */
function TimelineEntry({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1} className="relative pl-12 sm:pl-20">
      {/* Timeline dot */}
      <div
        className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center
                   rounded-full border-2 border-surface-200 dark:border-surface-700
                   bg-white dark:bg-surface-950 sm:left-5"
      >
        <Briefcase size={14} className="text-accent" />
      </div>

      {/* Content card */}
      <div
        className="rounded-xl border border-surface-200 dark:border-surface-800
                   bg-surface-50 dark:bg-surface-900/50 p-6"
      >
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">{entry.title}</h3>
          <span className="text-sm text-surface-500 dark:text-surface-500">
            {entry.startDate} - {entry.endDate}
          </span>
        </div>
        <p className="mb-3 text-sm font-medium text-accent">
          {entry.organization}
          <span className="text-surface-500 dark:text-surface-500 font-normal">
            {" "}· {entry.location}
          </span>
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

/** Education card - degree, institution, GPA/honors, and coursework chips */
function EducationCard({
  entry,
  index,
}: {
  entry: EducationEntry;
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="rounded-xl border border-surface-200 dark:border-surface-800
                   bg-surface-50 dark:bg-surface-900/50 p-6"
      >
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap size={18} className="text-accent" />
            {entry.institution}
          </h3>
          <span className="text-sm text-surface-500 dark:text-surface-500">
            {entry.graduation}
          </span>
        </div>
        <p className="mb-1 text-sm font-medium text-accent">
          {entry.degree}
          <span className="text-surface-500 dark:text-surface-500 font-normal">
            {" "}· {entry.location}
          </span>
        </p>

        {(entry.gpa || entry.honors) && (
          <p className="mb-3 text-sm text-surface-600 dark:text-surface-400">
            {entry.gpa && <span>GPA: {entry.gpa}</span>}
            {entry.gpa && entry.honors && <span> · </span>}
            {entry.honors?.join(" · ")}
          </p>
        )}

        {entry.activities && (
          <ul className="mb-3 space-y-1.5">
            {entry.activities.map((activity) => (
              <li
                key={activity}
                className="text-sm text-surface-600 dark:text-surface-400 before:mr-2 before:content-['▹'] before:text-accent"
              >
                {activity}
              </li>
            ))}
          </ul>
        )}

        {entry.coursework && (
          <div className="flex flex-wrap gap-2">
            {entry.coursework.map((course) => (
              <span
                key={course}
                className="rounded-full bg-surface-100 dark:bg-surface-800 px-3 py-1
                           text-xs font-medium text-surface-600 dark:text-surface-400"
              >
                {course}
              </span>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
