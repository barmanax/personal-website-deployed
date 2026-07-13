"use client";

import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/data/content";
import { Github, Linkedin, Mail } from "lucide-react";

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

/** Connect page -social links */
export default function ConnectPage() {
  return (
    <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Let&apos;s Connect</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            Feel free to reach out. I&apos;m always open to interesting conversations
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
    </section>
  );
}
