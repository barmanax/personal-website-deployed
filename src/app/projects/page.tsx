"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { projects, Project } from "@/data/content";
import { Github, ExternalLink } from "lucide-react";

/** Projects page — responsive card grid showcasing portfolio work */
export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Projects</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            A selection of things I&apos;ve built and explored.
          </p>
        </FadeIn>

        {/* Responsive card grid — 1 col on mobile, 2 on larger screens */}
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

/**
 * Project card with thumbnail, title, description, tech tags, and links.
 * Hover effect lifts the card and highlights the border.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="group overflow-hidden rounded-xl border border-surface-200
                   dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50
                   transition-all duration-300 hover:border-accent/40
                   hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
      >
        {/* Thumbnail */}
        {project.image && (
          <div className="relative h-48 w-full overflow-hidden bg-surface-100 dark:bg-surface-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-lg font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-100 dark:bg-surface-800 px-3 py-1
                           text-xs font-medium text-surface-600 dark:text-surface-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-surface-500
                           hover:text-accent transition-colors"
              >
                <Github size={16} />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-surface-500
                           hover:text-accent transition-colors"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
