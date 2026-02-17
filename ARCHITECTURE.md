# Architecture Documentation
## Complete Project Map

This document explains every file, component, and function in the project. Use this as your learning reference for understanding how Next.js applications are structured.

---

## Table of Contents

1. [Project Structure Overview](#project-structure-overview)
2. [Configuration Files](#configuration-files)
3. [Source Code Deep Dive](#source-code-deep-dive)
4. [Data Layer](#data-layer)
5. [Component Layer](#component-layer)
6. [Page Layer](#page-layer)
7. [How Everything Connects](#how-everything-connects)
8. [Next.js App Router Concepts](#nextjs-app-router-concepts)

---

## Project Structure Overview

```
personal-website/
├── public/                    # Static assets served directly
│   ├── avatar.glb            # 3D model file for the avatar
│   └── resume.pdf            # (You need to add this)
│
├── src/                      # All source code
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout (wraps all pages)
│   │   ├── page.tsx          # Home page (/)
│   │   ├── globals.css       # Global styles
│   │   ├── experience/
│   │   │   └── page.tsx      # Experience page (/experience)
│   │   ├── projects/
│   │   │   └── page.tsx      # Projects page (/projects)
│   │   └── connect/
│   │       └── page.tsx      # Connect page (/connect)
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx        # Top navigation bar
│   │   ├── Footer.tsx        # Bottom footer
│   │   ├── ThemeProvider.tsx # Dark mode context wrapper
│   │   ├── ThemeToggle.tsx   # Sun/moon theme button
│   │   ├── FadeIn.tsx        # Scroll animation wrapper
│   │   ├── PageTransition.tsx# Route change animation
│   │   └── GLBAvatar.tsx     # 3D avatar component
│   │
│   └── data/
│       └── content.ts        # All site content in one place
│
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── PRD.md                    # Product requirements (what we're building)
└── ARCHITECTURE.md           # This file (how it's built)
```

---

## Configuration Files

### `package.json`
**Purpose**: Defines project metadata, dependencies, and npm scripts

**Key Dependencies**:
- `next`: The framework itself
- `react` & `react-dom`: React library (Next.js is built on React)
- `typescript`: Type checking
- `tailwindcss`: CSS framework
- `framer-motion`: Animation library
- `next-themes`: Dark mode manager
- `@react-three/fiber` & `@react-three/drei`: 3D rendering
- `lucide-react`: Icon library

**Scripts**:
```json
"dev": "next dev"        // Start development server (localhost:3000)
"build": "next build"    // Build for production (generates static files)
"start": "next start"    // Start production server (not needed for static)
"lint": "next lint"      // Check code for errors
```

---

### `next.config.ts`
**Purpose**: Configures Next.js behavior

**Key Settings**:
```typescript
const nextConfig = {
  // Configuration options go here
  // Can enable features like image optimization, redirects, etc.
}
```

By default, Next.js has great defaults, so this file is mostly empty unless you need custom behavior.

---

### `tailwind.config.ts`
**Purpose**: Customizes Tailwind CSS theme

**What This Does**:
```typescript
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Where to look for classes
  theme: {
    extend: {
      colors: {
        accent: "#3b82f6",           // Custom accent color
        surface: { /* grayscale */ } // Custom neutral colors
      }
    }
  }
}
```

**Why This Matters**: Instead of using `bg-blue-500`, you can use `bg-accent`, which makes it easier to change your brand color later.

---

### `tsconfig.json`
**Purpose**: Configures TypeScript compiler

**Key Settings**:
```json
{
  "compilerOptions": {
    "target": "ES2017",              // JavaScript version to compile to
    "lib": ["dom", "ES2017"],        // Available APIs
    "jsx": "preserve",               // Keep JSX for Next.js to handle
    "module": "esnext",              // Use modern ES modules
    "moduleResolution": "bundler",   // How to resolve imports
    "strict": true,                  // Strict type checking
    "paths": {
      "@/*": ["./src/*"]             // Alias: @/components = src/components
    }
  }
}
```

**Path Aliases**: `@/` is a shortcut for `src/`. So instead of `../../components/Navbar`, you write `@/components/Navbar`.

---

## Data Layer

### `src/data/content.ts`
**Purpose**: Centralized content store - all text, links, and data in one file

This is a **content-first architecture** pattern. By separating content from presentation:
- Update site content without touching UI code
- Keep components focused on how things look, not what they say
- Easier to translate or swap content later

---

#### **Export: `siteConfig`**
```typescript
export const siteConfig = {
  name: "Your Name",
  tagline: "CS + Statistics @ UIUC",
  description: "Building things at the intersection...",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
}
```

**Used By**: Navbar, Footer, Home page, Connect page

**Learning Note**: This is a plain JavaScript object. Using `export const` makes it available to import in other files.

---

#### **Export: `aboutText`**
```typescript
export const aboutText = "I'm a Computer Science and Statistics student..."
```

**Used By**: Home page (About section)

**Learning Note**: Just a string. Could be a multi-line string with template literals (backticks).

---

#### **Export: `techStack`**
```typescript
export const techStack = [
  { name: "TypeScript", category: "language" },
  { name: "React", category: "frontend" },
  // ... more items
]
```

**Type**: Array of objects with `name` and `category`

**Used By**: Home page (Tech Stack section)

**Learning Note**: This array structure allows you to:
- Filter by category (show only "frontend" items)
- Sort alphabetically
- Add new properties (like proficiency level) without breaking existing code

---

#### **Interface: `ExperienceEntry`**
```typescript
export interface ExperienceEntry {
  type: "work" | "education";  // Union type: must be one of these
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  bullets: string[];           // Array of strings
}
```

**What This Does**: Defines the shape of an experience entry

**Why It's Useful**:
- TypeScript will error if you forget a required field
- IDE autocomplete shows available properties
- Self-documenting: you can see what data is expected

---

#### **Export: `experience`**
```typescript
export const experience: ExperienceEntry[] = [
  {
    type: "education",
    title: "B.S. Computer Science + Statistics",
    organization: "University of Illinois at Urbana-Champaign",
    startDate: "Aug 2022",
    endDate: "May 2026",
    bullets: ["Relevant coursework: ..."],
  },
  // ... more entries
]
```

**Type**: Array of `ExperienceEntry` objects

**Used By**: Experience page

**Learning Note**: The `: ExperienceEntry[]` annotation tells TypeScript "this is an array of ExperienceEntry objects". TypeScript will verify each object matches the interface.

---

#### **Interface: `Project`**
```typescript
export interface Project {
  title: string;
  description: string;
  techTags: string[];
  image?: string;      // ? means optional
  github?: string;
  live?: string;
}
```

**Optional Properties**: `?` means the property doesn't have to be present. If a project has no live demo, you can omit the `live` field.

---

#### **Export: `projects`**
```typescript
export const projects: Project[] = [
  {
    title: "Project Alpha",
    description: "A full-stack web application...",
    techTags: ["React", "Node.js", "PostgreSQL"],
    image: "/projects/placeholder.svg",
    github: "https://github.com/...",
  },
  // ... more projects
]
```

**Used By**: Projects page

---

## Component Layer

Components are **reusable UI building blocks**. Think of them like LEGO pieces you can compose together.

### General Component Principles

1. **"use client" Directive**:
   - Tells Next.js this component needs browser APIs
   - Required for interactivity (useState, useEffect, event handlers)
   - Required for third-party libraries that use browser APIs

2. **Props Pattern**:
   ```typescript
   function Component({ prop1, prop2 }: { prop1: string; prop2: number }) {
     // component code
   }
   ```
   This is **object destructuring** in the function parameters. The component receives a props object, and we immediately destructure it.

3. **Export Pattern**:
   - `export function Component()` - named export
   - File name matches component name (Navbar.tsx exports Navbar)

---

### `src/components/Navbar.tsx`

#### **Imports Explained**:
```typescript
import Link from "next/link";              // Next.js routing component
import { usePathname } from "next/navigation"; // Hook to get current URL
import { useState } from "react";          // React state hook
import { Menu, X } from "lucide-react";    // Icon components
import { ThemeToggle } from "./ThemeToggle"; // Our custom component
import { siteConfig } from "@/data/content"; // Content data
```

---

#### **Constants**:
```typescript
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/connect", label: "Connect" },
];
```

**Learning Note**: Defined outside the component so it's not recreated on every render. This is a performance optimization.

---

#### **Function: `Navbar()`**

```typescript
export function Navbar() {
  const pathname = usePathname();              // Current route, e.g., "/projects"
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu state

  return (
    <header className="fixed top-0 z-50 w-full glass">
      {/* JSX content */}
    </header>
  );
}
```

**What It Returns**: JSX (JavaScript XML) - looks like HTML but is JavaScript

**Key Concepts**:

1. **usePathname()**: A **hook** that returns the current URL path. Used to highlight the active page in the nav.

2. **useState()**: Creates a state variable that can change over time.
   ```typescript
   const [mobileOpen, setMobileOpen] = useState(false);
   //     └─ current value    └─ function to update it   └─ initial value
   ```

3. **Conditional Rendering**:
   ```typescript
   {mobileOpen && <div>Mobile Menu</div>}
   ```
   Short for: "If `mobileOpen` is true, render this div"

4. **Array Mapping**:
   ```typescript
   {navLinks.map((link) => (
     <Link key={link.href} href={link.href}>{link.label}</Link>
   ))}
   ```
   Loops through `navLinks` array and creates a `<Link>` for each item.

5. **Dynamic Classes**:
   ```typescript
   className={`base-classes ${pathname === link.href ? "active-classes" : "inactive-classes"}`}
   ```
   Uses a ternary operator to conditionally add CSS classes.

6. **Event Handlers**:
   ```typescript
   onClick={() => setMobileOpen(!mobileOpen)}
   ```
   When clicked, toggle `mobileOpen` between true and false.

---

### `src/components/Footer.tsx`

#### **Constants**:
```typescript
const socialLinks = [
  { href: siteConfig.github, icon: Github, label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];
```

**Learning Note**: Icons are **component references** (not strings). `icon: Github` stores the component itself, which we later render as `<link.icon />`.

---

#### **Function: `Footer()`**

```typescript
export function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-surface-500 dark:text-surface-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-surface-900 dark:text-surface-500 dark:hover:text-surface-100 transition-colors"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

**Key Concepts**:

1. **Dynamic Year**:
   ```typescript
   {new Date().getFullYear()}
   ```
   JavaScript expression in JSX (wrapped in `{}`). Gets current year.

2. **External Links**:
   ```typescript
   target="_blank" rel="noopener noreferrer"
   ```
   Opens in new tab (`_blank`) with security best practices (`noopener noreferrer`).

3. **Accessibility**:
   ```typescript
   aria-label={link.label}
   ```
   Screen readers can announce what the icon link does.

4. **Responsive Flexbox**:
   ```typescript
   className="flex-col sm:flex-row"
   ```
   Stacks vertically on mobile, horizontal on small screens and up.

---

### `src/components/ThemeProvider.tsx`

```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**Why This Exists**:
- Next.js App Router uses Server Components by default
- `next-themes` needs browser APIs (localStorage, window)
- Server Components can't use browser APIs
- Solution: Wrap it in a Client Component (`"use client"`)

**What `...props` Does** (**Spread Operator**):
- Takes all props passed to ThemeProvider
- Passes them through to NextThemesProvider
- This is a **wrapper component** pattern

**What `children` Is**:
- Special prop that represents nested content
- `<ThemeProvider>content here</ThemeProvider>` - "content here" is `children`

---

### `src/components/ThemeToggle.tsx`

```typescript
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

**Key Concepts**:

1. **useTheme() Hook**:
   ```typescript
   const { resolvedTheme, setTheme } = useTheme();
   ```
   - `resolvedTheme`: Current theme ("dark" or "light")
   - `setTheme(newTheme)`: Function to change theme

2. **Hydration Mismatch Prevention**:
   ```typescript
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   if (!mounted) return <div className="h-9 w-9" />;
   ```

   **Why This is Needed**:
   - Server renders component (doesn't know theme yet)
   - Client hydrates (now knows theme from localStorage)
   - If they differ, React errors: "Hydration mismatch"
   - Solution: Render placeholder until client-side mount

3. **useEffect() Hook**:
   ```typescript
   useEffect(() => {
     // Code to run after render
   }, []); // Empty array = run once after mount
   ```

4. **Ternary Operator**:
   ```typescript
   resolvedTheme === "dark" ? <Sun /> : <Moon />
   ```
   Short for: if dark, show sun icon, else show moon icon.

---

### `src/components/FadeIn.tsx`

```typescript
"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Purpose**: Animates elements as they scroll into view

**Key Concepts**:

1. **Interface with Optional Props**:
   ```typescript
   interface FadeInProps {
     delay?: number;  // Optional: uses default if not provided
   }
   ```

2. **Default Parameters**:
   ```typescript
   function FadeIn({ delay = 0, direction = "up" }: FadeInProps)
   ```
   If prop not provided, use the default value.

3. **Framer Motion Properties**:
   - `initial`: Starting state (invisible, offset)
   - `whileInView`: Target state when in viewport (visible, centered)
   - `viewport={{ once: true }}`: Only animate once (don't replay on scroll up)
   - `viewport={{ margin: "-50px" }}`: Trigger 50px before entering viewport
   - `transition`: How to animate (duration, delay, easing)

4. **Spread Operator**:
   ```typescript
   { opacity: 0, ...directionOffset[direction] }
   ```
   Takes properties from `directionOffset[direction]` and adds them to the object.
   Example: If `direction = "up"`, this becomes `{ opacity: 0, y: 24 }`

---

### `src/components/PageTransition.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Purpose**: Animates page content when route changes

**Key Concept - The `key` Prop**:
```typescript
key={pathname}
```

**How This Works**:
1. You navigate from `/` to `/projects`
2. `pathname` changes from `"/"` to `"/projects"`
3. `key` changes, so React sees this as a **new component**
4. React **unmounts** old component and **mounts** new one
5. New component plays `initial` → `animate` animation

**Without the key prop**, React would reuse the same `<motion.div>` and the animation wouldn't replay.

---

### `src/components/GLBAvatar.tsx`

This is the most complex component - let's break it down function by function.

```typescript
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
```

**Imports**:
- `Canvas`: Wrapper for Three.js scene (like a stage for 3D)
- `OrbitControls`: Click-and-drag camera controls
- `useGLTF`: Loads 3D model files
- `useAnimations`: Plays animations embedded in 3D models
- `Environment`: Adds realistic lighting/reflections
- `Suspense`: Shows fallback while 3D model loads
- `useRef`: References DOM elements or 3D objects
- `THREE`: Three.js library (3D graphics library)

---

#### **Function: `Model()`**

```typescript
function Model({ onLoad, onClick }: { onLoad: () => void; onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions, names } = useAnimations(animations, group);
  const [currentAnimIndex, setCurrentAnimIndex] = useState(0);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (names.length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
      const animName = names[currentAnimIndex % names.length];
      actions[animName]?.reset().fadeIn(0.3).play();
    }
  }, [actions, names, currentAnimIndex]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setCurrentAnimIndex((prev) => prev + 1);
    onClick();
  };

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.5}
      position={[0, -0.8, 0]}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  );
}
```

**Breaking It Down**:

1. **useRef Hook**:
   ```typescript
   const group = useRef<THREE.Group>(null);
   ```
   Creates a reference to the 3D object. Needed to control animations.

2. **useGLTF Hook**:
   ```typescript
   const { scene, animations } = useGLTF("/avatar.glb");
   ```
   - Loads 3D model from `/public/avatar.glb`
   - `scene`: The 3D object itself
   - `animations`: Any animations embedded in the file

3. **useAnimations Hook**:
   ```typescript
   const { actions, names } = useAnimations(animations, group);
   ```
   - `names`: Array of animation names ["idle", "wave", etc.]
   - `actions`: Object with methods to control each animation

4. **First useEffect** (Call onLoad):
   ```typescript
   useEffect(() => {
     onLoad();  // Tell parent component model has loaded
   }, [onLoad]);
   ```
   Runs once after mount, calls the callback prop.

5. **Second useEffect** (Play Animation):
   ```typescript
   useEffect(() => {
     if (names.length > 0) {
       // Stop all animations
       Object.values(actions).forEach((action) => action?.stop());

       // Play the current animation
       const animName = names[currentAnimIndex % names.length];
       actions[animName]?.reset().fadeIn(0.3).play();
     }
   }, [actions, names, currentAnimIndex]);
   ```

   **Dependency Array**: `[actions, names, currentAnimIndex]`
   - Runs whenever any of these change
   - When `currentAnimIndex` increases, this plays the next animation

   **Modulo Operator** (`%`):
   ```typescript
   currentAnimIndex % names.length
   ```
   Cycles through indices: 0, 1, 2, 0, 1, 2, ...

6. **Click Handler**:
   ```typescript
   const handleClick = (e: any) => {
     e.stopPropagation();  // Don't trigger other click handlers
     setCurrentAnimIndex((prev) => prev + 1);  // Cycle to next animation
     onClick();  // Call parent's callback
   };
   ```

7. **primitive Component**:
   ```typescript
   <primitive object={scene} ... />
   ```
   React Three Fiber's way to render a Three.js object.

   **Props**:
   - `object={scene}`: The 3D model to render
   - `scale={1.5}`: Make it 1.5x bigger
   - `position={[x, y, z]}`: Where to place it in 3D space
   - `onPointerOver/Out`: Change cursor on hover

---

#### **Function: `GLBAvatar()`**

```typescript
export function GLBAvatar() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[500px] w-full sm:h-[550px] lg:h-[600px]">
      <Canvas camera={{ position: [-1, 2, 4.5], fov: 45 }} className="rounded-xl">
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 3, 2]} intensity={1} />
          <directionalLight position={[-2, 1, -1]} intensity={0.3} />
          <pointLight position={[0, 2, -2]} intensity={0.4} color="#60a5fa" />
          <Environment preset="city" />
          <Model onLoad={() => setLoaded(true)} onClick={() => {}} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          target={[0, 0.2, 0]}
        />
      </Canvas>

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-950/50 rounded-xl">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-surface-700 border-t-accent" />
        </div>
      )}
    </div>
  );
}

useGLTF.preload("/avatar.glb");
```

**Breaking It Down**:

1. **Canvas Component**:
   ```typescript
   <Canvas camera={{ position: [-1, 2, 4.5], fov: 45 }}>
   ```
   Sets up the 3D scene.
   - `camera.position`: Where the camera is in [x, y, z] space
   - `fov`: Field of view (45 degrees - narrower = more zoomed in)

2. **Suspense**:
   ```typescript
   <Suspense fallback={null}>
   ```
   While child components load (like the 3D model), show `fallback`.
   `null` means show nothing (we have our own loading spinner).

3. **Lighting**:
   ```typescript
   <ambientLight intensity={0.9} />
   <directionalLight position={[2, 3, 2]} intensity={1} />
   ```
   - `ambientLight`: Uniform light from all directions (no shadows)
   - `directionalLight`: Light from a specific direction (like the sun)
   - `pointLight`: Light radiating from a point (like a light bulb)

4. **OrbitControls**:
   ```typescript
   <OrbitControls
     enableZoom={true}        // Allow scroll to zoom
     enablePan={false}        // Disable click-drag to move
     minDistance={2}          // Can't zoom in closer than 2 units
     maxDistance={5}          // Can't zoom out farther than 5 units
     target={[0, 0.2, 0]}     // Camera always looks at this point
   />
   ```

5. **Loading Spinner**:
   ```typescript
   {!loaded && (
     <div className="absolute inset-0 ...">
       <div className="h-10 w-10 animate-spin ..." />
     </div>
   )}
   ```
   Only visible when `loaded === false`.
   The `animate-spin` class (from Tailwind) rotates continuously.

6. **Preload**:
   ```typescript
   useGLTF.preload("/avatar.glb");
   ```
   Start loading the model immediately (don't wait for component to mount).

---

## Page Layer

In Next.js App Router, a **page** is a React component exported from a `page.tsx` file. The file's location determines the route.

```
src/app/page.tsx              → /
src/app/experience/page.tsx   → /experience
src/app/projects/page.tsx     → /projects
src/app/connect/page.tsx      → /connect
```

---

### `src/app/layout.tsx`

**Purpose**: The root layout that wraps **all pages**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  description: "CS + Statistics student at UIUC...",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Key Concepts**:

1. **next/font**:
   ```typescript
   const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
   ```
   - Downloads and self-hosts Google Fonts
   - Generates `--font-inter` CSS variable
   - `display: "swap"`: Show fallback font while custom font loads

2. **Metadata Export**:
   ```typescript
   export const metadata: Metadata = { ... };
   ```
   Next.js uses this to generate `<head>` tags automatically.
   - `title.default`: Used on home page
   - `title.template`: Used on other pages (e.g., "Projects | Your Name")

3. **suppressHydrationWarning**:
   ```typescript
   <html suppressHydrationWarning>
   ```
   Prevents React warning when `next-themes` adds `class="dark"` to `<html>`.

4. **Layout Structure**:
   ```typescript
   <html>
     <body>
       <ThemeProvider>
         <Navbar />
         <main>{children}</main>
         <Footer />
       </ThemeProvider>
     </body>
   </html>
   ```
   Every page gets wrapped in this structure automatically.

5. **{children} Prop**:
   This is where page content gets inserted.
   When you visit `/projects`, Next.js renders:
   ```typescript
   <RootLayout>
     <ProjectsPage />  ← This is "children"
   </RootLayout>
   ```

---

### `src/app/page.tsx` (Home Page)

```typescript
"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { GLBAvatar } from "@/components/GLBAvatar";
import { siteConfig, aboutText, techStack } from "@/data/content";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="section-container">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <FadeIn className="flex-1 space-y-6 text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hey, I&apos;m <span className="text-accent">{siteConfig.name}</span>
            </h1>
            <p className="max-w-lg text-lg text-surface-500 dark:text-surface-400">
              {siteConfig.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex-1">
            <GLBAvatar />
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="section-container border-t border-surface-200 dark:border-surface-800">
        <FadeIn>
          <h2 className="section-heading mb-6">About Me</h2>
          <p className="max-w-2xl text-surface-600 dark:text-surface-400 leading-relaxed">
            {aboutText}
          </p>
        </FadeIn>
      </section>

      {/* Tech Stack Section */}
      <section className="section-container border-t border-surface-200 dark:border-surface-800">
        <FadeIn>
          <h2 className="section-heading mb-8">Tech Stack</h2>
        </FadeIn>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.03}>
              <span className="rounded-full border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-accent/50 hover:text-accent transition-colors cursor-default">
                {tech.name}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
```

**Key Concepts**:

1. **Default Export**:
   ```typescript
   export default function Home()
   ```
   Page components must use `export default` (not named export).

2. **Composition Pattern**:
   The page composes smaller components:
   - `PageTransition` wraps everything for route animations
   - `FadeIn` wraps sections for scroll animations
   - `GLBAvatar` for the 3D model

3. **Staggered Animations**:
   ```typescript
   {techStack.map((tech, i) => (
     <FadeIn key={tech.name} delay={i * 0.03}>
   ```
   Each tech tag fades in 0.03s after the previous one.

4. **Responsive Layout**:
   ```typescript
   className="flex flex-col lg:flex-row"
   ```
   - Mobile: vertical stack (`flex-col`)
   - Large screens: horizontal row (`lg:flex-row`)

---

### `src/app/experience/page.tsx`

```typescript
"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { experience, ExperienceEntry } from "@/data/content";
import { Briefcase, GraduationCap } from "lucide-react";

export default function ExperiencePage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Experience</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            My journey so far — work experience and education.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-surface-200 dark:bg-surface-800 sm:left-8" />

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const Icon = entry.type === "work" ? Briefcase : GraduationCap;

  return (
    <FadeIn delay={index * 0.1} className="relative pl-12 sm:pl-20">
      {/* Timeline dot */}
      <div className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-950 sm:left-5">
        <Icon size={14} className="text-accent" />
      </div>

      {/* Content card */}
      <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 p-6">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">{entry.title}</h3>
          <span className="text-sm text-surface-500 dark:text-surface-500">
            {entry.startDate} — {entry.endDate}
          </span>
        </div>
        <p className="mb-3 text-sm font-medium text-accent">{entry.organization}</p>
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet, j) => (
            <li
              key={j}
              className="text-sm text-surface-600 dark:text-surface-400 before:mr-2 before:content-['▹'] before:text-accent"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}
```

**Key Concepts**:

1. **Conditional Component Assignment**:
   ```typescript
   const Icon = entry.type === "work" ? Briefcase : GraduationCap;
   ```
   Assigns a component (not JSX) to a variable, then renders it later:
   ```typescript
   <Icon size={14} />
   ```

2. **Pseudo-Elements in CSS**:
   ```typescript
   className="before:content-['▹']"
   ```
   Tailwind's `before:` prefix creates a CSS `::before` pseudo-element.
   Adds the "▹" character before each bullet point.

3. **Absolute Positioning for Timeline**:
   ```typescript
   <div className="absolute left-4 top-0 h-full w-px" />
   ```
   Creates a vertical line that spans the full height of its parent.

---

### `src/app/projects/page.tsx`

```typescript
"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { projects, Project } from "@/data/content";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Projects</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            A selection of things I&apos;ve built and explored.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="group overflow-hidden rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
        {project.image && (
          <div className="relative h-48 w-full overflow-hidden bg-surface-100 dark:bg-surface-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6">
          <h3 className="mb-2 text-lg font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-100 dark:bg-surface-800 px-3 py-1 text-xs font-medium text-surface-600 dark:text-surface-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-accent transition-colors"
              >
                <Github size={16} />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-accent transition-colors"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
```

**Key Concepts**:

1. **Next.js Image Component**:
   ```typescript
   <Image src={project.image} alt={project.title} fill />
   ```
   - Automatically optimizes images (converts to WebP, resizes)
   - `fill`: Image fills parent container (must have `position: relative`)
   - `alt`: Required for accessibility

2. **Group Hover** (Tailwind):
   ```typescript
   <div className="group ...">
     <div className="group-hover:scale-105">
   ```
   When hovering the parent (`.group`), apply styles to child (`.group-hover:`).

3. **Conditional Rendering**:
   ```typescript
   {project.github && <a href={project.github}>...</a>}
   ```
   Only render the link if `project.github` exists.

4. **CSS Grid**:
   ```typescript
   className="grid gap-6 sm:grid-cols-2"
   ```
   - 1 column on mobile
   - 2 columns on small screens and up (`sm:`)

---

### `src/app/connect/page.tsx`

```typescript
"use client";

import { FadeIn } from "@/components/FadeIn";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/data/content";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const socialLinks = [
  {
    href: siteConfig.github,
    icon: Github,
    label: "GitHub",
    description: "Check out my code",
  },
  {
    href: siteConfig.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    description: "Let's connect professionally",
  },
  {
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    label: "Email",
    description: siteConfig.email,
  },
];

export default function ConnectPage() {
  return (
    <PageTransition>
      <section className="section-container">
        <FadeIn>
          <h1 className="section-heading mb-4">Let&apos;s Connect</h1>
          <p className="mb-12 text-surface-500 dark:text-surface-400">
            Feel free to reach out — I&apos;m always open to interesting conversations and opportunities.
          </p>
        </FadeIn>

        {/* Social links grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {socialLinks.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 p-8 text-center transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
              >
                <link.icon
                  size={28}
                  className="text-surface-500 group-hover:text-accent transition-colors"
                />
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  {link.description}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Resume section */}
        <FadeIn>
          <div className="rounded-xl border border-surface-200 dark:border-surface-800 overflow-hidden">
            <div className="flex items-center justify-between bg-surface-50 dark:bg-surface-900/50 px-6 py-4">
              <h2 className="text-xl font-semibold">Resume</h2>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark transition-colors"
              >
                <FileDown size={16} />
                Download
              </a>
            </div>

            <div className="relative h-[600px] w-full bg-surface-100 dark:bg-surface-900">
              <iframe src="/resume.pdf" className="h-full w-full" title="Resume" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-surface-400 dark:text-surface-600 text-sm">
                  Place your resume.pdf in the /public folder
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
```

**Key Concepts**:

1. **Conditional Target**:
   ```typescript
   target={link.href.startsWith("mailto") ? undefined : "_blank"}
   ```
   Email links don't need `target="_blank"` (they open email client).
   External links open in new tab.

2. **iframe Element**:
   ```typescript
   <iframe src="/resume.pdf" title="Resume" />
   ```
   Embeds external content (like a PDF) in the page.

3. **Pointer Events**:
   ```typescript
   className="pointer-events-none"
   ```
   Makes element non-interactive (clicks pass through to elements behind).
   Used for fallback message so it doesn't block iframe clicks.

---

## How Everything Connects

### Data Flow

1. **Content Source**: `src/data/content.ts`
   - Exports `siteConfig`, `aboutText`, `techStack`, `experience`, `projects`

2. **Pages Import Content**:
   ```typescript
   import { siteConfig, techStack } from "@/data/content";
   ```

3. **Pages Render Components**:
   ```typescript
   <FadeIn>
     <span>{tech.name}</span>
   </FadeIn>
   ```

4. **Components Use Props**:
   ```typescript
   function FadeIn({ children, delay }) {
     return <motion.div delay={delay}>{children}</motion.div>;
   }
   ```

---

### Rendering Flow

1. **Build Time** (Static Generation):
   ```bash
   npm run build
   ```
   - Next.js renders each page to HTML
   - Generates static files in `.next/` folder
   - No server needed after this

2. **Browser Load**:
   - Browser downloads HTML (fully rendered)
   - User sees content immediately (no loading spinner)
   - JavaScript loads in background

3. **Hydration**:
   - React "hydrates" the HTML (makes it interactive)
   - Event listeners attached
   - State management initialized
   - Now buttons/links/animations work

---

### Theme System Flow

1. **Root Layout** wraps app in `ThemeProvider`:
   ```typescript
   <ThemeProvider defaultTheme="dark">
   ```

2. **next-themes**:
   - Reads `localStorage` for saved theme
   - Injects `class="dark"` on `<html>` if dark mode
   - Provides `useTheme()` hook to all components

3. **ThemeToggle** calls `setTheme()`:
   - Updates `class` on `<html>`
   - Saves to `localStorage`
   - CSS sees `.dark` class and applies dark mode styles

4. **Tailwind** uses class strategy:
   ```css
   bg-white dark:bg-black
   ```
   Without `dark:` → light mode style
   With `dark:` → applied when `.dark` class present

---

### Animation Flow

1. **Route Change**:
   - User clicks link: `/` → `/projects`
   - Next.js renders ProjectsPage
   - `<PageTransition key="/projects">` gets new key
   - React unmounts old component, mounts new one
   - `initial` → `animate` transition plays

2. **Scroll Animation**:
   - Page renders with `<FadeIn>` components
   - Framer Motion watches viewport
   - When element enters view: `whileInView` triggers
   - `opacity: 0` → `opacity: 1` with slide

---

## Next.js App Router Concepts

### File-Based Routing

```
src/app/
├── page.tsx              → /
├── layout.tsx            → Layout for /
├── projects/
│   └── page.tsx          → /projects
└── [id]/
    └── page.tsx          → /anything (dynamic route)
```

**Key Rules**:
- `page.tsx` = route is publicly accessible
- `layout.tsx` = wraps page (shared UI)
- Folder name = URL segment

---

### Server vs Client Components

**Default**: Server Components (new in App Router)

**Server Components**:
- Rendered on server (or at build time)
- Can't use hooks (`useState`, `useEffect`)
- Can't use browser APIs (`window`, `localStorage`)
- Smaller JavaScript bundle (component code not sent to browser)

**Client Components**:
- Marked with `"use client"`
- Can use hooks and browser APIs
- Needed for interactivity

**When to Use Client Components**:
- Need state (`useState`)
- Need effects (`useEffect`)
- Need event handlers (`onClick`)
- Use browser APIs
- Use context from Client Context Providers

---

### Layouts

**Purpose**: Shared UI that wraps pages

**Key Feature**: Layouts don't re-render on route change

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />      {/* Stays mounted during navigation */}
        {children}      {/* Page content swaps here */}
        <Footer />      {/* Stays mounted during navigation */}
      </body>
    </html>
  );
}
```

When navigating `/` → `/projects`, only `{children}` changes.

---

### Metadata

**Purpose**: SEO tags (`<title>`, `<meta>`, Open Graph)

```typescript
export const metadata: Metadata = {
  title: "My Portfolio",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    images: ["/og-image.png"],
  },
};
```

Next.js automatically generates:
```html
<head>
  <title>My Portfolio</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
</head>
```

---

### Static Generation

**What It Is**: Pages are pre-rendered at build time (not on request)

**How It Works**:
```typescript
export default function Page() {
  return <div>Static content</div>;
}
```

During `npm run build`:
1. Next.js executes this component
2. Renders it to HTML
3. Saves HTML to `.next/` folder
4. On request, serves static HTML (no rendering needed)

**Benefits**:
- Instant load times
- Works without JavaScript
- Great SEO (search engines see content immediately)
- Can host on CDN (no server needed)

---

### Image Optimization

**Before**:
```html
<img src="/avatar.png" alt="Avatar" />
```

**With Next.js**:
```typescript
import Image from "next/image";

<Image src="/avatar.png" alt="Avatar" width={400} height={400} />
```

**What Next.js Does**:
- Converts to modern formats (WebP, AVIF)
- Resizes for different screen sizes
- Lazy loads (doesn't load until in viewport)
- Serves from optimized cache

---

### Font Optimization

**Before**:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
```

**With Next.js**:
```typescript
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

**What Next.js Does**:
- Downloads font at build time
- Self-hosts (no external request)
- Generates CSS with `font-display: swap`
- No layout shift (font size reserved)

---

## Summary: Learning Path

If you're learning Next.js, study in this order:

1. **React Fundamentals**:
   - Components and JSX
   - Props and state (`useState`)
   - Effects (`useEffect`)
   - Event handling

2. **TypeScript Basics**:
   - Types and interfaces
   - Type annotations
   - Optional properties (`?`)

3. **Next.js App Router**:
   - File-based routing
   - Layouts and pages
   - Server vs Client Components
   - Static generation

4. **Styling**:
   - Tailwind utility classes
   - Responsive design
   - Dark mode

5. **Advanced Topics**:
   - Framer Motion animations
   - 3D rendering (React Three Fiber)
   - Theme management

---

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| `src/data/content.ts` | All site content |
| `src/app/layout.tsx` | Root layout (Navbar, Footer, Theme) |
| `src/app/page.tsx` | Home page |
| `src/components/Navbar.tsx` | Navigation bar |
| `src/components/FadeIn.tsx` | Scroll animation wrapper |
| `src/components/GLBAvatar.tsx` | 3D avatar |
| `tailwind.config.ts` | Theme customization |
| `package.json` | Dependencies and scripts |

---

## Next Steps

1. **Customize Content**: Edit `src/data/content.ts` with your real info
2. **Add Assets**: Add your `resume.pdf` and project screenshots
3. **Deploy**: Push to GitHub, deploy to Vercel
4. **Enhance**: Add more features (blog, contact form, analytics)

Use this document as your reference whenever you're confused about how something works!
