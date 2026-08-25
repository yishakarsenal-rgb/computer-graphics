"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SectionId, SECTIONS } from "@/lib/sections";
import { Overview } from "@/components/sections/overview";
import { StudyNotes } from "@/components/sections/study-notes";
import { CodeSandbox } from "@/components/sections/code-sandbox";
import { ExamEngine } from "@/components/sections/exam-engine";
import { CheatSheet } from "@/components/sections/cheat-sheet";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [collapsed, setCollapsed] = useState(false);

  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={currentSection?.title || "Computer Graphics"}
          subtitle={currentSection?.description}
        />

        <main className="flex-1 overflow-y-auto bg-white p-6 dark:bg-black">
          {activeSection === "overview" && (
            <Overview onSelectSection={setActiveSection} />
          )}
          {activeSection === "theory" && <StudyNotes />}
          {activeSection === "lab" && <CodeSandbox />}
          {activeSection === "exam" && <ExamEngine />}
          {activeSection === "cheatsheet" && <CheatSheet />}

          <footer className="mt-8 border-t border-slate-200 pt-6 text-center text-slate-500 text-xs dark:border-zinc-800 dark:text-zinc-500">
            Computer Graphics Course Hub · Built for interactive revision · Made
            by Yishak
          </footer>
        </main>
      </div>
    </div>
  );
}
