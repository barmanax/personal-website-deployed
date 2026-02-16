"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Direction to slide in from */
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

/**
 * Scroll-triggered fade-in animation wrapper.
 * Uses Framer Motion's `whileInView` to animate elements as they enter the viewport.
 * The `once: true` option means the animation only plays the first time.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
