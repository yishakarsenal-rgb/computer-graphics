"use client";

import { useMemo, useState } from "react";
import {
  TerminalSquare,
  MonitorPlay,
  FileCode2,
  Folder,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cppSnippets,
  cppCategories,
  type CppSnippet,
} from "@/lib/cpp-snippets";
import { GraphicsCanvas } from "@/components/graphics-canvas";
import { CodeEditor } from "@/components/code-editor";
import { CodeRunner } from "@/components/code-runner";

function Visualizer({ query }: { query: string }) {
  const [activeId, setActiveId] = useState("dda");
  const q = query.trim().toLowerCase();

  const grouped = useMemo(() => {
    return cppCategories
      .map((cat) => ({
        cat,
        files: cppSnippets.filter(
          (s) =>
            s.category === cat &&
            (!q ||
              s.name.toLowerCase().includes(q) ||
              s.description.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.files.length > 0);
  }, [q]);

  const active: CppSnippet =
    cppSnippets.find((s) => s.id === activeId) ?? cppSnippets[0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
      <div className="flex max-h-[640px] flex-col overflow-y-auto rounded-lg border border-border bg-card p-2 scrollbar-thin lg:sticky lg:top-20">
        <div className="flex items-center gap-2 px-2 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <Folder className="size-3.5" />
          course scripts
        </div>
        {grouped.map((g) => (
          <div key={g.cat} className="mb-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground">
              {g.cat}
            </div>
            {g.files.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  activeId === f.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-foreground/70 hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <FileCode2
                  className={cn(
                    "size-3.5 shrink-0",
                    activeId === f.id ? "text-cyan" : "text-muted-foreground",
                  )}
                />
                <span className="truncate font-mono text-xs">{f.name}</span>
                {f.interactive && (
                  <Zap className="ml-auto size-3 shrink-0 text-cyan" />
                )}
              </button>
            ))}
          </div>
        ))}
        {grouped.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            No files match.
          </p>
        )}
      </div>

      {/* Detail */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-mono text-sm font-semibold">{active.name}</h3>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
              {active.category}
            </span>
            {active.interactive && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                interactive
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {active.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-muted/40 px-3 py-2 font-mono text-[11px] text-muted-foreground">
              <FileCode2 className="size-3.5" />
              source
            </div>
            <div className="h-[380px] overflow-hidden rounded-b-lg border border-border">
              <CodeEditor value={active.code} readOnly height="100%" />
            </div>
          </div>
          <div>
            <GraphicsCanvas sim={active.sim} name={active.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CodeSandbox({ query }: { query: string }) {
  const [tab, setTab] = useState<"visualizer" | "runner">("visualizer");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan">
          <TerminalSquare className="size-3.5" />
          LAB and CUSTOM CODE
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-balance md:text-3xl">
          Code and Execution Sandbox
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore the pre-built BGI graphics scripts with a live canvas
          simulation, or write and run your own C++ directly in the browser.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex w-full max-w-md items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
        <button
          onClick={() => setTab("visualizer")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "visualizer"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <MonitorPlay className="size-4" />
          Graphics Visualizer
        </button>
        <button
          onClick={() => setTab("runner")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "runner"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <TerminalSquare className="size-4" />
          C++ Editor and Runner
        </button>
      </div>

      {tab === "visualizer" ? <Visualizer query={query} /> : <CodeRunner />}
    </div>
  );
}
