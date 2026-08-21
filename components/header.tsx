'use client'

import { Menu, Search, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { sections, type SectionId } from '@/lib/sections'

export function Header({
  active,
  query,
  onQuery,
  onToggleSidebar,
  progress,
}: {
  active: SectionId
  query: string
  onQuery: (v: string) => void
  onToggleSidebar: () => void
  progress: number
}) {
  const current = sections.find((s) => s.id === active)
  const searchable = active === 'notes' || active === 'sandbox' || active === 'cheatsheet'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md md:px-5">
      <Button
        size="icon-sm"
        variant="ghost"
        className="lg:hidden"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
      >
        <Menu />
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Cpu className="size-4" />
        </div>
        <div className="hidden flex-col leading-none sm:flex">
          <span className="text-sm font-semibold tracking-tight">Computer Graphics</span>
          <span className="font-mono text-[10px] text-muted-foreground">COSC 362 · Lab Hub</span>
        </div>
      </div>

      <div className="mx-2 hidden h-6 w-px bg-border md:block" />
      <span className="hidden font-mono text-xs text-muted-foreground md:inline">
        {current?.label}
      </span>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        {searchable && (
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search content"
              className="h-8 w-44 rounded-md border border-border bg-muted/40 pl-8 pr-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background lg:w-56"
            />
          </div>
        )}

        <div className="hidden items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 sm:flex">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-cyan transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">{progress}%</span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}
