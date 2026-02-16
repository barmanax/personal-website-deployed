"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { SplinePlaceholder } from "@/components/SplinePlaceholder";
import { siteConfig, aboutText, techStack } from "@/data/content";

/** Home page — hero section, about blurb, and tech stack display */
export default function Home() {
  return (
    <PageTransition>
      {/* ── Hero Section ── */}
      <section className="section-container">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — Intro text */}
          <FadeIn className="flex-1 space-y-6 text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hey, I&apos;m{" "}
              <span className="text-accent">{siteConfig.name}</span>
            </h1>
            <p className="max-w-lg text-lg text-surface-500 dark:text-surface-400">
              {siteConfig.description}
            </p>
          </FadeIn>

          {/* Right — 3D Avatar placeholder */}
          <FadeIn delay={0.2} className="flex-1">
            <SplinePlaceholder />
          </FadeIn>
        </div>
      </section>

      {/* ── About Blurb ── */}
      <section className="section-container border-t border-surface-200 dark:border-surface-800">
        <FadeIn>
          <h2 className="section-heading mb-6">About Me</h2>
          <p className="max-w-2xl text-surface-600 dark:text-surface-400 leading-relaxed">
            {aboutText}
          </p>
        </FadeIn>
      </section>

      {/* ── Tech Stack ── */}
      <section className="section-container border-t border-surface-200 dark:border-surface-800">
        <FadeIn>
          <h2 className="section-heading mb-8">Tech Stack</h2>
        </FadeIn>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.03}>
              <span
                className="rounded-full border border-surface-200 dark:border-surface-700
                           bg-surface-50 dark:bg-surface-900 px-4 py-2 text-sm font-medium
                           text-surface-700 dark:text-surface-300 hover:border-accent/50
                           hover:text-accent transition-colors cursor-default"
              >
                {tech.name}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
