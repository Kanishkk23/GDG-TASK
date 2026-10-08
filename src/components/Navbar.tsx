"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavBadge {
  label: string;
  href: string;
  bgClass: string;
  textClass: string;
  hoverClass: string;
}

const navBadges: NavBadge[] = [
  { label: "Home", href: "#hero", bgClass: "bg-[#4285F4]", textClass: "text-white", hoverClass: "hover:bg-blue-600" },
  { label: "About", href: "#team", bgClass: "bg-[#EA4335]", textClass: "text-white", hoverClass: "hover:bg-red-600" },
  { label: "Events", href: "#events", bgClass: "bg-[#FBBC04]", textClass: "text-black", hoverClass: "hover:bg-amber-400" },
  { label: "Team", href: "#team", bgClass: "bg-[#34A853]", textClass: "text-white", hoverClass: "hover:bg-green-600" },
  { label: "FAQs", href: "#faqs", bgClass: "bg-[#6750A4]", textClass: "text-white", hoverClass: "hover:bg-purple-700" },
  { label: "Contact", href: "#contact", bgClass: "bg-[#38BDF8]", textClass: "text-black", hoverClass: "hover:bg-sky-400" },
];

export default function Navbar({ onOpenRegister }: { onOpenRegister: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F8F9FA]/90 dark:bg-[#0E0F12]/90 border-b-2 border-black dark:border-zinc-700 transition-colors">
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

        {/* Center: Multi-color pill badges (Exact replica of Figma design) */}
        <nav className="hidden md:flex items-center gap-2">
          {navBadges.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3.5 py-1 text-xs font-bold rounded-full border-2 border-black shadow-[2px_2px_0px_#000] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${item.bgClass} ${item.textClass} ${item.hoverClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_#4285F4] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
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
            className="md:hidden p-2 border-2 border-black dark:border-zinc-400 bg-white dark:bg-zinc-800 rounded-lg shadow-[2px_2px_0px_#000] text-black dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navBadges.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-center text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] ${item.bgClass} ${item.textClass}`}
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
            className="w-full py-2.5 text-xs font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border-2 border-black rounded-lg shadow-[3px_3px_0px_#4285F4]"
          >
            Register for Event
          </button>
        </div>
      )}
    </header>
  );
}
