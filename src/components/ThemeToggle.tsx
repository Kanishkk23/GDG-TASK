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
      <div className="w-9 h-9 rounded-sm border-2 border-black bg-amber-300"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Mode"
      className="w-9 h-9 rounded-sm btn-minimal btn-yellow flex items-center justify-center cursor-pointer transition-transform"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-black" />
      ) : (
        <Moon className="w-4 h-4 text-black" />
      )}
    </button>
  );
}
