"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavBadge {
  label: string;
  href: string;
  glassClass: string;
}

const navBadges: NavBadge[] = [
  { label: "Home", href: "#hero", glassClass: "ios-glass-blue" },
  { label: "About", href: "#team", glassClass: "ios-glass-red" },
  { label: "Events", href: "#events", glassClass: "ios-glass-yellow" },
  { label: "Team", href: "#team", glassClass: "ios-glass-green" },
  { label: "FAQs", href: "#faqs", glassClass: "ios-glass-purple" },
  { label: "Contact", href: "#contact", glassClass: "ios-glass-cyan" },
];

export default function Navbar({ onOpenRegister }: { onOpenRegister: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/60 dark:bg-[#0E0F12]/75 border-b border-black/10 dark:border-white/10 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: GDG Logo + Chapter Label */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-7 relative flex items-center justify-center transition-transform group-hover:scale-110">
            <Image
              src="/assets/gdg-logo.svg"
              alt="GDG Logo"
              width={40}
              height={22}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display-tech font-bold text-sm tracking-tight text-black dark:text-white leading-none">
              GDG RBU
            </span>
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
              Ramdeobaba University
            </span>
          </div>
        </Link>

        {/* Center: Multi-color iOS Glass pill badges */}
        <nav className="hidden md:flex items-center gap-2">
          {navBadges.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-4 py-1.5 text-xs font-bold rounded-full ios-glass-btn ${item.glassClass} transition-all`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl ios-glass-btn ios-glass-dark text-white cursor-pointer"
          >
            Register
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Dark / Light Mode Switch */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-xl ios-glass-btn text-black dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/85 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            {navBadges.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 text-center text-xs font-bold rounded-xl ios-glass-btn ${item.glassClass}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl ios-glass-btn ios-glass-dark text-white flex items-center justify-center gap-2"
          >
            Register for Event
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
