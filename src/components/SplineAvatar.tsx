"use client";

import { Suspense, lazy } from "react";

/**
 * 3D avatar embed using Spline.
 * Lazy-loaded so the heavy Spline runtime (~1MB) doesn't block initial page render.
 * The Suspense fallback shows a loading spinner while the scene downloads.
 */
const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE_URL =
  "https://prod.spline.design/uutsMIcAoKg6DMsz/scene.splinecode";

export function SplineAvatar() {
  return (
    <div className="relative h-[350px] w-full sm:h-[450px]">
      <Suspense fallback={<LoadingFallback />}>
        <Spline scene={SPLINE_SCENE_URL} />
      </Suspense>
    </div>
  );
}

/** Minimal loading state while the 3D scene downloads */
function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-surface-700 border-t-accent" />
    </div>
  );
}
