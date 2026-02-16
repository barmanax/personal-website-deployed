"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/data/content";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const socialLinks = [
  {
    href: siteConfig.github,
    icon: Github,
    label: "GitHub",
    description: "Check out my code",
  },
  {
    href: siteConfig.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    description: "Let's connect professionally",
  },
  {
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    label: "Email",
    description: siteConfig.email,
  },
];

/** Connect page — social links and resume viewer */
export default function ConnectPage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Let&apos;s Connect</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            Feel free to reach out — I&apos;m always open to interesting conversations
            and opportunities.
          </p>
        </FadeIn>

        {/* Social links grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {socialLinks.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-xl border
                           border-surface-200 dark:border-surface-800 bg-surface-50
                           dark:bg-surface-900/50 p-8 text-center transition-all
                           duration-300 hover:border-accent/40 hover:-translate-y-1
                           hover:shadow-lg hover:shadow-accent/5"
              >
                <link.icon
                  size={28}
                  className="text-surface-500 group-hover:text-accent transition-colors"
                />
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  {link.description}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Resume section */}
        <FadeIn>
          <div className="rounded-xl border border-surface-200 dark:border-surface-800 overflow-hidden">
            <div className="flex items-center justify-between bg-surface-50 dark:bg-surface-900/50 px-6 py-4">
              <h2 className="text-xl font-semibold">Resume</h2>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2
                           text-sm font-medium text-white hover:bg-accent-dark
                           transition-colors"
              >
                <FileDown size={16} />
                Download
              </a>
            </div>

            {/* PDF embed — falls back gracefully if no PDF is present */}
            <div className="relative h-[600px] w-full bg-surface-100 dark:bg-surface-900">
              <iframe
                src="/resume.pdf"
                className="h-full w-full"
                title="Resume"
              />
              {/* Fallback message if iframe doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-surface-400 dark:text-surface-600 text-sm">
                  Place your resume.pdf in the /public folder
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
