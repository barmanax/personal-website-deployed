import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { IDEShell } from "@/components/ide/IDEShell";
import { Analytics } from "@vercel/analytics/next";

/**
 * Inter -clean, modern sans-serif from Google Fonts.
 * Loaded via next/font which self-hosts the font for zero layout shift.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * JetBrains Mono -monospace font for the IDE chrome, headings, and code
 * accents. Exposed as a CSS variable consumed by Tailwind's font-mono.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aditya Barman - Portfolio",
    template: "%s | Aditya Barman",
  },
  description:
    "CS + Statistics student at UIUC. Building software and exploring data.",
};

/**
 * Root layout -wraps every page with the theme provider and the IDE shell.
 * The `suppressHydrationWarning` on <html> is required by next-themes to
 * avoid a React hydration mismatch when the class attribute is injected.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* The IDE chrome persists across navigation; pages swap inside its editor pane */}
          <IDEShell>{children}</IDEShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
