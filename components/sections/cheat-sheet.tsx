"use client"

import { useMemo, useState } from "react"
import { cheatSheet } from "@/lib/cheatsheet-data"
import { Math } from "@/components/math"
import { cn } from "@/lib/utils"

export function CheatSheet() {
  const categories = useMemo(() => {
    const set = new Set(cheatSheet.map((c) => c.category))
    return ["All", ...Array.from(set)]
  }, [])
  const [active, setActive] = useState("All")

  const cards = useMemo(
    () => (active === "All" ? cheatSheet : cheatSheet.filter((c) => c.category === active)),
    [active],
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Quick Reference</p>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
          Formula &amp; Algorithm Cheat Sheet
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Every decision parameter, transformation matrix, and step sequence you need, rendered in clean
          mathematical notation. Ideal for last-minute revision.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
              active === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col rounded-lg border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <span className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {card.category}
              </span>
            </div>

            <div className="space-y-3">
              {card.formulas.map((f, i) => (
                <div key={i}>
                  {f.label && (
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-accent">{f.label}</p>
                  )}
                  <div className="overflow-x-auto rounded-md border border-border bg-background px-4 py-3">
                    <Math latex={f.latex} />
                  </div>
                </div>
              ))}
            </div>

            {card.steps && (
              <ol className="mt-4 space-y-1.5">
                {card.steps.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono text-xs text-accent">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            )}

            {card.note && (
              <p className="mt-4 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                {card.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
