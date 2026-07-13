"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { projects, siteConfig, Project } from "@/data/content";
import { Github, ExternalLink } from "lucide-react";

/** Projects page - responsive card grid showcasing portfolio work */
export default function ProjectsPage() {
  return (
    <section className="section-container">
      <FadeIn>
        <h1 className="section-heading mb-4">
          <span className="code-comment">{"// "}</span>Projects
        </h1>
        <p className="mb-12 text-ide-fg-muted">
          A selection of things I&apos;ve built and explored.
        </p>
      </FadeIn>

      {/* Responsive card grid - 1 col on mobile, 2 on larger screens */}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* GitHub CTA */}
      <FadeIn delay={projects.length * 0.1}>
        <p className="mt-12 text-center text-ide-fg-muted">
          …and much more on my{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ide-accent hover:underline"
          >
            GitHub
          </a>
        </p>
      </FadeIn>
    </section>
  );
}

/**
 * Project card styled as a mini editor window: a title-bar strip with
 * window dots and the project name, then thumbnail and body.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="glitch-card group flex h-full flex-col overflow-hidden rounded-md border border-ide-border
                   bg-ide-bg-alt/50 transition-all duration-300
                   hover:-translate-y-1 hover:border-ide-accent/60 hover:shadow-lg"
      >
        {/* Mini title bar */}
        <div className="flex items-center gap-2 border-b border-ide-border bg-ide-bg-alt px-3 py-2">
          <div aria-hidden className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="truncate font-mono text-xs text-ide-fg-muted">
            {project.title.toLowerCase().replace(/[\s.]+/g, "-")}
          </span>
          <span className="ml-auto shrink-0 font-mono text-[10px] text-ide-fg-muted">
            {project.date}
          </span>
        </div>

        {/* Thumbnail */}
        {project.image && (
          <div className="relative h-44 w-full overflow-hidden bg-ide-bg-hover">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 font-mono text-lg font-semibold text-ide-fg transition-colors group-hover:text-ide-accent">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-ide-fg-muted">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mb-4 mt-auto flex flex-wrap gap-1.5">
            {project.techTags.map((tag) => (
              <span key={tag} className="code-chip">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-ide-fg-muted transition-colors hover:text-ide-accent"
              >
                <Github size={14} />
                code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-ide-fg-muted transition-colors hover:text-ide-accent"
              >
                <ExternalLink size={14} />
                live
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
