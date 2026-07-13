import type { Config } from "tailwindcss";

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
         */
        ide: {
          bg: "var(--ide-bg)",
          "bg-alt": "var(--ide-bg-alt)",
          "bg-hover": "var(--ide-bg-hover)",
          border: "var(--ide-border)",
          fg: "var(--ide-fg)",
          "fg-muted": "var(--ide-fg-muted)",
          accent: "var(--ide-accent)",
        },
        /* Syntax-highlight tokens for decorative code-styled text */
        syn: {
          keyword: "var(--syn-keyword)",
          string: "var(--syn-string)",
          func: "var(--syn-func)",
          comment: "var(--syn-comment)",
          number: "var(--syn-number)",
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
