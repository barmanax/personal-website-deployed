/**
 * Central content file - edit this to update all site content.
 * Keeps data separate from presentation so the UI components stay clean.
 */

import { BellIcon } from "lucide-react";
import  React from 'react'; 

export const siteConfig = {
  name: "Aditya Barman",
  tagline: "CS + Statistics @ UIUC",
  description:
    "Building things at the intersection of software engineering and data. Passionate about creating elegant solutions to complex problems.",
  email: "a02barman@gmail.com",
  github: "https://github.com/barmanax",
  linkedin: "https://www.linkedin.com/in/adityabarman/",
};

export const aboutText = React.createElement(
  "span",
  null,
  "I'm a Computer Science and Statistics student at the University of Illinois Urbana-Champaign. I love building full-stack applications, exploring data-driven insights, and learning new concepts. When I'm not coding, you'll find me playing sports, listening to music, traveling the world, and rating food spots on ",
  React.createElement(
    "a",
    { href: "https://beliapp.co/app/adityabarman", target: "_blank", rel: "noopener noreferrer", className: "text-accent hover:underline" },
    "Beli"
  ),
  "."
);

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

export interface ExperienceEntry {
  type: "work" | "education";
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    type: "work",
    title: "Software Engineering Intern & Co-Op",
    organization: "Motorola Solutions",
    startDate: "May 2025",
    endDate: "Nov 2025",
    bullets: [
      "Designed and deployed a full-stack RAG system (LangChain, ChromaDB, HuggingFace, Gemini) indexing 30k+ proprietary documents, improving retrieval precision 40%+ and accuracy 65% for 350 systems engineers.",
      "Extended the platform with multimodal capabilities (OpenAI CLIP embeddings) and automated rack/cable diagram generation (DrawSVG), cutting manual effort by 80% and shipping to production organization-wide.",
    ],
  },
  {
    type: "work",
    title: "Computer Vision & Machine Learning Researcher",
    organization: "University of Illinois & U.S. Department of Agriculture (USDA)",
    startDate: "Nov 2024",
    endDate: "May 2025",
    bullets: [
      "Built an OpenCV image processing pipeline to warp, segment, and analyze 198 kernel/flake image pairs with 95%+ success rate, producing a dataset of 1,700+ measurements for downstream ML.",
      "Applied TensorFlow regression models to predict popcorn flake expansion from kernel characteristics, accelerating breeding program analysis.",
    ],
  },
  {
    type: "work",
    title: "Software Development Intern – AI4Defense Program",
    organization: "Chief Digital & AI Office (CDAO), Dept. of Defense",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    bullets: [
      "Built a Python + OpenAI application automating key-term extraction from government documents with PDF ingestion, sentiment scoring, and visualization, reducing manual effort by 90%.",
      "Presented at the AI4Defense Showcase and achieved a podium finish.",
    ],
  },
  {
    type: "work",
    title: "Artificial Intelligence Research Intern",
    organization: "George Mason University",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    bullets: [
      "Benchmarked 4 LLMs (ChatGPT, Copilot, Claude, Gemini) on algorithm grading tasks, computing Intraclass Correlation Coefficients to quantify evaluation consistency.",
      "Co-authored paper accepted to the MIT Undergraduate Research Technology Conference (URTC) 2024.",
    ],
  },
  {
    type: "education",
    title: "B.S. Computer Science + Statistics",
    organization: "University of Illinois at Urbana-Champaign",
    startDate: "Aug 2024",
    endDate: "May 2027",
    bullets: [
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Statistical Modeling, Software Engineering",
    ],
  },
  {
    type: "education",
    title: "Electrical Engineering & Computer Science (EECS) Track",
    organization: "Edison Academy Magnet School",
    startDate: "Sep 2020",
    endDate: "Jun 2024",
    bullets: [
      "Specialized magnet program focused on electrical engineering and computer science fundamentals",
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  techTags: string[];
  image?: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Echobrief",
    description:
      "Real-time speech-to-insight pipeline that transcribes and analyzes post-incident audio for public safety teams. Placed at MSI Open Innovation Hackathon.",
    techTags: ["React", "Javascript", "Axios", "FastAPI", "Python", "OpenAI Whisper"],
    image: "/projects/echobrief.png",
    github: "https://github.com/barmanax/echobrief",
  },
  {
    title: "Samur.ai",
    description:
      "NLP-driven scheduling engine that parses course syllabi, extracts deadlines via the Gemini API, and auto-generates optimized study plans.",
    techTags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Gemini API", "Coolify"],
    image: "/projects/samurai.png",
    github: "https://github.com/barmanax/samur.ai",
  },
  {
    title: "Popcorn Vision",
    description:
      "Computer vision pipeline for perspective warping, contour segmentation, and morphological analysis of popcorn kernels to predict flake expansion.",
    techTags: ["Python", "OpenCV", "Matplotlib", "NumPy", "Pandas"],
    image: "/projects/popcorn.png",
    github: "https://github.com/barmanax/popcorn-vision",
  },
    {
    title: "Hypo",
    description:
      "Full-stack experiment tracker with OAuth-secured dashboards for logging, analyzing, and validating behavioral and lifestyle hypotheses.",
    techTags: ["Next.js", "Typescript", "Tailwind CSS", "PostgreSQL", "Prisma", "Google OAuth"],
    image: "/projects/hypo.png",
    github: "https://github.com/barmanax/hypo",
  },
  {
    title: "Autoply",
    description:
      "LLM-powered job application agent that scrapes listings, matches them to user profiles, and auto-drafts tailored submissions.",
    techTags: ["Next.js", "Typescript", "Tailwind CSS", "Supabase", "Keywords AI"],
    image: "/projects/autoply.png",
    github: "https://github.com/barmanax/autoply",
  },
  {
    title: "ClassCompass",
    description:
      "Full-stack course discovery platform for UIUC students with REST API-backed search, filtering, and bookmarking of 4,966 courses.",
    techTags: ["Django", "Django REST Framework", "Next.js", "React", "TypeScript", "TailwindCSS", "SQLite", "PostgreSQL", "Supabase"],
    image: "/projects/coursecompass.png",
    github: "https://github.com/CS222-UIUC/ClassCompass",
  },
];
