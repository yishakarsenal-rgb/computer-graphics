export type SectionId = "overview" | "theory" | "lab" | "exam" | "cheatsheet";

export interface Section {
  id: SectionId;
  title: string;
  description: string;
}

export const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Dashboard",
    description: "Course dashboard & progress",
  },
  {
    id: "theory",
    title: "Theory",
    description: "Chapter-by-chapter theory",
  },
  {
    id: "lab",
    title: "Lab",
    description: "Visualizer + live C++ runner",
  },
  {
    id: "exam",
    title: "Exam",
    description: "100-question timed test engine",
  },
  {
    id: "cheatsheet",
    title: "Cheat Sheet",
    description: "Visual formula reference",
  },
];
