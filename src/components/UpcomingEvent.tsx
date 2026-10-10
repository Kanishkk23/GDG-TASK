"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, MapPin, Sparkles, Check, Tag, Users } from "lucide-react";
import { EventItem } from "@/types";
import { useAuth } from "./AuthContext";

interface Props {
  onOpenRegisterForEvent: (event: EventItem) => void;
  onOpenAuth: () => void;
  onOpenAdminModal: () => void;
  triggerRefresh?: number;
}

export default function UpcomingEvent({
  onOpenRegisterForEvent,
  onOpenAuth,
  onOpenAdminModal,
  triggerRefresh = 0,
}: Props) {
  const { user, token } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(data.data || []);
      }
    } catch {}
    setLoading(false);
  };

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
  }, [triggerRefresh]);

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
  const otherEvents = events.filter((e) => e.id !== flagship?.id);

  const flagshipPercent = flagship ? Math.min(100, Math.round((flagship.registeredCount / flagship.capacity) * 100)) : 0;
  const flagshipSeatsLeft = flagship ? Math.max(0, flagship.capacity - flagship.registeredCount) : 0;
  const isFlagshipFull = flagship ? flagship.registeredCount >= flagship.capacity : false;

  return (
    <section id="events" className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Section Heading matching Figma */}
        <div className="text-center">
          <h2 className="font-display-pixel text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            Upcoming Events
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Discover workshops, hackathons, and community sessions
          </p>
        </div>

        {/* Flagship Dual Cards matching exact Figma layout */}
        {flagship && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Card: Orientation Dark Gradient Card (7 cols) */}
            <div className="lg:col-span-7 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-900 dark:from-zinc-800 dark:via-zinc-900 dark:to-black text-white p-6 sm:p-8 rounded-sm border-3 border-black dark:border-zinc-500 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-white text-black border-2 border-black rounded-sm text-xs font-mono font-bold shadow-[2px_2px_0px_#000]">
                  FLAGSHIP EVENT
                </span>
                <span className="text-xs font-mono text-zinc-200 bg-black/60 px-3 py-1 rounded-sm border border-white/20">
                  ANNUAL ORIENTATION
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
                    <Tag className="w-3.5 h-3.5 text-[#FBBC04]" /> {flagship.category} Track
                  </div>
                </div>
              </div>

              {/* Bottom Rectangular Action Button & Live Seat Count */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className={`w-2 h-2 rounded-full ${isFlagshipFull ? "bg-red-400" : "bg-green-400"} animate-pulse`}></span>
                  <span>{flagship.registeredCount} / {flagship.capacity} Registered • {isFlagshipFull ? "0 seats left" : `${flagshipSeatsLeft} seats left`}</span>
                </div>
                <button
                  onClick={() => handleRegisterClick(flagship)}
                  aria-label="View Event Details"
                  className="px-5 py-2.5 rounded-sm btn-minimal btn-yellow text-black flex items-center justify-center gap-2 cursor-pointer font-bold text-xs shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Right Card: Bright Yellow Card (5 cols) matching Figma */}
            <div className="lg:col-span-5 bg-[#FFD600] text-black p-6 sm:p-8 rounded-sm border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between relative">
              <div>
                <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase rounded-sm mb-3">
                  SAVE THE DATE
                </div>
                <h3 className="font-display-pixel text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                  New Event
                </h3>
              </div>

              {/* Date & Time */}
              <div className="my-3 space-y-3 bg-white p-4 rounded-sm border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono font-bold text-zinc-700 tracking-wider">
                  DATE & TIME
                </div>
                <div className="flex items-center gap-2 text-base font-bold text-black">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{flagship.date || flagship.dateTime || "10TH OCTOBER"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>{flagship.time || "3:00 PM IST"}</span>
                </div>
              </div>

              {/* Live Capacity Task Bar for Flagship Event */}
              <div className="mb-4 bg-white p-4 rounded-sm border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-black">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{flagship.registeredCount} / {flagship.capacity} Registered</span>
                  </span>
                  <span className={isFlagshipFull ? "text-red-600 font-extrabold" : "text-green-700 font-bold"}>
                    {isFlagshipFull ? "0 seats left" : `${flagshipSeatsLeft} seats left`}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 h-3 rounded-[3px] border border-black overflow-hidden shadow-inner">
                  <div
                    className={`h-full transition-all duration-300 ${
                      flagshipPercent >= 100
                        ? "bg-red-500"
                        : flagshipPercent >= 75
                        ? "bg-amber-500"
                        : "bg-green-600"
                    }`}
                    style={{ width: `${flagshipPercent}%` }}
                  />
                </div>
              </div>

              <div>
                {userRegistrations.includes(flagship.id) ? (
                  <div className="space-y-2">
                    <div className="w-full py-3 rounded-sm btn-minimal btn-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" /> Already Registered
                    </div>
                    <button
                      onClick={() => handleUnregisterClick(flagship)}
                      className="w-full text-center text-[11px] font-mono font-bold text-red-700 underline cursor-pointer"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ) : isFlagshipFull ? (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-sm bg-zinc-300 text-zinc-600 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed border-2 border-zinc-500"
                  >
                    <span>Capacity Full</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegisterClick(flagship)}
                    className="w-full py-3.5 rounded-sm btn-minimal btn-dark text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
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

        {/* Other Chapter Events Grid (e.g. Pixotopia, Workshops, etc.) */}
        {otherEvents.length > 0 && (
          <div className="space-y-6 pt-6 border-t-2 border-black/10 dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black dark:border-zinc-700 pb-3">
              <div>
                <h3 className="font-display-pixel text-xl sm:text-2xl font-extrabold text-black dark:text-white">
                  All Upcoming Chapter Events
                </h3>
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  Discover technical workshops, hackathons, and sessions
                </p>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold rounded-sm border border-black dark:border-white shadow-[2px_2px_0px_#000]">
                {otherEvents.length} {otherEvents.length === 1 ? "Event" : "Events"} Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.map((event) => {
                const isRegistered = userRegistrations.includes(event.id);
                const isFull = event.registeredCount >= event.capacity;
                const seatsLeft = Math.max(0, event.capacity - event.registeredCount);
                const percent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

                return (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-500 rounded-sm p-6 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] flex flex-col justify-between space-y-5 font-mono transition-transform hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-sm btn-minimal btn-blue text-white text-[11px] font-bold">
                          {event.category || "Workshop"}
                        </span>
                        {isFull ? (
                          <span className="px-2.5 py-0.5 bg-red-100 text-red-700 border border-red-500 rounded-sm text-[11px] font-bold">
                            FULL CAPACITY
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-500 rounded-sm text-[11px] font-bold">
                            {seatsLeft} seats left
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h4 className="font-display-pixel text-lg sm:text-xl font-extrabold text-black dark:text-white tracking-tight">
                        {event.title}
                      </h4>

                      {/* Description */}
                      {event.description && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      {/* Date & Venue */}
                      <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pt-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate font-semibold">{event.dateTime || event.date || "Date TBA"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="truncate">{event.venue || "Campus Venue"}</span>
                        </div>
                      </div>

                      {/* Capacity Task Bar */}
                      <div className="space-y-1.5 pt-2 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-sm border border-zinc-200 dark:border-zinc-700">
                        <div className="flex justify-between items-center text-xs font-mono font-bold">
                          <span className="text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span>{event.registeredCount} / {event.capacity} Registered</span>
                          </span>
                          <span className={isFull ? "text-red-600 font-extrabold" : "text-green-700 dark:text-green-400 font-bold"}>
                            {isFull ? "0 seats left" : `${seatsLeft} seats left`}
                          </span>
                        </div>
                        {/* Task Bar Track */}
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-[2px] border border-black/60 overflow-hidden shadow-inner">
                          <div
                            className={`h-full transition-all duration-300 ${
                              percent >= 100
                                ? "bg-red-500"
                                : percent >= 75
                                ? "bg-amber-500"
                                : "bg-green-600"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {isRegistered ? (
                        <div className="space-y-2">
                          <div className="w-full py-2.5 rounded-sm btn-minimal btn-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4" /> Already Registered
                          </div>
                          <button
                            onClick={() => handleUnregisterClick(event)}
                            className="w-full text-center text-[11px] font-mono font-bold text-red-700 underline cursor-pointer"
                          >
                            Cancel Reservation
                          </button>
                        </div>
                      ) : isFull ? (
                        <button
                          disabled
                          className="w-full py-2.5 rounded-sm bg-zinc-300 dark:bg-zinc-800 text-zinc-500 font-bold text-xs cursor-not-allowed text-center uppercase tracking-wider border border-zinc-400"
                        >
                          Capacity Full
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegisterClick(event)}
                          className="w-full py-2.5 rounded-sm btn-minimal btn-yellow text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-black" />
                          <span>Register Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
