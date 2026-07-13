"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

/* Canvas-based, so client-only (theme color is read from the DOM) */
const AsciiPortrait = dynamic(
  () => import("./fx/AsciiPortrait").then((m) => m.AsciiPortrait),
  { ssr: false }
);

/**
 * Every slide is a photo rendered as ASCII art; hovering reveals the
 * original. Same treatment everywhere keeps the hero visually coherent.
 */
const SLIDES = [
  { src: "/profile-1.png", alt: "ASCII portrait of Aditya (headshot)" },
  { src: "/unnamed-compressed.jpg", alt: "ASCII portrait of Aditya in New York" },
  { src: "/profile-2.JPG", alt: "ASCII portrait of Aditya in Chicago" },
];

/** Hero carousel - rotates between ASCII-rendered portraits */
export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Framer Motion variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full sm:max-w-lg mx-auto">
      <div
        className="relative aspect-[3/4] sm:aspect-auto sm:h-[500px] lg:h-[550px] overflow-hidden rounded-md border border-ide-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <AsciiPortrait
              src={SLIDES[currentSlide].src}
              alt={SLIDES[currentSlide].alt}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - fade in on hover */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     bg-ide-bg-alt/80 backdrop-blur-sm hover:bg-ide-bg-hover
                     rounded-full p-2 transition-colors"
          aria-label="Previous slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     bg-ide-bg-alt/80 backdrop-blur-sm hover:bg-ide-bg-hover
                     rounded-full p-2 transition-colors"
          aria-label="Next slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-ide-accent"
                : "w-2 bg-ide-border hover:bg-ide-fg-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
}
