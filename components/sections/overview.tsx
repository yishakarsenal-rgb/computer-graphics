"use client"

import { sections, type SectionId } from "@/lib/sections"
import { cppSnippets } from "@/lib/cpp-snippets"
import { TOTAL_POOL } from "@/lib/exam-questions"
import { chapters } from "@/lib/notes-data"
import { cheatSheet } from "@/lib/cheatsheet-data"
import { ArrowRight } from "lucide-react"

export function Overview({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  const stats = [
    { label: "Theory chapters", value: chapters.length },
    { label: "C++ programs", value: cppSnippets.length },
    { label: "Exam questions", value: TOTAL_POOL },
    { label: "Formula cards", value: cheatSheet.length },
  ]

  const cards = sections.filter((s) => s.id !== "overview")

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">CG-101 · Interactive Companion</p>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Master Computer Graphics, from raster algorithms to live C++.
          </h1>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            A single workspace that turns your course material into runnable simulations, an in-browser C++
            compiler, timed mock exams, and a rendered formula reference.
          </p>
          <button
            onClick={() => onNavigate("sandbox")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Open the Code Lab
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5">
            <p className="font-mono text-3xl font-bold tabular-nums text-foreground">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-accent/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent transition-colors group-hover:border-accent/50">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  {s.label}
                  <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{s.desc}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
