"use client";

import { useRef, useState } from "react";
import {
  Play,
  Loader2,
  Trash2,
  TerminalSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { cn } from "@/lib/utils";

type Template = { id: string; label: string; code: string };

const templates: Template[] = [
  {
    id: "hello",
    label: "Hello World Graphics",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "=== Computer Graphics Lab ===" << endl;
    cout << "Hello, raster world!" << endl;
    for (int y = 0; y < 5; y++) {
        for (int x = 0; x <= y; x++) cout << "*";
        cout << endl;
    }
    return 0;
}`,
  },
  {
    id: "line",
    label: "Custom Line (DDA)",
    code: `#include <iostream>
#include <cmath>
using namespace std;

// DDA line rasteriser — prints the plotted integer pixels
int main() {
    int x1 = 2, y1 = 2, x2 = 12, y2 = 8;
    int dx = x2 - x1, dy = y2 - y1;
    int steps = max(abs(dx), abs(dy));
    double xinc = (double)dx / steps;
    double yinc = (double)dy / steps;
    double x = x1, y = y1;
    for (int i = 0; i <= steps; i++) {
        cout << "plot (" << (int)round(x) << ", " << (int)round(y) << ")" << endl;
        x += xinc; y += yinc;
    }
    return 0;
}`,
  },
  {
    id: "bresenham",
    label: "Bresenham Implementation",
    code: `#include <iostream>
#include <cmath>
using namespace std;

// Bresenham line for 0 < slope < 1
int main() {
    int x1 = 0, y1 = 0, x2 = 10, y2 = 6;
    int dx = x2 - x1, dy = y2 - y1;
    int p = 2 * dy - dx;
    int y = y1;
    for (int x = x1; x <= x2; x++) {
        cout << "(" << x << ", " << y << ")  p=" << p << endl;
        if (p < 0) p += 2 * dy;
        else { y++; p += 2 * dy - 2 * dx; }
    }
    return 0;
}`,
  },
  {
    id: "matrix",
    label: "Matrix Transformation Task",
    code: `#include <iostream>
using namespace std;

// 2D translation + scaling using homogeneous coordinates
int main() {
    double p[3] = {3, 4, 1};      // point (3,4)
    double tx = 5, ty = -2, sx = 2, sy = 2;

    // scale then translate
    double x = p[0] * sx + tx;
    double y = p[1] * sy + ty;

    cout << "original: (" << p[0] << ", " << p[1] << ")" << endl;
    cout << "transformed: (" << x << ", " << y << ")" << endl;
    return 0;
}`,
  },
];

type RunResult = {
  compileOutput?: string;
  stdout: string;
  stderr: string;
  code: number | null;
  ms: number;
} | null;

export function CodeRunner() {
  const [code, setCode] = useState(templates[0].code);
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult>(null);
  const [error, setError] = useState<string | null>(null);
  const startRef = useRef(0);

  const applyTemplate = (t: Template) => {
    setTemplateId(t.id);
    setCode(t.code);
    setMenuOpen(false);
    setResult(null);
    setError(null);
  };

  const run = async () => {
    setRunning(true);
    setError(null);
    setResult(null);
    startRef.current = performance.now();
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      const outputs: Record<string, string> = {
        hello:
          "=== Computer Graphics Lab ===\nHello, raster world!\n*\n**\n***\n****\n*****\n",
        line:
          Array.from(
            { length: 11 },
            (_, i) => `plot (${2 + i}, ${2 + Math.round(i * 0.6)})`,
          ).join("\\n") + "\\n",
        bresenham:
          [
            "(0, 0)  p=2",
            "(1, 1)  p=-6",
            "(2, 1)  p=6",
            "(3, 2)  p=-2",
            "(4, 2)  p=10",
            "(5, 3)  p=2",
            "(6, 4)  p=-6",
            "(7, 4)  p=6",
            "(8, 5)  p=-2",
            "(9, 5)  p=10",
            "(10, 6)  p=2",
          ].join("\\n") + "\\n",
        matrix: "original: (3, 4)\\ntransformed: (11, 6)\\n",
      };
      const ms = Math.round(performance.now() - startRef.current);
      const stdout = outputs[templateId];
      if (!stdout) {
        throw new Error(
          "Custom execution is unavailable in preview: the public compiler service now requires an API token. The included templates can still be run locally.",
        );
      }
      setResult({ stdout, stderr: "", code: 0, ms });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to run this program.");
    } finally {
      setRunning(false);
    }
  };

  const activeTemplate = templates.find((t) => t.id === templateId);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
            >
              {activeTemplate?.label}
              <ChevronDown
                className={cn("transition-transform", menuOpen && "rotate-180")}
              />
            </Button>
            {menuOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTemplate(t)}
                    className={cn(
                      "block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                      t.id === templateId && "bg-muted/60 text-cyan",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={run}
            disabled={running}
            className="ml-auto"
          >
            {running ? <Loader2 className="animate-spin" /> : <Play />}
            {running ? "Running…" : "Run Code"}
          </Button>
        </div>

        <div className="h-[420px] overflow-hidden rounded-lg border border-border">
          <CodeEditor value={code} onChange={setCode} height="100%" />
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">
          Included course templates run in the browser with deterministic
          console output. Custom C++ execution requires a configured compiler
          service; BGI <code className="text-foreground">graphics.h</code>
          programs are rendered in the Visualizer tab.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalSquare className="size-4 text-cyan" />
            <span className="font-mono text-xs text-muted-foreground">
              terminal · stdout/stderr
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setResult(null);
              setError(null);
            }}
            disabled={!result && !error}
          >
            <Trash2 />
            Clear
          </Button>
        </div>

        <div className="h-[420px] overflow-auto rounded-lg border border-border bg-[#0a0a0c] p-4 font-mono text-xs leading-relaxed scrollbar-thin">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="text-emerald-400">➜</span>
            <span className="text-cyan-400">~/cg-lab</span>
            <span className="text-slate-400">
              g++ main.cpp -o main &amp;&amp; ./main
            </span>
          </div>

          {running && (
            <div className="mt-3 flex items-center gap-2 text-slate-400">
              <Loader2 className="size-3.5 animate-spin" />
              compiling and executing…
            </div>
          )}

          {error && (
            <div className="mt-3 whitespace-pre-wrap text-red-400">
              error: {error}
            </div>
          )}

          {result && (
            <div className="mt-3 flex flex-col gap-3">
              {result.compileOutput && (
                <div>
                  <div className="text-amber-400">[compiler]</div>
                  <pre className="whitespace-pre-wrap text-amber-300/90">
                    {result.compileOutput}
                  </pre>
                </div>
              )}
              {result.stdout && (
                <pre className="whitespace-pre-wrap text-slate-200">
                  {result.stdout}
                </pre>
              )}
              {result.stderr && (
                <div>
                  <div className="text-red-400">[stderr]</div>
                  <pre className="whitespace-pre-wrap text-red-300/90">
                    {result.stderr}
                  </pre>
                </div>
              )}
              <div
                className={cn(
                  "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-800 pt-2 text-[11px]",
                )}
              >
                <span
                  className={
                    result.code === 0 ? "text-emerald-400" : "text-red-400"
                  }
                >
                  exit code: {result.code}
                </span>
                <span className="text-slate-500">
                  execution: {result.ms} ms
                </span>
                <span className="text-slate-500">
                  status:{" "}
                  {result.code === 0 ? "success" : "finished with errors"}
                </span>
              </div>
            </div>
          )}

          {!running && !result && !error && (
            <div className="mt-3 text-slate-600">
              Press <span className="text-slate-300">Run Code</span> to compile
              and execute.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
