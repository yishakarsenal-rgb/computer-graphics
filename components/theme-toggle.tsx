"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkActive = savedTheme ? savedTheme === "dark" : true;
    setIsDark(darkActive);
    if (darkActive) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-slate-300 bg-white font-semibold text-black text-xs hover:bg-slate-100 dark:border-zinc-800 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
