import type { Config } from "tailwindcss";

/**
 * Wraps a CSS variable holding an "R G B" channel triplet so Tailwind can
 * inject opacity modifiers into it.
 * @param variable - CSS custom property name, e.g. "--ide-bg"
 * @returns A colour value Tailwind resolves to `rgb(R G B / <opacity>)`
 */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /* Use class-based dark mode so next-themes can toggle it via a class on <html> */
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /*
         * IDE palette — every value points at a CSS variable defined in
         * globals.css, so light/dark themes swap without dark: variants.
         *
         * The `rgb(var(--x) / <alpha-value>)` wrapper is required, not
         * cosmetic: Tailwind substitutes <alpha-value> with the opacity
         * modifier, which is what makes `bg-ide-bg-alt/50` compile. A bare
         * `var(--x)` holding a hex silently drops any modified utility.
         * This is why globals.css stores channel triplets rather than hex.
         */
        ide: {
          bg: withAlpha("--ide-bg"),
          "bg-alt": withAlpha("--ide-bg-alt"),
          "bg-hover": withAlpha("--ide-bg-hover"),
          border: withAlpha("--ide-border"),
          fg: withAlpha("--ide-fg"),
          "fg-muted": withAlpha("--ide-fg-muted"),
          accent: withAlpha("--ide-accent"),
        },
        /* Syntax-highlight tokens for decorative code-styled text */
        syn: {
          keyword: withAlpha("--syn-keyword"),
          string: withAlpha("--syn-string"),
          func: withAlpha("--syn-func"),
          comment: withAlpha("--syn-comment"),
          number: withAlpha("--syn-number"),
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
