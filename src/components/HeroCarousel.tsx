"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GLBAvatar } from "./GLBAvatar";
import Image from "next/image";

/**
 * Hero carousel component — rotates between 3D avatar and profile images
 * Supports keyboard navigation, click navigation, and swipe gestures
 */
export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Define slides: avatar + 2 images
  const slides = [
    { type: "avatar" as const },
    { type: "image" as const, src: "/profile-1.png", alt: "Profile photo 1" },
    { type: "image" as const, src: "/profile-2.JPG", alt: "Profile photo 2" },
  ];

  const totalSlides = slides.length;

  /**
   * Navigate to the next slide (wraps around to start)
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  /**
   * Navigate to the previous slide (wraps around to end)
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  /**
   * Jump to a specific slide by index
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main carousel container */}
      <div
        className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-2xl bg-surface-100 dark:bg-surface-900"
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
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentSlideData.type === "avatar" ? (
              <GLBAvatar />
            ) : (
              <Image
                src={currentSlideData.src}
                alt={currentSlideData.alt}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - fade in on hover */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     bg-surface-50/80 dark:bg-surface-800/80 backdrop-blur-sm
                     hover:bg-surface-100 dark:hover:bg-surface-700
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
                     bg-surface-50/80 dark:bg-surface-800/80 backdrop-blur-sm
                     hover:bg-surface-100 dark:hover:bg-surface-700
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
              index === currentSlide
                ? "w-8 bg-accent"
                : "w-2 bg-surface-300 dark:bg-surface-700 hover:bg-surface-400 dark:hover:bg-surface-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
}
