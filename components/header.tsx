"use client";

import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-black px-6">
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-white">{title}</span>
        {subtitle && (
          <>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400">{subtitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-900">
          <div className="h-full w-[5%] bg-cyan-500" />
        </div>
        <span className="text-xs text-zinc-400">5%</span>
      </div>
    </header>
  );
}
