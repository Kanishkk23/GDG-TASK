"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
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

  if (!mounted) {
    return (
      <div className="w-10 h-10 border-2 border-black rounded-lg bg-yellow-400"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Mode"
      className="p-2 border-2 border-black bg-amber-300 hover:bg-amber-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-400 rounded-lg shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center text-black dark:text-yellow-400"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-900" />
      )}
    </button>
  );
}
