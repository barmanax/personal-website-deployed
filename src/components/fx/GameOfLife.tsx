"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ambient Conway's Game of Life running behind the editor pane.
 *
 * Canvas 2D, ~14px cells, one generation every 120ms - cheap enough to be
 * imperceptible in profiles. Cells are drawn in the theme's foreground
 * color at ~5% alpha: felt more than watched.
 *
 * Kill switches: hidden tab stops the loop, prefers-reduced-motion renders
 * one static generation, and active scrolling pauses updates to keep
 * interaction latency clean.
 */

const CELL_SIZE = 14;
const TICK_MS = 120;
const SEED_DENSITY = 0.12;
/** Reseed when population stays this flat for a full history window */
const STAGNATION_RANGE = 3;
const HISTORY_LENGTH = 24;

/** A glider heading south-east, stamped at random positions on seed */
const GLIDER = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

export function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
    let next = new Uint8Array(0);
    const popHistory: number[] = [];
    let rafId = 0;
    let lastTick = 0;
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;

    /** Current theme foreground, re-read whenever the theme flips */
    const cellColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ide-fg").trim();
    let color = cellColor();

    const seed = () => {
      grid = new Uint8Array(cols * rows);
      next = new Uint8Array(cols * rows);
      popHistory.length = 0;
      for (let i = 0; i < grid.length; i++) {
        grid[i] = Math.random() < SEED_DENSITY ? 1 : 0;
      }
      // Stamp a few gliders so there's always directed motion
      for (let g = 0; g < 3; g++) {
        const ox = Math.floor(Math.random() * Math.max(1, cols - 4));
        const oy = Math.floor(Math.random() * Math.max(1, rows - 4));
        for (const [dy, dx] of GLIDER) grid[(oy + dy) * cols + ox + dx] = 1;
      }
    };

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      cols = Math.max(1, Math.floor(canvas.width / CELL_SIZE));
      rows = Math.max(1, Math.floor(canvas.height / CELL_SIZE));
      seed();
      draw();
    };

    /** One generation with wrap-around edges */
    const step = () => {
      let population = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + cols) % cols;
              const ny = (y + dy + rows) % rows;
              neighbors += grid[ny * cols + nx];
            }
          }
          const i = y * cols + x;
          next[i] = neighbors === 3 || (grid[i] === 1 && neighbors === 2) ? 1 : 0;
          population += next[i];
        }
      }
      [grid, next] = [next, grid];

      // Reseed if the board settles into still lifes / small oscillators
      popHistory.push(population);
      if (popHistory.length > HISTORY_LENGTH) popHistory.shift();
      if (popHistory.length === HISTORY_LENGTH) {
        const min = Math.min(...popHistory);
        const max = Math.max(...popHistory);
        if (max - min < STAGNATION_RANGE) seed();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = color;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      rafId = requestAnimationFrame(loop);
      if (scrolling || time - lastTick < TICK_MS) return;
      lastTick = time;
      step();
      draw();
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      if (!reducedMotion && !document.hidden) rafId = requestAnimationFrame(loop);
    };

    const onVisibility = () => start();

    /* Pause updates while the editor pane is actively scrolling */
    const pane = document.getElementById("editor-pane");
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => (scrolling = false), 150);
    };

    /* Re-read the cell color when next-themes swaps the class on <html> */
    const themeObserver = new MutationObserver(() => {
      color = cellColor();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    start();
    document.addEventListener("visibilitychange", onVisibility);
    pane?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      pane?.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  );
}
