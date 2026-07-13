"use client";

import dynamic from "next/dynamic";
import { FadeIn } from "@/components/FadeIn";
import { HeroCarousel } from "@/components/HeroCarousel";
import { siteConfig, aboutText } from "@/data/content";
import { TechStack } from "@/components/TechStack";

/* Client-only WebGL background - code-split and skipped during SSR */
const HeroShader = dynamic(
  () => import("@/components/fx/HeroShader").then((m) => m.HeroShader),
  { ssr: false }
);

/** Home page - hero section, about blurb, and tech stack display */
export default function Home() {
  return (
    <>
      {/* ── Hero Section ── */}
      {/* relative isolate scopes the shader's -z-10 to this section */}
      <section className="section-container relative isolate">
        <HeroShader />
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left - Intro text */}
          <FadeIn className="flex-1 space-y-6 text-center lg:text-left">
            <p className="code-comment text-sm">
              {"// "}{siteConfig.tagline}
            </p>
            <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-syn-keyword">const</span>{" "}
              <span className="text-syn-func">me</span>{" "}
              <span className="text-ide-fg-muted">=</span>{" "}
              <span className="text-ide-accent">&quot;{siteConfig.name}&quot;</span>
            </h1>
            <p className="mx-auto max-w-lg text-lg text-ide-fg-muted lg:mx-0">
              {siteConfig.description}
            </p>
          </FadeIn>

          {/* Right - Hero carousel with avatar and photos */}
          <FadeIn delay={0.2} className="w-full flex-1">
            <HeroCarousel />
          </FadeIn>
        </div>
      </section>

      {/* ── About Blurb ── */}
      <section className="section-container border-t border-ide-border">
        <FadeIn>
          <h2 className="section-heading mb-6">
            <span className="code-comment">{"// "}</span>About Me
          </h2>
          <p className="max-w-2xl leading-relaxed text-ide-fg-muted">
            {aboutText}
          </p>
        </FadeIn>
      </section>

      {/* ── Tech Stack ── */}
      <section className="section-container border-t border-ide-border">
        <FadeIn>
          <h2 className="section-heading mb-8">
            <span className="code-comment">{"// "}</span>Tech Stack
          </h2>
        </FadeIn>
        <TechStack />
      </section>
    </>
  );
}
