"use client";

import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

/**
 * 3D avatar embed using Spline.
 * Renders the interactive Spline scene with controlled initial state.
 */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/uutsMIcAoKg6DMsz/scene.splinecode";

export function SplineAvatar() {
  /**
   * Callback fired when Spline scene finishes loading.
   * Sets the animation to start at frame 0 for a centered, front-facing pose.
   * @param {Application} splineApp - The Spline application instance
   */
  function onLoad(splineApp: Application) {
    // Stop any animations
    try {
      splineApp.stop();
    } catch (e) {
      console.log("Could not stop animation:", e);
    }

    // Zoom out the camera to show full avatar
    try {
      const camera = splineApp.findObjectByName("Camera");
      if (camera) {
        // Try different zoom/scale approaches
        if ('zoom' in camera) {
          (camera as any).zoom = 0.7; // Zoom out (lower = more zoomed out)
        }
        if ('fov' in camera) {
          (camera as any).fov = 60; // Wider field of view
        }

        // Also pull camera back significantly
        camera.position.z += 200;
        camera.rotation.y = 0;

        console.log("Camera adjusted:", camera);
      }
    } catch (e) {
      console.log("Camera adjustment failed:", e);
    }
  }

  return (
    <div className="relative h-[750px] w-full sm:h-[850px]">
      <Spline scene={SPLINE_SCENE_URL} onLoad={onLoad} />
    </div>
  );
}
