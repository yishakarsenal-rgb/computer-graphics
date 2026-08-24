"use client";

import { PanelLeftClose, PanelLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sections, type SectionId } from "@/lib/sections";

export function Sidebar({
  active,
  onSelect,
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileClose,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  collapsed: boolean;
  onCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  return (
    <>
      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-[width,transform] duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">Course Hub</span>
            </div>
          )}
          <Button
            size="icon-sm"
            variant="ghost"
            className="ml-auto lg:hidden"
            onClick={onMobileClose}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2 scrollbar-thin">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelect(s.id);
                  onMobileClose();
                }}
                title={collapsed ? s.label : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-muted/60 hover:text-sidebar-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive
                      ? "text-cyan"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                {!collapsed && (
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-medium">{s.short}</span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {s.desc}
                    </span>
                  </span>
                )}
                {isActive && !collapsed && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onCollapse}
            className="hidden w-full justify-start lg:flex"
          >
            {collapsed ? <PanelLeft /> : <PanelLeftClose />}
            {!collapsed && <span>Collapse</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
