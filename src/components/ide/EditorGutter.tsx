"use client";

import { useEffect, useRef, useState } from "react";
import { LINE_HEIGHT_PX } from "./ide.config";

/**
 * Line-number gutter and wrap ruler sitting behind the editor pane.
 *
 * Replaces the old ambient background animation with chrome the IDE metaphor
 * actually implies - and that the status bar already claims exists, since it
 * has always reported "Ln N" against the same LINE_HEIGHT_PX denomination.
 *
 * Numbers are derived from the *content* height rather than the viewport, so
 * they keep counting as you scroll. Height is measured with a ResizeObserver
 * on the content wrapper instead of being computed from the children, which
 * keeps this component ignorant of page structure: it stays correct across
 * route changes, font loading, and image reflow without knowing anything
 * about what is being rendered.
 *
 * Purely decorative, so it is aria-hidden and non-interactive.
 */
export function EditorGutter() {
  const [lineCount, setLineCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* The positioned content wrapper this gutter is absolutely placed within */
    const content = ref.current?.parentElement;
    if (!content) return;

    const measure = () =>
      setLineCount(Math.ceil(content.scrollHeight / LINE_HEIGHT_PX));

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    measure();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      /* -left-14 reaches back out into the pane's lg:pl-14 padding: this sits
         inside the content box, so inset-0 alone would start after it and
         push the numbers into the text column */
      className="pointer-events-none absolute inset-y-0 -left-14 right-0 hidden select-none lg:block"
    >
      {/* Number rail - occupies the pane's lg:pl-14 padding, never the text column */}
      <div className="absolute inset-y-0 left-0 w-14 pr-3 text-right font-mono text-xs leading-6 tabular-nums text-ide-fg-muted/30">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/*
       * Wrap ruler. Mirrors .section-container's own centring math rather than
       * hard-coding an offset, so the line lands exactly on the right edge of
       * the text column at any pane width.
       */}
      <div className="absolute inset-y-0 left-14 right-0">
        <div className="relative mx-auto h-full max-w-4xl px-6 sm:px-8">
          <div className="absolute inset-y-0 right-6 w-px bg-ide-border/70 sm:right-8" />
        </div>
      </div>
    </div>
  );
}
