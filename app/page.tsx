"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { type SectionId } from "@/lib/sections"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Overview } from "@/components/sections/overview"
import { StudyNotes } from "@/components/sections/study-notes"
import { CodeSandbox } from "@/components/sections/code-sandbox"
import { ExamEngine } from "@/components/sections/exam-engine"
import { CheatSheet } from "@/components/sections/cheat-sheet"

const PROGRESS: Record<SectionId, number> = {
  overview: 5,
  notes: 30,
  sandbox: 60,
  exam: 85,
  cheatsheet: 100,
}

export default function Page() {
  const [active, setActive] = useState<SectionId>("overview")
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const select = (id: SectionId) => {
    setActive(id)
    setQuery("")
  }

  return (
    <div className="min-h-svh bg-background">
      <Sidebar
        active={active}
        onSelect={select}
        collapsed={collapsed}
        onCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className={cn("transition-[padding] duration-300", collapsed ? "lg:pl-16" : "lg:pl-64")}>
        <Header
          active={active}
          query={query}
          onQuery={setQuery}
          onToggleSidebar={() => setMobileOpen(true)}
          progress={PROGRESS[active]}
        />

        <main className="px-4 py-8 md:px-8 md:py-10">
          {active === "overview" && <Overview onNavigate={select} />}
          {active === "notes" && <StudyNotes query={query} />}
          {active === "sandbox" && <CodeSandbox query={query} />}
          {active === "exam" && <ExamEngine />}
          {active === "cheatsheet" && <CheatSheet />}

          <footer className="mx-auto mt-16 max-w-5xl border-t border-border pt-6">
            <p className="text-center font-mono text-[11px] text-muted-foreground">
              Computer Graphics Course Hub · Built for interactive revision · Simulations approximate the
              original BGI/graphics.h C++ programs
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
