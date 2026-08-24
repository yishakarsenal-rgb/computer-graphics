"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTIONS, SectionId } from "@/lib/sections";

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-200 bg-white text-black transition-all duration-300 dark:border-zinc-800 dark:bg-black dark:text-white",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* App Header / Logo Text */}
      <div className="flex h-16 items-center border-b border-slate-200 px-4 dark:border-zinc-800">
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-cyan-600 font-bold text-white text-xs">
              CG
            </span>
            <span className="font-semibold text-black text-lg tracking-wide dark:text-white">
              Course Hub
            </span>
          </div>
        ) : (
          <span className="mx-auto flex h-8 w-8 items-center justify-center rounded bg-cyan-600 font-bold text-white text-xs">
            CG
          </span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                isActive
                  ? "border-cyan-500 border-l-2 bg-slate-100 text-cyan-600 dark:bg-zinc-900 dark:text-cyan-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? section.title : undefined}
            >
              {!collapsed ? (
                <div>
                  <div className="font-medium leading-none">
                    {section.title}
                  </div>
                  <div className="mt-1 text-slate-500 text-xs line-clamp-1 dark:text-zinc-500">
                    {section.description}
                  </div>
                </div>
              ) : (
                <span className="font-bold text-xs uppercase">
                  {section.title.slice(0, 2)}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Collapse Toggle */}
      <div className="border-t border-slate-200 p-2 dark:border-zinc-800">
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-start rounded-lg px-3 py-2 font-medium text-slate-600 text-sm hover:bg-slate-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
          ) : (
            <div className="flex items-center space-x-3">
              <ChevronLeft className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
