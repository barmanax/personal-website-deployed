# Product Requirements Document (PRD)
## Personal Portfolio Website

---

## 1. Project Overview

**Goal**: Build a modern, professional portfolio website to showcase experience, projects, and skills.

**Target Audience**:
- Recruiters and hiring managers
- Potential collaborators and peers
- Anyone interested in your work

**Core Value Proposition**:
A clean, fast, and visually engaging portfolio that demonstrates both technical skills and design sensibility through its implementation.

---

## 2. Technical Requirements

### 2.1 Framework & Technologies

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **Next.js 14 (App Router)** | React framework | Modern, production-ready framework with built-in routing, SEO, and optimization features |
| **TypeScript** | Type safety | Catches errors at compile-time, improves developer experience with autocomplete |
| **Tailwind CSS** | Styling | Utility-first CSS framework for rapid, consistent styling with dark mode support |
| **Framer Motion** | Animations | Declarative animation library for smooth, professional transitions |
| **next-themes** | Theme switching | Handles dark/light mode with no flash of unstyled content |
| **React Three Fiber + Drei** | 3D rendering | Declarative Three.js wrapper for rendering 3D avatar model |
| **lucide-react** | Icons | Lightweight, modern icon library |

### 2.2 Performance Requirements

- **Build Type**: Static Site Generation (SSG)
  - All pages pre-rendered at build time
  - No server needed - can deploy to any static host
  - Instant page loads with zero backend latency

- **Optimization Goals**:
  - First Contentful Paint (FCP) < 1.5s
  - Largest Contentful Paint (LCP) < 2.5s
  - Next.js automatic image optimization with `next/image`
  - Font self-hosting via `next/font` to eliminate external requests

### 2.3 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design (mobile-first approach)
- WebGL support required for 3D avatar (graceful fallback for unsupported browsers)

---

## 3. Feature Requirements

### 3.1 Core Pages

#### Home Page (`/`)
**Purpose**: First impression - introduce yourself and showcase personality

**Sections**:
1. **Hero Section**
   - Name and tagline prominently displayed
   - Brief elevator pitch (1-2 sentences)
   - Interactive 3D avatar to demonstrate technical skills and add personality
   - Responsive layout: side-by-side on desktop, stacked on mobile

2. **About Section**
   - Longer bio paragraph (3-4 sentences)
   - Personal background and interests
   - What drives you professionally

3. **Tech Stack Section**
   - Visual display of technologies you know
   - Grouped by category (languages, frontend, backend, tools)
   - Interactive hover effects

**User Actions**:
- Click avatar to cycle through animations
- Drag avatar to rotate (OrbitControls)
- Scroll to zoom on avatar

---

#### Experience Page (`/experience`)
**Purpose**: Showcase work history and education in a scannable format

**Layout**: Vertical timeline with alternating cards

**Each Entry Includes**:
- Icon (briefcase for work, graduation cap for education)
- Job title / Degree
- Company / University name
- Date range (start - end or "Present")
- Bullet points highlighting key achievements/responsibilities

**Design Principles**:
- Visual timeline connects entries chronologically
- Color-coded icons for quick visual scanning
- Hover effects for interactivity
- Staggered fade-in animations as you scroll

---

#### Projects Page (`/projects`)
**Purpose**: Portfolio showcase - demonstrate what you've built

**Layout**: Responsive card grid (2 columns on desktop, 1 on mobile)

**Each Project Card Includes**:
- Thumbnail image (placeholder or screenshot)
- Project title
- Brief description (2-3 sentences)
- Tech stack tags
- Links to GitHub repository and/or live demo
- Hover effect: card lifts and border highlights

**Interaction**:
- Cards animate in with staggered delays
- External links open in new tabs
- Cards are not clickable themselves (only the links)

---

#### Connect Page (`/connect`)
**Purpose**: Make it easy for people to reach out

**Sections**:
1. **Social Links Grid**
   - GitHub: Link to your profile
   - LinkedIn: Professional networking
   - Email: Direct contact

2. **Resume Viewer**
   - Embedded PDF viewer (iframe)
   - Download button for quick access
   - Fallback message if PDF not yet added

---

### 3.2 Navigation & Layout

#### Navbar (Fixed Header)
- **Desktop**: Horizontal nav links with theme toggle
- **Mobile**: Hamburger menu that slides down
- **Active State**: Current page highlighted with accent color
- **Glass Effect**: Semi-transparent backdrop with blur

#### Footer
- Copyright notice with auto-updating year
- Social icon links (same as Connect page)

#### Theme System
- **Default**: Dark mode
- **Toggle**: Sun/moon icon button
- **Persistence**: Theme choice saved in localStorage
- **No Flash**: `suppressHydrationWarning` prevents theme flicker on load

---

### 3.3 Animations & Interactions

#### Page Transitions
- Fade + slide up animation when navigating between pages
- Keyed by pathname so animation replays on route change
- Duration: 350ms with easeOut timing

#### Scroll Animations
- **FadeIn Component**: Elements fade in as they enter viewport
- Configurable delay for staggered effects
- Directional slides (up, down, left, right, or none)
- `once: true` - animations only play once (no replay on scroll up)

#### Hover Effects
- Nav links: color transition
- Tech stack tags: border color and text color
- Project cards: lift, shadow, border glow
- Social links: icon and text color
- All transitions use 300ms duration for consistency

---

## 4. Content Structure

### 4.1 Data Separation Pattern

**Philosophy**: Keep content separate from presentation

**Implementation**: Single `src/data/content.ts` file contains:
- Site configuration (name, tagline, email, social links)
- About text
- Tech stack array
- Experience entries
- Project entries

**Benefits**:
- Update all site content in one place
- Components stay focused on presentation
- Easy to add new entries without touching UI code
- Type safety with TypeScript interfaces

---

## 5. Design System

### 5.1 Color Palette

**Custom Tailwind Theme** (defined in `tailwind.config.ts`):

| Color Variable | Light Mode | Dark Mode | Usage |
|----------------|------------|-----------|-------|
| `accent` | Blue (#3b82f6) | Blue (#60a5fa) | Primary actions, links, highlights |
| `surface-50` | Very light gray | Darkest black | Background layers |
| `surface-100` - `surface-950` | Gray scale | Gray scale | Borders, text, secondary elements |

**Why Custom Colors?**
- Semantic naming: `accent` is clearer than "blue-500"
- Consistent brand identity
- Easy to swap entire color scheme by changing config

### 5.2 Typography

**Font Family**: Inter (Google Fonts)
- Modern, professional sans-serif
- Excellent readability at all sizes
- Self-hosted via `next/font` for performance

**Type Scale**:
- Hero heading: 4xl - 6xl (responsive)
- Section headings: 3xl - 4xl
- Subheadings: lg - xl
- Body text: base (16px)
- Small text: sm (14px)

### 5.3 Spacing System

- **Section padding**: py-20 (80px vertical)
- **Max content width**: 6xl (1152px)
- **Horizontal padding**: px-6 mobile, px-8 desktop
- **Card gaps**: gap-4 to gap-6

### 5.4 Border Radius

- Buttons/small elements: rounded-lg (8px)
- Cards/sections: rounded-xl (12px)
- Tags: rounded-full (pill shape)

---

## 6. User Experience Principles

### 6.1 Performance First
- Static generation for instant loads
- Optimized images and fonts
- Minimal JavaScript bundle
- 3D avatar loaded with Suspense (non-blocking)

### 6.2 Accessibility
- Semantic HTML (header, nav, main, footer, section)
- ARIA labels on icon-only buttons
- Keyboard navigation support
- Sufficient color contrast
- Focus visible states

### 6.3 Mobile-First Design
- All components designed for mobile first
- Progressive enhancement for larger screens
- Touch-friendly hit targets (minimum 44x44px)
- Readable text without zooming

### 6.4 Visual Feedback
- Hover states on all interactive elements
- Loading spinner for 3D avatar
- Smooth transitions (no jarring changes)
- Active page indicator in nav

---

## 7. Deployment Strategy

### 7.1 Build Output
```bash
npm run build
```
- Generates static HTML/CSS/JS in `.next/` folder
- All 4 pages pre-rendered
- Ready for static hosting

### 7.2 Hosting Options
- **Vercel** (recommended): Zero-config Next.js deployment
- **Netlify**: Drag-and-drop or git-based deployment
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Fast global CDN

### 7.3 Custom Domain
- Point DNS records to hosting provider
- Automatic HTTPS with provider's SSL

---

## 8. Future Enhancements (Phase 7+)

### 8.1 Content
- [ ] Add real project screenshots
- [ ] Add resume PDF
- [ ] Write detailed project descriptions
- [ ] Add blog section for technical writing

### 8.2 Features
- [ ] Contact form with email API integration
- [ ] Project filtering by tech stack
- [ ] Detailed project pages with case studies
- [ ] Analytics integration (Vercel Analytics or Plausible)

### 8.3 Polish
- [ ] Per-page SEO metadata (title, description, Open Graph)
- [ ] Favicon and app icons
- [ ] 404 error page
- [ ] Loading states for route transitions
- [ ] Improved mobile responsiveness on very small screens

### 8.4 Performance
- [ ] Lighthouse audit and optimization
- [ ] Image optimization (convert to WebP/AVIF)
- [ ] Bundle size analysis
- [ ] Lazy loading for below-the-fold content

---

## 9. Success Metrics

**Qualitative**:
- Site looks professional and modern
- Content is easy to read and navigate
- Personality comes through without being unprofessional
- Code demonstrates technical competence

**Quantitative**:
- Lighthouse score > 90 on all metrics
- Build completes successfully
- All pages render without errors
- Mobile responsive on devices down to 320px width

---

## 10. Non-Goals (Out of Scope)

- **Backend/Database**: This is a static site - no server-side logic
- **User Accounts**: No login or authentication
- **Blog with CMS**: Could be added later, but not in initial version
- **E-commerce**: Not a business site
- **Real-time Features**: No websockets or live updates needed
- **Multi-language Support**: English only for now

---

## Appendix: Technology Decision Rationale

### Why Next.js?
- Industry standard for React applications
- Built-in routing (no react-router needed)
- Excellent SEO with static generation
- Image and font optimization out of the box
- Large ecosystem and community support

### Why App Router (not Pages Router)?
- Latest Next.js paradigm (as of Next.js 13+)
- Server Components by default (better performance)
- Simpler data fetching patterns
- Better TypeScript support
- This is what new projects should use going forward

### Why Static Generation (not SSR or CSR)?
- **vs. SSR**: No server needed, lower hosting costs, faster load times
- **vs. CSR**: Better SEO, instant first paint, works without JavaScript
- Portfolio content doesn't change often, perfect for static generation

### Why TypeScript?
- Catches bugs before runtime
- Better IDE autocomplete and intellisense
- Self-documenting code (types show what's expected)
- Industry standard for professional projects

### Why Tailwind CSS?
- Faster development than writing custom CSS
- Consistent design system built-in
- Great dark mode support
- Purges unused styles for tiny bundle size
- Responsive utilities make mobile-first easy

### Why Framer Motion?
- Most popular React animation library
- Declarative API (easier than manual animation)
- Great performance (uses GPU acceleration)
- Built-in scroll animations and gestures
- TypeScript support

### Why React Three Fiber?
- React-friendly way to use Three.js
- Declarative 3D scene construction
- Better performance than vanilla Three.js for React apps
- Hooks-based API fits React paradigm
- Drei provides useful abstractions (OrbitControls, useGLTF, etc.)
