"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { themeColor } from "@/lib/theme";

/**
 * A photo rendered as live ASCII art on a canvas.
 *
 * The image is cover-cropped into a character grid: each cell's average
 * luminance picks a glyph from a sparse-to-dense ramp. Ink color comes from
 * the theme's foreground token, and the brightness mapping flips per theme
 * (light ink should be dense where the photo is BRIGHT; dark ink dense where
 * it's DARK) so the portrait reads correctly in both modes.
 *
 * Hovering crossfades to the real photograph.
 */

const CHAR_RAMP = " .:-+*=%@#";
/** Rendered size of one character cell in CSS pixels */
const CELL = 7;

export function AsciiPortrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.src = src;

    const render = () => {
      if (!img.complete || img.naturalWidth === 0) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width === 0 || height === 0) return;

      // Crisp text on retina screens
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / CELL);
      const rows = Math.floor(height / CELL);

      // Sample the image at grid resolution with cover-crop framing
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d");
      if (!sctx) return;

      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      sctx.drawImage(img, (cols - drawW) / 2, (rows - drawH) / 2, drawW, drawH);
      const pixels = sctx.getImageData(0, 0, cols, rows).data;

      // Per-cell relative luminance, then a min/max stretch for contrast
      const lum = new Float32Array(cols * rows);
      let min = 1;
      let max = 0;
      for (let i = 0; i < lum.length; i++) {
        const l =
          (0.2126 * pixels[i * 4] +
            0.7152 * pixels[i * 4 + 1] +
            0.0722 * pixels[i * 4 + 2]) /
          255;
        lum[i] = l;
        if (l < min) min = l;
        if (l > max) max = l;
      }
      const range = Math.max(max - min, 0.001);

      const ink = themeColor("--ide-fg");
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      ctx.font = `${CELL + 1}px monospace`;
      ctx.textBaseline = "top";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let l = (lum[y * cols + x] - min) / range;
          // Dark ink (light theme) is dense where the photo is dark
          if (!isDark) l = 1 - l;
          const char = CHAR_RAMP[Math.floor(l * (CHAR_RAMP.length - 1))];
          if (char !== " ") ctx.fillText(char, x * CELL, y * CELL);
        }
      }
    };

    img.onload = render;

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(parent);

    /* Redraw in the new ink color when next-themes swaps the html class */
    const themeObserver = new MutationObserver(render);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [src]);

  return (
    <div className="group relative h-full w-full">
      <canvas ref={canvasRef} aria-label={alt} className="h-full w-full" />
      {/* Hover reveals the actual photograph */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
}
