"use client";

import { ArrowRight, Calendar, Clock, MapPin, Users, Sparkles } from "lucide-react";

export default function UpcomingEvent({ onOpenRegister }: { onOpenRegister: () => void }) {
  return (
    <section id="events" className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Heading matching Figma retro blocky style */}
        <div className="text-center mb-10">
          <h2 className="font-display-pixel text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Upcoming Event
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Connect, learn, and grow with peer developers
          </p>
        </div>

        {/* Dual Cards Grid matching Figma exact layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Orientation Dark Gradient Card (8 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-900 dark:from-zinc-800 dark:via-zinc-900 dark:to-black text-white p-6 sm:p-8 rounded-2xl border-3 border-black dark:border-zinc-500 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 ios-glass-btn rounded-lg text-black text-xs font-mono font-bold">
                FLAGSHIP EVENT
              </span>
              <span className="text-xs font-mono text-zinc-300 bg-black/40 px-3 py-1 rounded-lg border border-white/20">
                LIMITED SEATS
              </span>
            </div>

            {/* Event Title and Details */}
            <div className="space-y-4 my-auto">
              <h3 className="font-display-pixel text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                GDG ORIENTATION 2024
              </h3>

              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed max-w-lg font-medium drop-shadow">
                Discover what Google Developer Groups RBU has in store for the academic year! Explore tracks in Web Development, MAC, Design, Marketing, Management, Socials, and Competitive Programming. Meet chapter leads and network with peers.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EA4335]" /> Main Auditorium
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#34A853]" /> 250+ Attendees
                </div>
              </div>
            </div>

            {/* Bottom Arrow Button with iOS glass effect */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/20">
              <span className="text-xs font-mono text-zinc-300">
                Free entry for all RBU students
              </span>
              <button
                onClick={onOpenRegister}
                aria-label="View Event Details"
                className="w-12 h-12 rounded-full ios-glass-btn ios-glass-yellow text-black flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>

          </div>

          {/* Card 2: Bright Yellow Brutalist Card (5 cols) matching Figma */}
          <div className="lg:col-span-5 bg-[#FFD600] text-black p-6 sm:p-8 rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between relative">
            
            {/* Top Tag */}
            <div>
              <div className="inline-block px-3 py-1 ios-glass-btn ios-glass-dark text-white text-[10px] font-mono font-bold uppercase rounded-lg mb-3">
                SAVE THE DATE
              </div>
              <h3 className="font-display-pixel text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                New Event
              </h3>
            </div>

            {/* Date and Time Details */}
            <div className="my-6 space-y-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="text-[11px] font-mono font-bold text-zinc-700 tracking-wider">
                DATE & TIME
              </div>
              <div className="flex items-center gap-2 text-base font-bold text-black">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>10TH OCTOBER</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                <Clock className="w-4 h-4 text-red-600" />
                <span>3:00 PM IST</span>
              </div>
            </div>

            {/* Register Now Button with iOS Glass effect */}
            <div>
              <button
                onClick={onOpenRegister}
                className="w-full py-4 rounded-2xl ios-glass-btn ios-glass-dark text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Register Now</span>
              </button>
              <p className="text-center text-[11px] font-mono font-semibold text-zinc-800 mt-2">
                Instant digital pass generated upon signup
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
