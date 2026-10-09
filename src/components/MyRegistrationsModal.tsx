"use client";

import { useState, useEffect } from "react";
import { X, Ticket, Calendar, MapPin, Tag, Trash2, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "./AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationUpdated?: () => void;
}

interface UserRegisteredEvent {
  registrationId: string;
  ticketId: string;
  eventId: string;
  eventTitle: string;
  dateTime: string;
  venue: string;
  category: string;
  registeredAt: string;
}

export default function MyRegistrationsModal({ isOpen, onClose, onRegistrationUpdated }: Props) {
  const { user, token } = useAuth();
  const [registrations, setRegistrations] = useState<UserRegisteredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/users/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(data.data || []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchRegistrations();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const handleUnregister = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to cancel registration for "${eventTitle}"? Your reserved spot will be released.`)) {
      return;
    }

    setCancellingId(eventId);
    setMessage(null);

    try {
      const res = await fetch(`/api/events/${eventId}/unregister`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("Registration successfully cancelled. Spot released.");
        await fetchRegistrations();
        if (onRegistrationUpdated) onRegistrationUpdated();
      } else {
        setMessage(data.message || "Failed to cancel registration.");
      }
    } catch {
      setMessage("Network error occurred.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-400 rounded-sm w-full max-w-xl shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#34A853] text-white p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-300" />
            <h3 className="font-display-pixel text-base font-bold">
              MY EVENT PASSES & REGISTRATIONS
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b pb-2 border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500">Logged in as: <strong className="text-black dark:text-white">{user?.name}</strong></span>
            <span className="px-2.5 py-0.5 rounded-sm btn-minimal btn-white text-[11px] font-bold">
              {registrations.length} {registrations.length === 1 ? "Event" : "Events"} Registered
            </span>
          </div>

          {message && (
            <div className="p-3 bg-blue-100 text-blue-900 border-2 border-blue-400 rounded-sm text-xs font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{message}</span>
            </div>
          )}

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="font-mono text-xs">Loading your passes...</span>
            </div>
          ) : registrations.length === 0 ? (
            <div className="py-12 text-center space-y-3 font-mono">
              <Ticket className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <h4 className="font-bold text-sm text-black dark:text-white">No Active Registrations</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                You haven&apos;t registered for any GDG events yet. Browse events on the home page and claim your free pass!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.registrationId}
                  className="p-5 bg-white dark:bg-zinc-800 border-2 border-black rounded-sm shadow-[4px_4px_0px_#000] space-y-3 font-mono"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        TICKET PASS: {reg.ticketId}
                      </span>
                      <h4 className="font-display-pixel text-base font-bold text-black dark:text-white mt-0.5">
                        {reg.eventTitle}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-sm btn-minimal btn-yellow text-black text-[10px] font-bold shrink-0">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{reg.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{reg.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-sm text-[11px] font-semibold flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Track: {reg.category}
                    </span>

                    <button
                      type="button"
                      disabled={cancellingId === reg.eventId}
                      onClick={() => handleUnregister(reg.eventId, reg.eventTitle)}
                      className="px-3 py-1.5 rounded-sm btn-minimal btn-red text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {cancellingId === reg.eventId ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Cancel Registration</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
