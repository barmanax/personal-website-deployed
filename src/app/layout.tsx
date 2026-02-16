import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Inter — clean, modern sans-serif from Google Fonts.
 * Loaded via next/font which self-hosts the font for zero layout shift.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Your Name — Portfolio",
    template: "%s | Your Name",
  },
  description:
    "CS + Statistics student at UIUC. Building software and exploring data.",
};

/**
 * Root layout — wraps every page with the theme provider, navbar, and footer.
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {/* pt-20 offsets the fixed navbar height */}
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
