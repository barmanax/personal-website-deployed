"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LINE_HEIGHT_PX } from "./ide.config";

/** Block elements abstracted into minimap "lines of code" */
const CONTENT_SELECTOR = "h1, h2, h3, p, li";

/** Ceiling on zoom so short pages don't render an absurdly magnified map */
const MAX_SCALE = 0.18;

/** Percentage indent applied to list items, mimicking nested code */
const LIST_INDENT = 14;

interface Stripe {
  /** Offset from the top of the map, in px */
  top: number;
  height: number;
  /** Horizontal inset and length, both as percentages of the rail width */
  left: number;
  width: number;
  /** Headings paint in the accent colour, like a real syntax-aware minimap */
  accent: boolean;
}

/**
 * Deterministic 0-1 value from a string and a line index.
 *
 * Bar lengths need to look like text without being random: re-measuring on
 * every resize must produce the identical map, otherwise the minimap would
 * visibly reshuffle whenever the window changes size. Hashing the element's
 * own text guarantees the same content always yields the same silhouette.
 */
function hashUnit(text: string, index: number): number {
  let hash = index * 2654435761;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return ((hash >>> 0) % 1000) / 1000;
}

/**
 * VS Code-style minimap: a scaled abstraction of the current page.
 *
 * Unlike the ambient animation this replaced, every mark is derived from real
 * rendered content - it reads the actual DOM geometry of the editor pane, so
 * the silhouette genuinely corresponds to what is on screen and the viewport
 * box reports true scroll position. Click or drag to jump.
 *
 * Measurement is geometric rather than structural (bounding rects, not tag
 * trees), so it works on any page without per-page configuration.
 */
export function Minimap() {
  const pathname = usePathname();
  const [stripes, setStripes] = useState<Stripe[]>([]);
  const [viewport, setViewport] = useState({ top: 0, height: 0 });
  const [scrollable, setScrollable] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  /* Kept in a ref so the scroll handler can read it without re-subscribing */
  const scaleRef = useRef(0);

  /** Rebuild the stripe list from current DOM geometry */
  const measure = useCallback(() => {
    const pane = document.getElementById("editor-pane");
    const content = document.getElementById("editor-content");
    const rail = railRef.current;
    if (!pane || !content || !rail) return;

    const contentHeight = content.scrollHeight;
    const railHeight = rail.clientHeight;
    if (!contentHeight || !railHeight) return;

    const scale = Math.min(railHeight / contentHeight, MAX_SCALE);
    scaleRef.current = scale;

    /* Rects are viewport-relative; subtracting the wrapper's own top yields
       positions within the content, independent of current scroll offset */
    const base = content.getBoundingClientRect().top;
    const next: Stripe[] = [];

    content
      .querySelectorAll<HTMLElement>(CONTENT_SELECTOR)
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        const text = el.textContent?.trim() ?? "";
        if (!rect.height || !text) return;

        const lines = Math.max(1, Math.round(rect.height / LINE_HEIGHT_PX));
        const accent = /^H[123]$/.test(el.tagName);
        const left = el.tagName === "LI" ? LIST_INDENT : 0;

        for (let i = 0; i < lines; i++) {
          /* Wrapped text runs short on its final line - mimicking that is
             what makes the map read as prose rather than as a bar chart */
          const isLast = i === lines - 1 && lines > 1;
          const fill = isLast
            ? 0.3 + hashUnit(text, i) * 0.3
            : 0.62 + hashUnit(text, i) * 0.38;

          next.push({
            top: (rect.top - base + i * LINE_HEIGHT_PX) * scale,
            height: Math.max(1, LINE_HEIGHT_PX * scale - 1),
            left,
            width: (100 - left) * fill,
            accent,
          });
        }
      });

    setStripes(next);
    setScrollable(contentHeight > pane.clientHeight + 1);
    setViewport({
      top: pane.scrollTop * scale,
      height: pane.clientHeight * scale,
    });
  }, []);

  /* Re-measure on mount, route change, and any content or rail resize.
     The rAF lets the incoming page paint before we read its geometry. */
  useEffect(() => {
    const content = document.getElementById("editor-content");
    const rail = railRef.current;
    if (!content || !rail) return;

    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(rail);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure, pathname]);

  /* Track scroll separately - it only moves the viewport box, so it must not
     trigger the (much heavier) full re-measure */
  useEffect(() => {
    const pane = document.getElementById("editor-pane");
    if (!pane) return;

    const onScroll = () =>
      setViewport({
        top: pane.scrollTop * scaleRef.current,
        height: pane.clientHeight * scaleRef.current,
      });

    pane.addEventListener("scroll", onScroll, { passive: true });
    return () => pane.removeEventListener("scroll", onScroll);
  }, []);

  /** Centre the pane on the content position under the pointer */
  const scrollToPointer = (clientY: number) => {
    const pane = document.getElementById("editor-pane");
    const rail = railRef.current;
    if (!pane || !rail || !scaleRef.current) return;

    const offset = clientY - rail.getBoundingClientRect().top;
    pane.scrollTo({
      top: offset / scaleRef.current - pane.clientHeight / 2,
      behavior: dragging.current ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={railRef}
      /* Decorative duplicate of a control the pane already offers: scrolling
         and keyboard navigation both work without it, so it is pointer-only
         and hidden from assistive tech rather than being a focus trap. */
      aria-hidden
      className="relative hidden w-16 shrink-0 cursor-pointer overflow-hidden
                 border-l border-ide-border bg-ide-bg-alt/40 px-2 py-1 lg:block"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        scrollToPointer(e.clientY);
      }}
      onPointerMove={(e) => dragging.current && scrollToPointer(e.clientY)}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
    >
      {stripes.map((stripe, i) => (
        <div
          key={i}
          className={`absolute rounded-[1px] ${
            stripe.accent ? "bg-ide-accent/70" : "bg-ide-fg-muted/45"
          }`}
          style={{
            top: stripe.top,
            height: stripe.height,
            left: `${stripe.left}%`,
            width: `${stripe.width}%`,
          }}
        />
      ))}

      {/* Viewport indicator - pointless when there is nothing to scroll */}
      {scrollable && (
        <div
          className="pointer-events-none absolute inset-x-0 border-y border-ide-border bg-ide-fg/10"
          style={{ top: viewport.top, height: viewport.height }}
        />
      )}
    </div>
  );
}
