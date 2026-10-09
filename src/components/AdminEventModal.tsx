"use client";

import { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, Users, Calendar, MapPin, Tag, Shield, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "./AuthContext";
import { EventItem } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onEventChanged: () => void;
}

const AVAILABLE_CATEGORIES = [
  "Web dev",
  "MAC",
  "design",
  "marketing",
  "management",
  "socials",
  "competetive programming",
];

export default function AdminEventModal({ isOpen, onClose, onEventChanged }: Props) {
  const { token, user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [mode, setMode] = useState<"list" | "create" | "edit" | "attendees">("list");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [attendeesList, setAttendeesList] = useState<any[]>([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState<number>(100);
  const [category, setCategory] = useState("Web dev");

  const fetchEvents = async () => {
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

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
      setMode("list");
      setMessage(null);
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenCreate = () => {
    setTitle("");
    setDescription("");
    setDateTime("");
    setVenue("");
    setCapacity(100);
    setCategory("Web dev");
    setErrorMsg(null);
    setMode("create");
  };

  const handleOpenEdit = (event: EventItem) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDateTime(event.dateTime || "");
    setVenue(event.venue || "");
    setCapacity(event.capacity);
    setCategory(event.category);
    setErrorMsg(null);
    setMode("edit");
  };

  const handleOpenAttendees = async (event: EventItem) => {
    setSelectedEvent(event);
    setMode("attendees");
    setActionLoading(true);
    try {
      const res = await fetch(`/api/events/${event.id}/attendees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAttendeesList(data.attendees || []);
      }
    } catch {}
    setActionLoading(false);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          dateTime,
          venue,
          capacity,
          category,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Event "${title}" created successfully!`);
        await fetchEvents();
        onEventChanged();
        setMode("list");
      } else {
        setErrorMsg(data.message || "Failed to create event");
      }
    } catch {
      setErrorMsg("Network error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setActionLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/events/${selectedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          dateTime,
          venue,
          capacity,
          category,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Event "${title}" updated successfully!`);
        await fetchEvents();
        onEventChanged();
        setMode("list");
      } else {
        setErrorMsg(data.message || "Failed to update event");
      }
    } catch {
      setErrorMsg("Network error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEvent = async (event: EventItem) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"? This cannot be undone.`)) {
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Event "${event.title}" deleted.`);
        await fetchEvents();
        onEventChanged();
      } else {
        setErrorMsg(data.message || "Failed to delete event.");
      }
    } catch {
      setErrorMsg("Network error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-400 rounded-sm w-full max-w-2xl shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="bg-[#FBBC04] text-black p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-black" />
            <h3 className="font-display-pixel text-base font-bold">
              ADMIN EVENT MANAGEMENT CONSOLE
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-sm btn-minimal btn-dark text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Header Navigation */}
        <div className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode("list"); setMessage(null); setErrorMsg(null); }}
              className={`px-3 py-1.5 rounded-sm btn-minimal ${mode === "list" ? "btn-dark text-white" : "btn-white text-black dark:text-white"}`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={handleOpenCreate}
              className="px-3 py-1.5 rounded-sm btn-minimal btn-blue text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Event</span>
            </button>
          </div>
          <span className="text-zinc-500 text-[11px]">Admin: {user?.name}</span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {message && (
            <div className="p-3 bg-green-100 text-green-800 border-2 border-green-500 rounded-sm text-xs font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>{message}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-800 border-2 border-red-500 rounded-sm text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE: LIST */}
          {mode === "list" && (
            <div className="space-y-3">
              {loading ? (
                <div className="py-12 flex items-center justify-center text-zinc-500 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <span className="font-mono text-xs">Loading events...</span>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-white dark:bg-zinc-800 border-2 border-black rounded-sm shadow-[3px_3px_0px_#000] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-sm btn-minimal btn-blue text-white text-[10px] font-bold">
                          {event.category}
                        </span>
                        <h4 className="font-bold text-sm text-black dark:text-white">
                          {event.title}
                        </h4>
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                        <span>{event.dateTime}</span>
                        <span>•</span>
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenAttendees(event)}
                        className="px-2.5 py-1.5 rounded-sm btn-minimal btn-white text-black dark:text-white text-xs flex items-center gap-1 cursor-pointer"
                        title="View Attendees"
                      >
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-[11px] font-bold">Attendees</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(event)}
                        className="p-1.5 rounded-sm btn-minimal btn-yellow text-black text-xs cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteEvent(event)}
                        className="p-1.5 rounded-sm btn-minimal btn-red text-white text-xs cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MODE: CREATE OR EDIT */}
          {(mode === "create" || mode === "edit") && (
            <form onSubmit={mode === "create" ? handleCreateSubmit : handleEditSubmit} className="space-y-4 font-mono text-xs">
              <h4 className="font-display-pixel text-base font-bold text-black dark:text-white">
                {mode === "create" ? "Create New GDG Event" : `Edit Event: ${selectedEvent?.title}`}
              </h4>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js & AI Hackathon"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Comprehensive event details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15th November 2024 • 3:00 PM"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Venue *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-sans text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Seat Capacity *
                  </label>
                  <input
                    type="number"
                    min={selectedEvent?.registeredCount || 1}
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Domain / Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-xs cursor-pointer"
                  >
                    {AVAILABLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-sm btn-minimal btn-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{mode === "create" ? "Create Event" : "Save Changes"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("list")}
                  className="px-5 py-3 rounded-sm btn-minimal btn-white text-black dark:text-white font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* MODE: ATTENDEES */}
          {mode === "attendees" && (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-sm text-black dark:text-white">
                    Attendees for {selectedEvent?.title}
                  </h4>
                  <span className="text-xs text-zinc-500">
                    {attendeesList.length} total attendees
                  </span>
                </div>
                <button
                  onClick={() => setMode("list")}
                  className="px-3 py-1.5 rounded-sm btn-minimal btn-white text-xs font-bold"
                >
                  ← Back to List
                </button>
              </div>

              {actionLoading ? (
                <div className="py-8 text-center text-zinc-500">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-500 mb-2" />
                  Loading attendee records...
                </div>
              ) : attendeesList.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">
                  No attendees registered for this event yet.
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {attendeesList.map((attendee, idx) => (
                    <div
                      key={attendee.id || idx}
                      className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-sm border border-black/20 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-black dark:text-white">{attendee.userName}</span>
                        <div className="text-[11px] text-zinc-500">{attendee.userEmail} • {attendee.department} ({attendee.year})</div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-sm bg-blue-100 text-blue-800 text-[10px] font-bold">
                          {attendee.ticketId}
                        </span>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{attendee.domain}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
