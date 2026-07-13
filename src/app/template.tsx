"use client";

import { motion } from "framer-motion";

/**
 * Route transition for the editor pane only.
 * Next.js remounts template.tsx on every navigation, so a fresh
 * mount animation plays while the IDE chrome in layout.tsx stays put.
 * Kept subtle (150ms) - big transitions would break the editor illusion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
