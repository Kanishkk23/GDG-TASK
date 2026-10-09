"use client";

import { useState } from "react";
import { ArrowRight, Terminal, Sparkles, Code2, Users, Calendar } from "lucide-react";

export default function Hero({ onOpenRegister }: { onOpenRegister: () => void }) {
  const [activeTab, setActiveTab] = useState<"terminal" | "stats">("terminal");

  return (
    <section id="hero" className="w-full pt-8 pb-14 md:py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading, Subtitle & Buttons */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Chapter badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-2 border-black dark:border-amber-400 rounded-sm font-mono text-xs font-bold shadow-[2px_2px_0px_#000] w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
            <span>EST. 2024 • STUDENT CHAPTER</span>
          </div>

          {/* Main Title matching Figma retro style */}
          <h1 className="font-display-pixel text-3xl sm:text-4xl md:text-5xl font-extrabold text-black dark:text-white leading-[1.15] tracking-tight">
            GOOGLE DEVELOPER GROUPS, RBU
          </h1>

          {/* Mission Subtitle */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl font-medium">
            Empowering students with cutting-edge tech skills, community, and resources for a future in technology.
          </p>

          {/* Sleek Minimal Rectangular Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenRegister}
              className="px-7 py-3 rounded-sm btn-minimal btn-blue font-bold text-sm tracking-wide flex items-center gap-2 cursor-pointer"
            >
              <span>JOIN US</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#events"
              className="px-7 py-3 rounded-sm btn-minimal btn-white text-black dark:text-white font-bold text-sm tracking-wide cursor-pointer"
            >
              EXPLORE EVENTS
            </a>
          </div>
        </div>

        {/* Right Column: Retro Terminal Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-black text-white border-3 border-black rounded-sm p-1 shadow-[8px_8px_0px_#000] dark:border-zinc-300 dark:shadow-[8px_8px_0px_#fff] relative">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FBBC04]"></div>
                <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
                <span className="ml-2 font-mono text-[11px] text-zinc-400 flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> gdg-rbu-terminal ~ zsh
                </span>
              </div>
              <div className="flex gap-1 text-[10px] font-mono">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-2.5 py-1 rounded-sm border border-zinc-600 transition-colors ${activeTab === "terminal" ? "bg-zinc-700 text-white" : "text-zinc-400"}`}
                >
                  cli
                </button>
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`px-2.5 py-1 rounded-sm border border-zinc-600 transition-colors ${activeTab === "stats" ? "bg-zinc-700 text-white" : "text-zinc-400"}`}
                >
                  stats
                </button>
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div className="p-4 font-mono text-xs space-y-3 bg-[#0c0d10] min-h-[220px]">
              {activeTab === "terminal" ? (
                <>
                  <div className="text-zinc-400">
                    <span className="text-[#34A853]">user@gdg-rbu</span>:<span className="text-[#4285F4]">~</span>$ npm run dev:orientation
                  </div>
                  <div className="text-[#FBBC04] font-semibold">
                    [GDG CORE] Loading chapter dependencies...
                  </div>
                  <div className="text-zinc-300 space-y-1 text-[11px]">
                    <div>✔ Chapter: Google Developer Groups On Campus</div>
                    <div>✔ Institution: Ramdeobaba University, Nagpur</div>
                    <div>✔ Status: Active & Welcoming New Developers</div>
                    <div>✔ Flagship: GDG Orientation 2024 (Oct 10, 3 PM)</div>
                  </div>
                  <div className="p-2.5 bg-zinc-900/80 border border-zinc-700 rounded-sm text-[#38BDF8] flex items-center justify-between">
                    <span>Ready to collaborate & build?</span>
                    <span className="animate-pulse bg-[#34A853] text-black px-2 py-0.5 rounded-sm font-bold text-[10px]">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-zinc-400 flex items-center gap-1">
                    <span className="text-[#34A853]">user@gdg-rbu</span>:<span className="text-[#4285F4]">~</span>$ 
                    <span className="w-2 h-4 bg-white animate-pulse inline-block align-middle"></span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-2.5 bg-zinc-900 border border-zinc-700 rounded-sm">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Users className="w-4 h-4 text-[#4285F4]" /> Active Members
                    </span>
                    <span className="font-bold text-white text-sm">650+</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-zinc-900 border border-zinc-700 rounded-sm">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Code2 className="w-4 h-4 text-[#34A853]" /> Tech Workshops
                    </span>
                    <span className="font-bold text-white text-sm">24+</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-zinc-900 border border-zinc-700 rounded-sm">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Calendar className="w-4 h-4 text-[#FBBC04]" /> Hackathons Hosted
                    </span>
                    <span className="font-bold text-white text-sm">6</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
