/**
 * Runtime access to the IDE theme tokens defined in globals.css.
 *
 * The tokens are stored as bare "R G B" channel triplets so Tailwind can
 * apply opacity modifiers to them (see tailwind.config.ts). That format is
 * not a valid CSS colour on its own, so canvas code cannot hand the raw
 * variable to `ctx.fillStyle` - it has to be wrapped. This module is the
 * single place that knows about the wrapping.
 */

/**
 * Reads a theme token and returns a canvas-ready CSS colour.
 *
 * Always reads from the live computed style rather than caching, so callers
 * pick up the new palette when next-themes swaps the class on <html>.
 *
 * @param variable - CSS custom property name, e.g. "--ide-fg"
 * @param alpha - Optional opacity in the 0-1 range
 * @returns A CSS colour string such as "rgb(171 178 191 / 0.5)"
 */
export function themeColor(variable: string, alpha = 1): string {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  // Fall back to transparent rather than painting garbage if the token is missing
  if (!channels) return "transparent";

  return `rgb(${channels} / ${alpha})`;
}
