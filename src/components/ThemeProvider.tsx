"use client";

/**
 * Wraps next-themes ThemeProvider as a client component.
 * Next.js App Router requires client components for context providers,
 * so this thin wrapper lets us use it in the server-rendered root layout.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
