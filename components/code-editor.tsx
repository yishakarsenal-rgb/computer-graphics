"use client";

import Editor, { type OnMount } from "@monaco-editor/react";

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-[#0d0d10] p-4 font-mono text-[12.5px] leading-relaxed text-slate-200 dark:bg-[#0d0d10]">
      <code>{code}</code>
    </pre>
  );
}

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "100%",
}: {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  height?: string | number;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleMount: OnMount = (_editor, monaco) => {
    monaco.editor.defineTheme("cg-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0d0d10",
        "editorGutter.background": "#0d0d10",
        "editorLineNumber.foreground": "#3a3a44",
        "editorLineNumber.activeForeground": "#22d3ee",
      },
    });
    monaco.editor.defineTheme("cg-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff",
        "editorLineNumber.foreground": "#cbd5e1",
        "editorLineNumber.activeForeground": "#0891b2",
      },
    });
    monaco.editor.setTheme(resolvedTheme === "light" ? "cg-light" : "cg-dark");
  };

  if (!mounted) {
    return (
      <div
        className="flex items-center justify-center bg-card font-mono text-xs text-muted-foreground"
        style={{ height }}
      >
        <Loader2 className="mr-2 size-4 animate-spin" />
        loading editor…
      </div>
    );
  }

  return (
    <Editor
      height={height}
      defaultLanguage="cpp"
      value={value}
      onChange={(v) => onChange?.(v ?? "")}
      onMount={handleMount}
      theme={resolvedTheme === "light" ? "cg-light" : "cg-dark"}
      options={{
        readOnly,
        fontSize: 13,
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        folding: true,
        tabSize: 4,
        automaticLayout: true,
        renderLineHighlight: readOnly ? "none" : "line",
        padding: { top: 14, bottom: 14 },
        smoothScrolling: true,
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
      }}
    />
  );
}
