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
  colorClass: string;
}

const navBadges: NavBadge[] = [
  { label: "Home", href: "#hero", colorClass: "btn-blue" },
  { label: "About", href: "#team", colorClass: "btn-red" },
  { label: "Events", href: "#events", colorClass: "btn-yellow" },
  { label: "Team", href: "#team", colorClass: "btn-green" },
  { label: "FAQs", href: "#faqs", colorClass: "btn-purple" },
  { label: "Contact", href: "#contact", colorClass: "btn-cyan" },
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
    <header className="sticky top-0 z-40 w-full bg-[#F8F9FA] dark:bg-[#0E0F12] border-b-2 border-black dark:border-zinc-700 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: GDG Logo + Chapter Label */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-7 relative flex items-center justify-center transition-transform group-hover:scale-105">
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

        {/* Center: Sleek Minimal Rectangular Badges */}
        <nav className="hidden lg:flex items-center gap-2">
          {navBadges.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-sm btn-minimal ${item.colorClass} transition-all`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions & User Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              {/* If Admin: show Admin Portal Button */}
              {user.role === "admin" && (
                <button
                  onClick={onOpenAdminModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-sm btn-minimal btn-yellow text-black cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              )}

              {/* If Student: show My Passes button */}
              {user.role !== "admin" && (
                <button
                  onClick={onOpenMyRegistrations}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-sm btn-minimal btn-green text-white cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5 text-yellow-300" />
                  <span>My Passes</span>
                </button>
              )}

              {/* User badge */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-sm border-2 border-black dark:border-zinc-500 bg-white dark:bg-zinc-800 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-bold text-black dark:text-white truncate max-w-[100px]">{user.name.split(" ")[0]}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 uppercase font-bold text-zinc-500">
                  {user.role}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={logout}
                title="Logout"
                className="w-9 h-9 rounded-sm btn-minimal btn-white text-zinc-700 dark:text-zinc-300 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-sm btn-minimal btn-blue text-white cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Direct RSVP button */}
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm btn-minimal btn-dark text-white cursor-pointer"
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
            className="lg:hidden w-9 h-9 rounded-sm btn-minimal btn-white text-black dark:text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navBadges.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-center text-xs font-bold rounded-sm btn-minimal ${item.colorClass}`}
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
                    className="w-full py-2.5 text-xs font-bold rounded-sm btn-minimal btn-yellow text-black"
                  >
                    Admin Console
                  </button>
                )}
                {user.role !== "admin" && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenMyRegistrations(); }}
                    className="w-full py-2.5 text-xs font-bold rounded-sm btn-minimal btn-green text-white"
                  >
                    My Event Passes
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 text-xs font-bold rounded-sm btn-minimal btn-blue text-white flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4" /> Sign In / Register
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
              className="w-full py-2.5 text-xs font-bold uppercase rounded-sm btn-minimal btn-dark text-white"
            >
              Register for Event Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
