"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-black dark:border-zinc-800 dark:bg-black dark:text-white">
        Dark Mode
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-100 dark:border-zinc-800 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
