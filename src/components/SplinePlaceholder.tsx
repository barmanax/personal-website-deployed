"use client";

import { motion } from "framer-motion";

/**
 * Placeholder for the 3D Spline avatar.
 * Displays an animated geometric shape until the real Spline scene URL is provided.
 *
 * To swap in a real Spline embed, replace this component with:
 *   import Spline from "@splinetool/react-spline";
 *   <Spline scene="YOUR_SPLINE_URL" />
 */
export function SplinePlaceholder() {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center sm:h-[450px]">
      {/* Glowing backdrop circle */}
      <div className="absolute h-64 w-64 rounded-full bg-accent/10 blur-3xl sm:h-80 sm:w-80" />

      {/* Animated floating cube */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ perspective: 800 }}
        className="relative"
      >
        <div
          className="h-40 w-40 rounded-2xl border border-accent/30 bg-gradient-to-br
                     from-accent/20 to-accent/5 shadow-lg shadow-accent/10 backdrop-blur-sm
                     sm:h-52 sm:w-52"
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>

      {/* Label */}
      <p className="absolute bottom-4 text-xs text-surface-500 dark:text-surface-600">
        3D Avatar — Coming Soon
      </p>
    </div>
  );
}
