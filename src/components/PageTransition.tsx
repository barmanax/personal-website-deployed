"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a Framer Motion fade/slide-up animation.
 * The `key` prop on <motion.div> triggers a fresh animation on route change
 * since React unmounts and remounts when the key changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
