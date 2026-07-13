/**
 * Central content file - edit this to update all site content.
 * Keeps data separate from presentation so the UI components stay clean.
 *
 * NOTE: Bullets here are curated for a PUBLIC website (indexed by search
 * engines) and have been screened to exclude internal metrics and
 * unreleased-product details that only belong on a privately shared resume.
 */

export const siteConfig = {
  name: "Aditya Barman",
  tagline: "CS + Statistics @ UIUC",
  description:
    "Building things at the intersection of software engineering and data. Passionate about creating elegant solutions to complex problems.",
  email: "a02barman@gmail.com",
  github: "https://github.com/barmanax",
  linkedin: "https://www.linkedin.com/in/adityabarman/",
};

export const aboutText =
  "I'm a Computer Science and Statistics student at the University of Illinois Urbana-Champaign. I love building full-stack applications, exploring data-driven insights, and learning new concepts. When I'm not coding, you'll find me playing sports, listening to music, traveling the world, and rating food spots on Beli.";

/** The three role-based filter tabs shown in the tech stack section */
export type TechCategory = "fullstack" | "backend" | "data";

export interface TechItem {
  name: string;
  /** One or more tabs this skill belongs to - skills can appear in multiple tabs */
  categories: TechCategory[];
  /** Optional external URL - renders the pill as a clickable link */
  link?: string;
}

/** Tech stack items - each tagged with one or more role categories for tab filtering */
export const techStack: TechItem[] = [
  // Full-stack
  { name: "JavaScript",              categories: ["fullstack"] },
  { name: "TypeScript",              categories: ["fullstack"] },
  { name: "HTML/CSS",                categories: ["fullstack"] },
  { name: "React",                   categories: ["fullstack"] },
  { name: "Next.js",                 categories: ["fullstack"] },
  // Full-stack + backend
  { name: "Node.js",                 categories: ["fullstack", "backend"] },
  { name: "Express",                 categories: ["fullstack", "backend"] },
  { name: "Django",                  categories: ["fullstack", "backend"] },
  { name: "MongoDB",                 categories: ["fullstack", "backend"] },
  { name: "Docker",                  categories: ["fullstack", "backend"] },
  { name: "Git",                     categories: ["fullstack", "backend", "data"] },
  // Backend
  { name: "Python",                  categories: ["backend", "data"] },
  { name: "Java",                    categories: ["backend"] },
  { name: "Kotlin",                  categories: ["backend"] },
  { name: "C++",                     categories: ["backend"] },
  { name: "SQL (MySQL)",             categories: ["backend", "data"] },
  { name: "Flask",                   categories: ["backend", "data"] },
  { name: "FastAPI",                 categories: ["backend"] },
  { name: "gRPC",                    categories: ["backend"] },
  { name: "Kubernetes",              categories: ["backend"] },
  { name: "AWS",                     categories: ["backend", "data"], link: "https://www.credly.com/badges/a24ca5ef-cf6d-4411-b7c1-3a9e9421d2a5/public_url" },
  { name: "GCP",                     categories: ["backend", "data"] },
  // Data engineering / data science
  { name: "R",                       categories: ["data"] },
  { name: "MATLAB",                  categories: ["data"] },
  { name: "TensorFlow",              categories: ["data"] },
  { name: "LangChain",               categories: ["data"] },
  { name: "Scikit-learn",            categories: ["data"] },
  { name: "Pandas",                  categories: ["data"] },
  { name: "NumPy",                   categories: ["data"] },
  { name: "Matplotlib",              categories: ["data"] },
  { name: "Seaborn",                 categories: ["data"] },
  { name: "OpenCV",                  categories: ["data"] },
  { name: "HuggingFace Transformers", categories: ["data"] },
];

// ---------------------------------------------------------------------------
// EXPERIENCE - work roles only; education lives in its own array below
// ---------------------------------------------------------------------------

export interface ExperienceEntry {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: "Software Engineer Intern, Real-Time Services",
    organization: "Slack (Salesforce)",
    location: "San Francisco, CA",
    startDate: "May 2026",
    endDate: "Present",
    // Public-safe framing only: no internal capacity figures or unreleased work
    bullets: [
      "Building TimerCaller, a standalone Java microservice that decouples gRPC callback execution from timer scheduling in Slack's platform-wide Timerserver — the system delivering millions of time-sensitive events per day (scheduled messages, reminders, workflow triggers).",
      "Authored the project RFC and engineering a zero-downtime migration using parallel AWS SQS queue consumers and a staged rollout, enabling independent horizontal autoscaling of the pipeline's most burst-sensitive stage.",
    ],
  },
  {
    title: "Software Engineering Intern & Co-Op",
    organization: "Motorola Solutions",
    location: "Chicago, IL",
    startDate: "May 2025",
    endDate: "Nov 2025",
    bullets: [
      "Architected and deployed a full-stack RAG system (LangChain, ChromaDB, HuggingFace embeddings, Gemini API) serving 350 systems engineers, indexing 30K+ proprietary documents with vector storage and structured API responses.",
      "Engineered document ingestion pipelines with chunking, embedding generation, and role-based access controls, improving retrieval precision 40%+ and answer accuracy 65%.",
      "Extended the platform with multimodal search (OpenAI CLIP embeddings) and an automated diagram generation pipeline (Python, DrawSVG), cutting manual documentation effort by 80% and shipping to production organization-wide.",
    ],
  },
  {
    title: "Computer Vision & Machine Learning Researcher",
    organization: "University of Illinois & U.S. Department of Agriculture (USDA)",
    location: "Urbana, IL",
    startDate: "Nov 2024",
    endDate: "May 2025",
    bullets: [
      "Engineered an OpenCV image processing pipeline to warp, segment, and analyze 198 kernel/flake image pairs with 95%+ accuracy, producing a structured dataset of 1,700+ measurements for downstream ML.",
      "Trained TensorFlow regression models to predict popcorn flake expansion from kernel morphology, accelerating USDA breeding program analysis.",
    ],
  },
  {
    title: "Software Development Intern — AI4Defense Program",
    organization: "Chief Digital & AI Office (CDAO), Dept. of Defense",
    location: "Washington, D.C.",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    bullets: [
      "Built a Python + OpenAI application automating key-term extraction from government documents with PDF ingestion, sentiment scoring, and interactive visualization, reducing manual policy review effort by 90%.",
      "Presented at the AI4Defense Showcase and achieved a podium finish among competing teams.",
    ],
  },
  {
    title: "Artificial Intelligence Research Intern",
    organization: "George Mason University",
    location: "Fairfax, VA",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    bullets: [
      "Benchmarked 4 LLMs (ChatGPT, Copilot, Claude, Gemini) on algorithm grading tasks, computing Intraclass Correlation Coefficients to quantify grading reliability across 200+ submissions.",
      "Co-authored paper accepted to the MIT Undergraduate Research Technology Conference (URTC) 2024.",
    ],
  },
];

// ---------------------------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------------------------

export interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  graduation: string;
  gpa?: string;
  honors?: string[];
  activities?: string[];
  /** Highlighted coursework only - not the full transcript */
  coursework?: string[];
}

export const education: EducationEntry[] = [
  {
    institution: "University of Illinois at Urbana-Champaign",
    location: "Champaign, IL",
    degree: "B.S. Computer Science & Statistics, Minor in Mathematics",
    graduation: "May 2027",
    gpa: "3.97/4.0",
    honors: ["James Scholars Honors Program"],
    activities: [
      "Pulse Competitions Committee",
      "CS Sail Logistics Staff",
      "Simplify Campus Ambassador",
    ],
    coursework: [
      "Data Structures",
      "Algorithms & Models of Computation",
      "Database Systems",
      "Software Engineering",
      "Numerical Methods",
      "Statistics & Probability I/II",
      "Statistical Modeling",
      "Linear Algebra with Computational Applications",
    ],
  },
  {
    institution: "Edison Academy Magnet School",
    location: "Edison, NJ",
    degree: "Electrical Engineering & Computer Science (EECS) Track",
    graduation: "Jun 2024",
    activities: [
      "Specialized magnet program focused on electrical engineering and computer science fundamentals",
    ],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS - ordered reverse-chronologically
// ---------------------------------------------------------------------------

export interface Project {
  title: string;
  description: string;
  techTags: string[];
  /** Completion date, e.g. "May 2026" - shown on cards and used for ordering */
  date: string;
  image?: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "mini-SWE-Agent",
    date: "May 2026",
    description:
      "Extended the open-source mini-SWE-Agent with a Docker-aware tool registry and conversation memory system, improving SWE-bench verified resolution from 45% to 55% and autonomously resolving 5+ real open-source GitHub issues.",
    techTags: ["Python", "LiteLLM", "Docker", "SWE-bench", "Vertex AI"],
    github: "https://github.com/DevashishKhatavkar/cs427-agent-team419",
  },
  {
    title: "Samur.ai",
    date: "Mar 2026",
    description:
      "NLP-driven scheduling engine that parses course syllabi, extracts deadlines via the Gemini API, and auto-generates optimized study plans. Self-deployed to production via Coolify on a personal VPS.",
    techTags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Gemini API", "Coolify"],
    image: "/projects/samurai.png",
    github: "https://github.com/barmanax/samur.ai",
  },
  {
    title: "Autoply",
    date: "Feb 2026",
    description:
      "LLM-powered job application agent that scrapes listings, matches them to user profiles, and auto-drafts tailored submissions through a multi-step agentic pipeline with retry logic and structured output validation.",
    techTags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Keywords AI"],
    image: "/projects/autoply.png",
    github: "https://github.com/barmanax/autoply",
  },
  {
    title: "Hypo",
    date: "Jan 2026",
    description:
      "Full-stack experiment tracker with OAuth-secured dashboards for logging, analyzing, and validating behavioral and lifestyle hypotheses.",
    techTags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Google OAuth"],
    image: "/projects/hypo.png",
    github: "https://github.com/barmanax/hypo",
  },
  {
    title: "ClassCompass",
    date: "Dec 2025",
    description:
      "Full-stack course discovery platform for UIUC students with REST API-backed search, filtering, and bookmarking of 4,966 courses. Built in a 4-person agile team with CI/CD and test-driven development.",
    techTags: ["Django", "Next.js", "React", "TypeScript", "PostgreSQL", "Supabase"],
    image: "/projects/coursecompass.png",
    github: "https://github.com/CS222-UIUC/ClassCompass",
  },
  {
    title: "EchoBrief",
    date: "Jul 2025",
    description:
      "Real-time speech-to-insight pipeline that transcribes and analyzes post-incident audio for public safety teams. Placed Top 10 of 495 at Motorola Solutions' Open Innovation Hackathon.",
    techTags: ["React", "JavaScript", "FastAPI", "Python", "OpenAI Whisper", "Gemini API"],
    image: "/projects/echobrief.png",
    github: "https://github.com/barmanax/echobrief",
  },
  {
    title: "Popcorn Vision",
    date: "May 2025",
    description:
      "Computer vision pipeline for perspective warping, contour segmentation, and morphological analysis of popcorn kernels to predict flake expansion for USDA research.",
    techTags: ["Python", "OpenCV", "Matplotlib", "NumPy", "Pandas"],
    image: "/projects/popcorn.png",
    github: "https://github.com/barmanax/popcorn-vision",
  },
  {
    title: "LearnLion",
    date: "Nov 2024",
    description:
      "AI-powered learning platform that generates personalized quizzes and study materials from uploaded course content. Placed 2nd at HackIllinois x CS124 out of 80+ teams.",
    techTags: ["Python", "Flask", "React"],
  },
];
