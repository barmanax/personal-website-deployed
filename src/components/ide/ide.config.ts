import { LucideIcon, FileCode2, FileText, FileJson2, Braces } from "lucide-react";

/**
 * A page presented as a "file" in the IDE metaphor.
 * Single source of truth consumed by FileTree, TabBar, StatusBar, and 404.
 */
export interface IDEFile {
  /** Route path, e.g. "/experience" */
  path: string;
  /** Display filename, e.g. "experience.md" */
  file: string;
  /** Language label shown in the status bar */
  language: string;
  /** File-type icon */
  icon: LucideIcon;
  /** Tailwind text-color class for the icon (syntax-token colors) */
  iconClass: string;
}

/** The four pages, presented as open files in the editor */
export const ideFiles: IDEFile[] = [
  { path: "/", file: "home.tsx", language: "TypeScript JSX", icon: FileCode2, iconClass: "text-syn-func" },
  { path: "/experience", file: "experience.md", language: "Markdown", icon: FileText, iconClass: "text-syn-string" },
  { path: "/projects", file: "projects.ts", language: "TypeScript", icon: Braces, iconClass: "text-ide-accent" },
  { path: "/connect", file: "connect.json", language: "JSON", icon: FileJson2, iconClass: "text-syn-number" },
];

/**
 * Notional text line height, in px, that the editor chrome is denominated in.
 *
 * Shared so the three things that count "lines" agree with each other: the
 * gutter renders one number per LINE_HEIGHT_PX of content, the minimap splits
 * blocks into that many stripes, and the status bar derives its "Ln" readout
 * from the same value. It matches Tailwind's `leading-6` on body copy.
 */
export const LINE_HEIGHT_PX = 24;

/** Look up the file entry for the current route (undefined on unknown routes) */
export function fileForPath(pathname: string): IDEFile | undefined {
  return ideFiles.find((f) => f.path === pathname);
}
