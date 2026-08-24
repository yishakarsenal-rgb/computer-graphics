"use client";

import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
        "relative flex flex-col border-r border-slate-800 bg-slate-950 text-slate-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* App Header / Logo Text */}
      <div className="flex h-16 items-center border-b border-slate-800 px-4">
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-cyan-600 font-bold text-white text-xs">
              CG
            </span>
            <span className="font-semibold text-lg text-white tracking-wide">
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
                  ? "bg-slate-800/80 text-cyan-400 border-l-2 border-cyan-400"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? section.title : undefined}
            >
              {!collapsed ? (
                <div>
                  <div className="font-medium leading-none">
                    {section.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 line-clamp-1">
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

      {/* Sidebar Collapse Toggle (Only Icon Maintained) */}
      <div className="border-t border-slate-800 p-2">
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5 text-slate-400" />
          ) : (
            <div className="flex items-center space-x-3">
              <PanelLeftClose className="h-5 w-5 text-slate-400" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
