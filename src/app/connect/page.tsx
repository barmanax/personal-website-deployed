"use client";

import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/data/content";
import { Github, Linkedin, Mail } from "lucide-react";

/** Connect links rendered as key/value pairs of a JSON object */
const connectEntries = [
  {
    key: "github",
    value: "github.com/barmanax",
    href: siteConfig.github,
    icon: Github,
  },
  {
    key: "linkedin",
    value: "linkedin.com/in/adityabarman",
    href: siteConfig.linkedin,
    icon: Linkedin,
  },
  {
    key: "email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

/**
 * Connect page - the social links presented as an editable connect.json
 * file: keys in keyword color, values as clickable strings, line numbers
 * in the gutter. On-theme but still instantly scannable.
 */
export default function ConnectPage() {
  return (
    <section className="section-container">
      <FadeIn>
        <h1 className="section-heading mb-4">
          <span className="code-comment">{"// "}</span>Let&apos;s Connect
        </h1>
        <p className="mb-12 text-ide-fg-muted">
          Feel free to reach out. I&apos;m always open to interesting conversations
          and opportunities.
        </p>
      </FadeIn>

      {/* connect.json code block */}
      <FadeIn>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-md border border-ide-border bg-ide-bg-alt/50 font-mono text-sm sm:text-base">
          {/* File header strip */}
          <div className="border-b border-ide-border bg-ide-bg-alt px-4 py-2 text-xs text-ide-fg-muted">
            connect.json
          </div>

          <div className="px-2 py-4 sm:px-4">
            <JsonLine n={1}>
              <span className="text-ide-fg-muted">{"{"}</span>
            </JsonLine>

            {connectEntries.map((entry, i) => (
              <JsonLine key={entry.key} n={i + 2}>
                <span className="pl-4 text-syn-keyword">&quot;{entry.key}&quot;</span>
                <span className="text-ide-fg-muted">: </span>
                <a
                  href={entry.href}
                  target={entry.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 py-1 text-syn-string underline-offset-4 hover:underline"
                >
                  &quot;{entry.value}&quot;
                  <entry.icon
                    size={14}
                    className="text-ide-fg-muted transition-colors group-hover:text-ide-accent"
                  />
                </a>
                {i < connectEntries.length - 1 && (
                  <span className="text-ide-fg-muted">,</span>
                )}
              </JsonLine>
            ))}

            <JsonLine n={connectEntries.length + 2}>
              <span className="text-ide-fg-muted">{"}"}</span>
            </JsonLine>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/** One line of the JSON block with a line-number gutter */
function JsonLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline">
      <span
        aria-hidden
        className="w-8 shrink-0 select-none pr-3 text-right text-xs text-ide-fg-muted/60"
      >
        {n}
      </span>
      <p className="min-w-0 break-all">{children}</p>
    </div>
  );
}
