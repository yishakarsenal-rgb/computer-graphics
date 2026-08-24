"use client";

import React from "react";
import { SectionId } from "@/lib/sections";

interface OverviewProps {
  onSelectSection: (id: SectionId) => void;
}

export function Overview({ onSelectSection }: OverviewProps) {
  return (
    <div className="space-y-8 p-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-8">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold text-white">Computer Graphics</h1>
          <p className="text-sm text-slate-400">
            An in-browser C++ compiler, timed mock exams, and a rendered formula
            reference.
          </p>
          <button
            onClick={() => onSelectSection("lab")}
            className="inline-flex items-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
          >
            Open the Code Lab
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="text-3xl font-bold text-white">4</div>
          <div className="mt-1 text-sm text-slate-400">Theory chapters</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="text-3xl font-bold text-white">12</div>
          <div className="mt-1 text-sm text-slate-400">C++ programs</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="text-3xl font-bold text-white">67</div>
          <div className="mt-1 text-sm text-slate-400">Exam questions</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="text-3xl font-bold text-white">10</div>
          <div className="mt-1 text-sm text-slate-400">Formula cards</div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={() => onSelectSection("theory")}
          className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left transition-colors hover:border-slate-700 hover:bg-slate-900"
        >
          <div className="text-base font-semibold text-white">
            Detailed Study Notes
          </div>
          <div className="mt-1 text-sm text-slate-400">
            Chapter-by-chapter theory
          </div>
        </button>

        <button
          onClick={() => onSelectSection("lab")}
          className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left transition-colors hover:border-slate-700 hover:bg-slate-900"
        >
          <div className="text-base font-semibold text-white">
            Code & Execution Sandbox
          </div>
          <div className="mt-1 text-sm text-slate-400">
            Visualizer + live C++ runner
          </div>
        </button>

        <button
          onClick={() => onSelectSection("exam")}
          className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left transition-colors hover:border-slate-700 hover:bg-slate-900"
        >
          <div className="text-base font-semibold text-white">
            Timed Mock Examination
          </div>
          <div className="mt-1 text-sm text-slate-400">
            100-question timed test engine
          </div>
        </button>

        <button
          onClick={() => onSelectSection("cheatsheet")}
          className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left transition-colors hover:border-slate-700 hover:bg-slate-900"
        >
          <div className="text-base font-semibold text-white">
            Formula & Algorithm Cheat Sheet
          </div>
          <div className="mt-1 text-sm text-slate-400">
            Visual formula reference
          </div>
        </button>
      </div>
    </div>
  );
}
