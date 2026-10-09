"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, MapPin, Users, Sparkles, Search, CheckCircle, AlertTriangle, Shield, Check } from "lucide-react";
import { EventItem } from "@/types";
import { useAuth } from "./AuthContext";

interface Props {
  onOpenRegisterForEvent: (event: EventItem) => void;
  onOpenAuth: () => void;
  onOpenAdminModal: () => void;
  triggerRefresh?: number;
}

const CATEGORY_TABS = [
  "All",
  "Web dev",
  "MAC",
  "design",
  "marketing",
  "management",
  "socials",
  "competetive programming",
];

export default function UpcomingEvent({
  onOpenRegisterForEvent,
  onOpenAuth,
  onOpenAdminModal,
  triggerRefresh = 0,
}: Props) {
  const { user, token } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]); // list of eventIds registered

  // Load events
  const loadEvents = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/events", window.location.origin);
      if (searchQuery) url.searchParams.set("search", searchQuery);
      if (selectedCategory && selectedCategory !== "All") url.searchParams.set("category", selectedCategory);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(data.data || []);
      }
    } catch {}
    setLoading(false);
  };

  // Load user registrations to show "Already Registered" status
  const loadUserRegistrations = async () => {
    if (!token) {
      setUserRegistrations([]);
      return;
    }
    try {
      const res = await fetch("/api/users/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const ids = (data.data || []).map((r: any) => r.eventId);
        setUserRegistrations(ids);
      }
    } catch {}
  };

  useEffect(() => {
    loadEvents();
  }, [searchQuery, selectedCategory, triggerRefresh]);

  useEffect(() => {
    loadUserRegistrations();
  }, [token, triggerRefresh]);

  const handleRegisterClick = (event: EventItem) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    onOpenRegisterForEvent(event);
  };

  const handleUnregisterClick = async (event: EventItem) => {
    if (!confirm(`Do you want to cancel your registration for ${event.title}?`)) return;
    try {
      const res = await fetch(`/api/events/${event.id}/unregister`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        loadEvents();
        loadUserRegistrations();
      }
    } catch {}
  };

  // Flagship Orientation event (matching Figma cards)
  const flagship = events.find((e) => e.id === "gdg-orientation-2024") || events[0];

  return (
    <section id="events" className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Section Heading matching Figma */}
        <div className="text-center">
          <h2 className="font-display-pixel text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Upcoming Event
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Discover workshops, hackathons, and community sessions
          </p>
        </div>

        {/* 1. Flagship Dual Cards matching exact Figma layout */}
        {flagship && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Card: Orientation Dark Gradient Card (8 cols) */}
            <div className="lg:col-span-7 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-900 dark:from-zinc-800 dark:via-zinc-900 dark:to-black text-white p-6 sm:p-8 rounded-2xl border-3 border-black dark:border-zinc-500 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 ios-glass-btn rounded-lg text-black text-xs font-mono font-bold">
                  FLAGSHIP EVENT
                </span>
                <span className="text-xs font-mono text-zinc-300 bg-black/40 px-3 py-1 rounded-lg border border-white/20">
                  {flagship.capacity - flagship.registeredCount} SEATS LEFT
                </span>
              </div>

              <div className="space-y-4 my-auto">
                <h3 className="font-display-pixel text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {flagship.title}
                </h3>
                <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed max-w-lg font-medium drop-shadow">
                  {flagship.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EA4335]" /> {flagship.venue}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#34A853]" /> {flagship.registeredCount} / {flagship.capacity} Registered
                  </div>
                </div>

                {/* Capacity progress bar */}
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#34A853] h-full transition-all"
                    style={{ width: `${Math.min(100, Math.round((flagship.registeredCount / flagship.capacity) * 100))}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-xs font-mono text-zinc-300">
                  Free entry for all RBU students
                </span>
                <button
                  onClick={() => handleRegisterClick(flagship)}
                  aria-label="View Event Details"
                  className="w-12 h-12 rounded-full ios-glass-btn ios-glass-yellow text-black flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            {/* Right Card: Bright Yellow Card (5 cols) matching Figma */}
            <div className="lg:col-span-5 bg-[#FFD600] text-black p-6 sm:p-8 rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between relative">
              <div>
                <div className="inline-block px-3 py-1 ios-glass-btn ios-glass-dark text-white text-[10px] font-mono font-bold uppercase rounded-lg mb-3">
                  SAVE THE DATE
                </div>
                <h3 className="font-display-pixel text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                  New Event
                </h3>
              </div>

              <div className="my-6 space-y-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono font-bold text-zinc-700 tracking-wider">
                  DATE & TIME
                </div>
                <div className="flex items-center gap-2 text-base font-bold text-black">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{flagship.date || "10TH OCTOBER"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>{flagship.time || "3:00 PM IST"}</span>
                </div>
              </div>

              <div>
                {userRegistrations.includes(flagship.id) ? (
                  <div className="space-y-2">
                    <div className="w-full py-3 rounded-2xl ios-glass-btn ios-glass-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" /> Already Registered
                    </div>
                    <button
                      onClick={() => handleUnregisterClick(flagship)}
                      className="w-full text-center text-[11px] font-mono font-bold text-red-700 underline cursor-pointer"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ) : flagship.registeredCount >= flagship.capacity ? (
                  <div className="w-full py-4 rounded-2xl bg-zinc-700 text-white font-bold text-sm uppercase text-center font-mono">
                    Event Full (Capacity Reached)
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegisterClick(flagship)}
                    className="w-full py-4 rounded-2xl ios-glass-btn ios-glass-dark text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Register Now</span>
                  </button>
                )}

                <p className="text-center text-[11px] font-mono font-semibold text-zinc-800 mt-2">
                  Instant digital pass generated upon signup
                </p>
              </div>
            </div>

          </div>
        )}

        {/* 2. Interactive Events Browser (Search, 7 Domain Filter Tabs, Capacity Indicators) */}
        <div className="pt-8 border-t-2 border-black dark:border-zinc-700 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display-pixel text-xl sm:text-2xl font-bold text-black dark:text-white">
                Discover All GDG Events
              </h3>
              <p className="font-mono text-xs text-zinc-500">
                Filter by technical domain or search by topic & venue
              </p>
            </div>

            {/* Search Input with iOS glass styling */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl ios-glass-btn text-xs font-mono text-black dark:text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Domain Filter Pills matching user-specified domain list */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_TABS.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "ios-glass-btn ios-glass-blue text-white shadow-md"
                      : "ios-glass-btn text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Events Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const isRegistered = userRegistrations.includes(event.id);
              const isFull = event.registeredCount >= event.capacity;
              const percent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

              return (
                <div
                  key={event.id}
                  className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-2.5 border-black dark:border-zinc-500 rounded-2xl p-5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] flex flex-col justify-between space-y-4 font-mono transition-transform hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg ios-glass-btn ios-glass-blue text-white text-[10px] font-bold">
                        {event.category}
                      </span>
                      {isFull ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded border border-red-400">
                          FULL
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500">
                          {event.capacity - event.registeredCount} spots open
                        </span>
                      )}
                    </div>

                    <h4 className="font-display-pixel text-base font-bold text-black dark:text-white line-clamp-2">
                      {event.title}
                    </h4>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 font-sans font-medium">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span className="truncate">{event.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    {/* Live Capacity Indicator */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-zinc-500">
                        <span>Capacity</span>
                        <span className="font-bold">{event.registeredCount} / {event.capacity} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            percent >= 100 ? "bg-red-500" : percent >= 75 ? "bg-amber-500" : "bg-green-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
                    {isRegistered ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Pass Claimed
                        </span>
                        <button
                          onClick={() => handleUnregisterClick(event)}
                          className="px-2.5 py-1 text-[11px] rounded-lg ios-glass-btn ios-glass-red text-white font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : isFull ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl bg-zinc-300 dark:bg-zinc-800 text-zinc-500 text-xs font-bold cursor-not-allowed text-center"
                      >
                        Capacity Full
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegisterClick(event)}
                        className="w-full py-2.5 rounded-xl ios-glass-btn ios-glass-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Register Now</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {events.length === 0 && !loading && (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              No events found matching your search.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
