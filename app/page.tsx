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
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Sidebar - Persistent Left Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main View Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Header at Top */}
        <Header
          title={currentSection?.title || "Computer Graphics"}
          subtitle={currentSection?.description}
        />

        {/* Scrollable Dynamic Body Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950">
          {activeSection === "overview" && (
            <Overview onSelectSection={setActiveSection} />
          )}
          {activeSection === "theory" && <StudyNotes />}
          {activeSection === "lab" && <CodeSandbox />}
          {activeSection === "exam" && <ExamEngine />}
          {activeSection === "cheatsheet" && <CheatSheet />}

          {/* Footer */}
          <footer className="border-t border-slate-900 p-6 text-center text-xs text-slate-500">
            Computer Graphics Course Hub · Built for interactive revision ·
            Simulations approximate original BGI/graphics.h C++ programs — Made
            by Yishak
          </footer>
        </main>
      </div>
    </div>
  );
}
