"use client";

import { useMemo, useState } from "react";
import { ChevronDown, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { chapters, type NoteBlock } from "@/lib/notes-data";
import { Math } from "@/components/math";

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-sm leading-relaxed text-foreground/90">
          {block.text}
        </p>
      );
    case "h":
      return (
        <h4 className="mt-2 text-sm font-semibold tracking-tight text-foreground">
          {block.text}
        </h4>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <div className="my-1 overflow-x-auto rounded-lg border border-border bg-muted/40 px-4 py-3 scrollbar-thin">
          <Math latex={block.latex} />
          {block.caption && (
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "callout":
      return (
        <div className="rounded-lg border-l-2 border-cyan bg-accent/40 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan">
            {block.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
            {block.text}
          </p>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-border scrollbar-thin">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-muted/60">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-border px-3 py-2 font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-muted/20">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "border-b border-border px-3 py-2 align-top text-foreground/90",
                        ci === 0 && "font-medium text-foreground",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function StudyNotes({ query }: { query: string }) {
  const [openTopic, setOpenTopic] = useState<string | null>("ch1-apps");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return chapters;
    return chapters
      .map((ch) => ({
        ...ch,
        topics: ch.topics.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.summary.toLowerCase().includes(q) ||
            ch.title.toLowerCase().includes(q),
        ),
      }))
      .filter((ch) => ch.topics.length > 0);
  }, [q]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan">
          <BookOpen className="size-3.5" />
          THEORY
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-balance md:text-3xl">
          Detailed Study Notes
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The full Computer Graphics lecture material organised into expandable
          chapter units with derivations, comparison tables and rendered
          formulas.
        </p>
      </div>

      {filtered.length === 0 && (
        <p className="rounded-lg border border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
          No topics match “{query}”.
        </p>
      )}

      {filtered.map((ch) => (
        <section key={ch.id} className="flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-border">
              {ch.number}
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {ch.title}
              </h2>
              <p className="text-xs text-muted-foreground">{ch.tagline}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {ch.topics.map((t) => {
              const isOpen = openTopic === t.id;
              return (
                <div
                  key={t.id}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <button
                    onClick={() => setOpenTopic(isOpen ? null : t.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
                    aria-expanded={isOpen}
                  >
                    <Layers className="size-4 shrink-0 text-cyan" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-medium">{t.title}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {t.summary}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "ml-auto size-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="flex flex-col gap-4 border-t border-border px-4 py-4 md:px-5">
                      {t.blocks.map((b, i) => (
                        <Block key={i} block={b} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
