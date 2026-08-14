"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { themeColor } from "@/lib/theme";

/**
 * Animated maze generator + solver for the 404 page.
 *
 * Loop: a maze is carved with recursive backtracking (animated), then A*
 * searches it - the explored frontier tints in keyword color, the final
 * path draws in accent - then it all restarts with a fresh maze.
 *
 * Both algorithms run to completion up front and record their step order;
 * the animation just replays those steps on requestAnimationFrame. This
 * keeps algorithm and rendering code independent.
 *
 * Reduced motion: renders the fully solved maze as a single static frame.
 */

const CELL = 16;
/** Animation replay speeds (steps per frame) */
const CARVE_SPEED = 3;
const SOLVE_SPEED = 4;
const PATH_SPEED = 2;
/** Pause between loops (ms) */
const RESTART_DELAY = 2200;

type Point = { x: number; y: number };

/** Carve a maze on an odd-sized grid; returns wall grid + carve order */
function generateMaze(cols: number, rows: number) {
  // 1 = wall, 0 = passage; passages live at odd coordinates
  const grid = Array.from({ length: rows }, () => new Uint8Array(cols).fill(1));
  const carveOrder: Point[] = [];
  const stack: Point[] = [{ x: 1, y: 1 }];
  grid[1][1] = 0;
  carveOrder.push({ x: 1, y: 1 });

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    // Unvisited neighbors two cells away
    const neighbors = (
      [
        { x: current.x + 2, y: current.y },
        { x: current.x - 2, y: current.y },
        { x: current.x, y: current.y + 2 },
        { x: current.x, y: current.y - 2 },
      ] as Point[]
    ).filter(
      (p) => p.x > 0 && p.y > 0 && p.x < cols - 1 && p.y < rows - 1 && grid[p.y][p.x] === 1
    );

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    // Knock down the wall between current and next
    const wall = { x: (current.x + next.x) / 2, y: (current.y + next.y) / 2 };
    grid[wall.y][wall.x] = 0;
    grid[next.y][next.x] = 0;
    carveOrder.push(wall, next);
    stack.push(next);
  }

  return { grid, carveOrder };
}

/** A* from start to goal; returns visit order and the reconstructed path */
function solveMaze(grid: Uint8Array[], start: Point, goal: Point) {
  const rows = grid.length;
  const cols = grid[0].length;
  const key = (p: Point) => p.y * cols + p.x;
  const heuristic = (p: Point) => Math.abs(p.x - goal.x) + Math.abs(p.y - goal.y);

  const open: Point[] = [start];
  const gScore = new Map<number, number>([[key(start), 0]]);
  const cameFrom = new Map<number, Point>();
  const seen = new Set<number>([key(start)]);
  const visitOrder: Point[] = [];

  while (open.length > 0) {
    // Linear min-search is plenty for a grid this small
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) {
      const fi = (gScore.get(key(open[i])) ?? Infinity) + heuristic(open[i]);
      const fb = (gScore.get(key(open[bestIdx])) ?? Infinity) + heuristic(open[bestIdx]);
      if (fi < fb) bestIdx = i;
    }
    const current = open.splice(bestIdx, 1)[0];
    visitOrder.push(current);

    if (current.x === goal.x && current.y === goal.y) break;

    for (const d of [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ]) {
      const n = { x: current.x + d.x, y: current.y + d.y };
      if (n.x < 0 || n.y < 0 || n.x >= cols || n.y >= rows) continue;
      if (grid[n.y][n.x] === 1 || seen.has(key(n))) continue;
      seen.add(key(n));
      gScore.set(key(n), (gScore.get(key(current)) ?? 0) + 1);
      cameFrom.set(key(n), current);
      open.push(n);
    }
  }

  // Walk back from goal to start
  const path: Point[] = [];
  let node: Point | undefined = goal;
  while (node) {
    path.unshift(node);
    node = cameFrom.get(key(node));
  }
  return { visitOrder, path };
}

export function MazeSolver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let restartTimer: ReturnType<typeof setTimeout>;

    const colors = () => ({
      wall: themeColor("--ide-border"),
      frontier: themeColor("--syn-keyword"),
      path: themeColor("--ide-accent"),
    });

    const run = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(restartTimer);

      // Odd cell counts so the border is solid wall
      const cols = Math.max(15, Math.floor(parent.clientWidth / CELL) | 1);
      const rows = Math.max(15, Math.floor(320 / CELL) | 1);
      canvas.width = cols * CELL;
      canvas.height = rows * CELL;

      const start = { x: 1, y: 1 };
      const goal = { x: cols - 2, y: rows - 2 };
      const { grid, carveOrder } = generateMaze(cols, rows);
      const { visitOrder, path } = solveMaze(grid, start, goal);
      const c = colors();

      const drawCell = (p: Point, style: string, alpha = 1) => {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = style;
        ctx.fillRect(p.x * CELL, p.y * CELL, CELL, CELL);
        ctx.globalAlpha = 1;
      };

      // Start from an all-wall canvas; carving erases wall cells
      ctx.fillStyle = c.wall;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      if (reducedMotion) {
        // Static final frame: carved maze + solved path
        for (const p of carveOrder) ctx.clearRect(p.x * CELL, p.y * CELL, CELL, CELL);
        for (const p of path) drawCell(p, c.path, 0.9);
        return;
      }

      // Replay: carve -> explore -> trace path -> pause -> restart
      let phase: "carve" | "solve" | "path" = "carve";
      let i = 0;

      const tick = () => {
        if (phase === "carve") {
          for (let s = 0; s < CARVE_SPEED && i < carveOrder.length; s++, i++) {
            const p = carveOrder[i];
            ctx.clearRect(p.x * CELL, p.y * CELL, CELL, CELL);
          }
          if (i >= carveOrder.length) {
            phase = "solve";
            i = 0;
          }
        } else if (phase === "solve") {
          for (let s = 0; s < SOLVE_SPEED && i < visitOrder.length; s++, i++) {
            drawCell(visitOrder[i], c.frontier, 0.25);
          }
          if (i >= visitOrder.length) {
            phase = "path";
            i = 0;
          }
        } else {
          for (let s = 0; s < PATH_SPEED && i < path.length; s++, i++) {
            drawCell(path[i], c.path, 0.9);
          }
          if (i >= path.length) {
            restartTimer = setTimeout(run, RESTART_DELAY);
            return;
          }
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    run();

    /* Stop wasting frames when the tab is hidden; resume fresh when back */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        clearTimeout(restartTimer);
      } else {
        run();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(restartTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full overflow-hidden rounded-md border border-ide-border">
      <canvas ref={canvasRef} aria-hidden className="block w-full" />
    </div>
  );
}
