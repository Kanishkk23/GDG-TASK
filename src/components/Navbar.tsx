"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, User, Shield, LogOut, Ticket } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "./AuthContext";

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

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAuth: () => void;
  onOpenMyRegistrations: () => void;
  onOpenAdminModal: () => void;
}

export default function Navbar({
  onOpenRegister,
  onOpenAuth,
  onOpenMyRegistrations,
  onOpenAdminModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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
        <nav className="hidden lg:flex items-center gap-2">
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

        {/* Right: Actions & User Authentication */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              {/* If Admin: show Admin Portal Button */}
              {user.role === "admin" && (
                <button
                  onClick={onOpenAdminModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl ios-glass-btn ios-glass-yellow text-black cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              )}

              {/* If Student: show My Passes button */}
              {user.role !== "admin" && (
                <button
                  onClick={onOpenMyRegistrations}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl ios-glass-btn ios-glass-green text-white cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5 text-yellow-300" />
                  <span>My Passes</span>
                </button>
              )}

              {/* User badge */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl ios-glass-btn text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-bold text-black dark:text-white truncate max-w-[100px]">{user.name.split(" ")[0]}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 uppercase font-bold text-zinc-500">
                  {user.role}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-xl ios-glass-btn text-zinc-700 dark:text-zinc-300 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl ios-glass-btn ios-glass-blue text-white cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Direct RSVP trigger */}
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl ios-glass-btn ios-glass-dark text-white cursor-pointer"
          >
            RSVP
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl ios-glass-btn text-black dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 dark:border-white/10 backdrop-blur-2xl bg-white/85 dark:bg-zinc-900/90 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navBadges.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-center text-xs font-bold rounded-xl ios-glass-btn ${item.glassClass}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center justify-between font-mono text-xs px-1">
                  <span>Logged in: <strong>{user.name}</strong> ({user.role})</span>
                  <button onClick={logout} className="text-red-500 font-bold underline">Logout</button>
                </div>
                {user.role === "admin" && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAdminModal(); }}
                    className="w-full py-2.5 text-xs font-bold rounded-xl ios-glass-btn ios-glass-yellow text-black"
                  >
                    Admin Console
                  </button>
                )}
                {user.role !== "admin" && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenMyRegistrations(); }}
                    className="w-full py-2.5 text-xs font-bold rounded-xl ios-glass-btn ios-glass-green text-white"
                  >
                    My Event Passes
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 text-xs font-bold rounded-xl ios-glass-btn ios-glass-blue text-white flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4" /> Sign In / Register
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
              className="w-full py-2.5 text-xs font-bold uppercase rounded-xl ios-glass-btn ios-glass-dark text-white"
            >
              Register for Event Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
