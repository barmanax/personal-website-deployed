/**
 * Central content file — edit this to update all site content.
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

/** Tech stack items — each with a display name and category for filtering */
export const techStack = [
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "Java", category: "language" },
  { name: "C++", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "AWS", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Linux", category: "tools" },
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
    type: "education",
    title: "B.S. Computer Science + Statistics",
    organization: "University of Illinois at Urbana-Champaign",
    startDate: "Aug 2022",
    endDate: "May 2026",
    bullets: [
      "Relevant coursework: Data Structures, Algorithms, Systems Programming, Machine Learning, Statistical Modeling",
    ],
  },
  {
    type: "work",
    title: "Software Engineering Intern",
    organization: "Company Name",
    startDate: "May 2025",
    endDate: "Aug 2025",
    bullets: [
      "Built and shipped features impacting thousands of users",
      "Collaborated with cross-functional teams on product development",
    ],
  },
  {
    type: "work",
    title: "Teaching Assistant",
    organization: "UIUC CS Department",
    startDate: "Jan 2024",
    endDate: "Present",
    bullets: [
      "Led weekly discussion sections and office hours for 200+ students",
      "Developed course materials and grading infrastructure",
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
    title: "Project Alpha",
    description:
      "A full-stack web application that solves a real-world problem with an intuitive interface and robust backend.",
    techTags: ["React", "Node.js", "PostgreSQL", "Docker"],
    image: "/projects/placeholder.svg",
    github: "https://github.com/yourusername/project-alpha",
  },
  {
    title: "Data Insights Dashboard",
    description:
      "Interactive data visualization dashboard built with Python and React for exploring complex datasets.",
    techTags: ["Python", "React", "D3.js", "Flask"],
    image: "/projects/placeholder.svg",
    github: "https://github.com/yourusername/data-dashboard",
  },
  {
    title: "ML Pipeline",
    description:
      "End-to-end machine learning pipeline for training, evaluating, and deploying models at scale.",
    techTags: ["Python", "TensorFlow", "Docker", "AWS"],
    image: "/projects/placeholder.svg",
    github: "https://github.com/yourusername/ml-pipeline",
  },
  {
    title: "CLI Toolkit",
    description:
      "A collection of developer productivity tools packaged as a fast, ergonomic command-line interface.",
    techTags: ["TypeScript", "Node.js", "CLI"],
    image: "/projects/placeholder.svg",
    github: "https://github.com/yourusername/cli-toolkit",
  },
];
