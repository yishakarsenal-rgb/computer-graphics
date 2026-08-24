"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur">
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-white">{title}</span>
        {subtitle && (
          <>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-400">{subtitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[5%] bg-cyan-500" />
          </div>
          <span className="text-xs text-slate-400">5%</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
