"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

/*
 * Load the 3D avatar client-side only and code-split it: three.js is heavy,
 * and the avatar slide is desktop-only anyway (added after mount).
 */
const GLBAvatar = dynamic(
  () => import("./GLBAvatar").then((m) => m.GLBAvatar),
  { ssr: false }
);

/* Canvas-based, so client-only as well (no three.js involved) */
const AsciiPortrait = dynamic(
  () => import("./fx/AsciiPortrait").then((m) => m.AsciiPortrait),
  { ssr: false }
);

type Slide =
  | { type: "avatar"; src?: undefined; alt?: undefined }
  | { type: "image"; src: string; alt: string }
  | { type: "ascii"; src: string; alt: string };

/**
 * All possible slide definitions. The ASCII portrait leads (it reveals the
 * real photo on hover, so the raw copy of that photo isn't a slide).
 */
const ALL_SLIDES: Slide[] = [
  { type: "ascii", src: "/profile-1.png", alt: "ASCII portrait of Aditya" },
  { type: "avatar" },
  { type: "image", src: "/profile-2.JPG", alt: "Profile photo" },
];

/** Slides for mobile - everything except the heavy 3D avatar */
const MOBILE_SLIDES: Slide[] = ALL_SLIDES.filter((s) => s.type !== "avatar");

/**
 * Hero carousel component - rotates between 3D avatar and profile images.
 * On mobile (< 768px) the 3D avatar is excluded to avoid rendering issues.
 */
export function HeroCarousel() {
  // Start with image-only slides (safe for SSR), upgrade to full set after mount
  const [slides, setSlides] = useState(MOBILE_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      const newSlides = mobile ? MOBILE_SLIDES : ALL_SLIDES;
      // Batch both updates so React renders them together — no intermediate state
      setSlides(newSlides);
      setCurrentSlide(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Framer Motion variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // Defensive: modulo prevents out-of-bounds even if state is stale
  const safeIndex = currentSlide % totalSlides;
  const currentSlideData = slides[safeIndex];

  return (
    <div className="relative w-full sm:max-w-lg mx-auto">
      {/* Main carousel container - gray background only for image slides */}
      <div
        className={`relative aspect-[3/4] sm:aspect-auto sm:h-[500px] lg:h-[550px] overflow-hidden rounded-md border border-ide-border ${
          currentSlideData.type === "image" ? "bg-ide-bg-alt" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={safeIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentSlideData.type === "avatar" ? (
              <GLBAvatar />
            ) : currentSlideData.type === "ascii" ? (
              <AsciiPortrait
                src={currentSlideData.src}
                alt={currentSlideData.alt}
              />
            ) : (
              <Image
                src={currentSlideData.src}
                alt={currentSlideData.alt}
                fill
                className="object-cover"
                priority={safeIndex === 0}
              />
            )}
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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === safeIndex
                ? "w-8 bg-ide-accent"
                : "w-2 bg-ide-border hover:bg-ide-fg-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === safeIndex}
          />
        ))}
      </div>
    </div>
  );
}
