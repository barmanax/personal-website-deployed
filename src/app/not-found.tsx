"use client";

import Link from "next/link";
import { MazeSolver } from "@/components/fx/MazeSolver";

/**
 * 404 page - an editor-style "file not found" error over an animated
 * maze being generated and solved by A* on loop. Even the dead end
 * demonstrates an algorithm.
 */
export default function NotFound() {
  return (
    <section className="section-container">
      <p className="code-comment mb-2 text-sm">{"// "}ERR_FILE_NOT_FOUND</p>
      <h1 className="section-heading mb-4">
        <span className="text-syn-keyword">404</span>: no such file or directory
      </h1>
      <p className="mb-8 text-ide-fg-muted">
        The path you opened doesn&apos;t exist in this workspace. While you&apos;re
        here - watch A* find its way out.
      </p>

      <MazeSolver />

      <p className="mt-8 font-mono text-sm">
        <Link href="/" className="text-ide-accent underline-offset-4 hover:underline">
          $ open home.tsx
        </Link>
      </p>
    </section>
  );
}
