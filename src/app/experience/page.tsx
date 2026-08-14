"use client";

import { FadeIn } from "@/components/FadeIn";
import { experience, education, ExperienceEntry, EducationEntry } from "@/data/content";
import { Briefcase, GraduationCap } from "lucide-react";

/** Experience page - vertical work timeline followed by an education section */
export default function ExperiencePage() {
  return (
    <section className="section-container">
      <FadeIn>
        <h1 className="section-heading mb-4">
          <span className="code-comment">{"// "}</span>Experience
        </h1>
        <p className="mb-12 text-ide-fg-muted">
          My journey so far - work experience and education.
        </p>
      </FadeIn>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-px bg-ide-border sm:left-8" />

        <div className="space-y-12">
          {experience.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>

      {/* Education */}
      <FadeIn>
        <h2 className="section-heading mb-8 mt-20">
          <span className="code-comment">{"// "}</span>Education
        </h2>
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
                   rounded-full border-2 border-ide-border bg-ide-bg sm:left-5"
      >
        <Briefcase size={14} className="text-ide-accent" />
      </div>

      {/* Content card */}
      <div className="rounded-md border border-ide-border bg-ide-bg-alt/50 p-6">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-ide-fg">{entry.title}</h3>
          <span className="code-chip shrink-0">
            {entry.startDate} - {entry.endDate}
          </span>
        </div>
        <p className="mb-3 text-sm font-medium text-ide-accent">
          {entry.organization}
          <span className="font-normal text-ide-fg-muted"> · {entry.location}</span>
        </p>
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet, j) => (
            <li
              key={j}
              className="text-sm text-ide-fg-muted before:mr-2 before:content-['▹'] before:text-ide-accent"
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
      <div className="rounded-md border border-ide-border bg-ide-bg-alt/50 p-6">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ide-fg">
            <GraduationCap size={18} className="text-ide-accent" />
            {entry.institution}
          </h3>
          {entry.graduation && (
            <span className="code-chip shrink-0">{entry.graduation}</span>
          )}
        </div>
        <p className="mb-1 text-sm font-medium text-ide-accent">
          {entry.degree}
          <span className="font-normal text-ide-fg-muted"> · {entry.location}</span>
        </p>

        {(entry.gpa || entry.honors) && (
          <p className="mb-3 text-sm text-ide-fg-muted">
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
                className="text-sm text-ide-fg-muted before:mr-2 before:content-['▹'] before:text-ide-accent"
              >
                {activity}
              </li>
            ))}
          </ul>
        )}

        {entry.coursework && (
          <div className="flex flex-wrap gap-2">
            {entry.coursework.map((course) => (
              <span key={course} className="code-chip">
                {course}
              </span>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
