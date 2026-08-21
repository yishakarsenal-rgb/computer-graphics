import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  BookOpen,
  TerminalSquare,
  ClipboardCheck,
  FunctionSquare,
} from 'lucide-react'

export type SectionId = 'overview' | 'notes' | 'sandbox' | 'exam' | 'cheatsheet'

export type SectionMeta = {
  id: SectionId
  label: string
  short: string
  icon: LucideIcon
  desc: string
}

export const sections: SectionMeta[] = [
  {
    id: 'overview',
    label: 'Overview',
    short: 'Dashboard',
    icon: LayoutDashboard,
    desc: 'Course dashboard & progress',
  },
  {
    id: 'notes',
    label: 'Detailed Study Notes',
    short: 'Theory',
    icon: BookOpen,
    desc: 'Chapter-by-chapter theory',
  },
  {
    id: 'sandbox',
    label: 'Code & Execution Sandbox',
    short: 'Lab',
    icon: TerminalSquare,
    desc: 'Visualizer + live C++ runner',
  },
  {
    id: 'exam',
    label: 'Timed Mock Examination',
    short: 'Exam',
    icon: ClipboardCheck,
    desc: '100-question timed test engine',
  },
  {
    id: 'cheatsheet',
    label: 'Formula & Algorithm Cheat Sheet',
    short: 'Cheat Sheet',
    icon: FunctionSquare,
    desc: 'Visual formula reference',
  },
]
