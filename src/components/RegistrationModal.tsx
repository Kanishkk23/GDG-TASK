"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Ticket, Sparkles, Loader2, AlertCircle, Calendar, MapPin, Download, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { EventItem, RegistrationResponse } from "@/types";
import { useAuth } from "./AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event?: EventItem | null;
  onRegisteredSuccess?: () => void;
}

const DEFAULT_FLAGSHIP_EVENT: EventItem = {
  id: "gdg-orientation-2024",
  title: "GDG ORIENTATION 2024",
  description: "Flagship kickoff event: meet domain leads, network with peer developers, and discover upcoming workshops and projects across GDG RBU.",
  dateTime: "10th October 2024 • 3:00 PM IST",
  date: "10TH OCTOBER",
  time: "3:00 PM IST",
  venue: "Main Auditorium, Ramdeobaba University",
  capacity: 250,
  category: "Orientation",
  registeredCount: 0,
  createdAt: new Date().toISOString(),
  isUpcoming: true,
};

export default function RegistrationModal({ isOpen, onClose, event, onRegisteredSuccess }: Props) {
  const { user, token } = useAuth();

  const [activeEvent, setActiveEvent] = useState<EventItem>(event || DEFAULT_FLAGSHIP_EVENT);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [year, setYear] = useState("2nd Year");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [response, setResponse] = useState<RegistrationResponse | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setActiveEvent(event);
    } else {
      fetch("/api/events")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data && data.data.length > 0) {
            const orientation = data.data.find((e: EventItem) => e.id === "gdg-orientation-2024") || data.data[0];
            setActiveEvent(orientation);
          }
        })
        .catch(() => {});
    }

    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      if (user.department) setDepartment(user.department);
      if (user.year) setYear(user.year);
    }
  }, [user, event, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const targetEventId = activeEvent.id || "gdg-orientation-2024";

    try {
      const res = await fetch(`/api/events/${targetEventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          fullName,
          email,
          department,
          year,
          domain: activeEvent.category || "Orientation",
        }),
      });

      const data: RegistrationResponse = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Registration could not be completed.");
      } else {
        const ticketId = data.ticketId || `GDG-RBU-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        
        // Generate scannable QR Code holding all attendee & event verification data
        const qrPayload = JSON.stringify({
          type: "GDG_RBU_EVENT_PASS",
          status: "CONFIRMED_REGISTRATION",
          ticketId: ticketId,
          eventName: activeEvent.title,
          attendeeName: fullName,
          email: email,
          department: department,
          year: year,
          venue: activeEvent.venue,
          dateTime: activeEvent.dateTime,
          issuedAt: new Date().toISOString(),
        }, null, 2);

        try {
          const url = await QRCode.toDataURL(qrPayload, {
            width: 320,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          });
          setQrCodeUrl(url);
        } catch {
          setQrCodeUrl(null);
        }

        setResponse(data);
        if (onRegisteredSuccess) onRegisteredSuccess();
      }
    } catch {
      setErrorMsg("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResponse(null);
    setQrCodeUrl(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-400 rounded-sm w-full max-w-lg shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#4285F4] text-white p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-300" />
            <h3 className="font-display-pixel text-base sm:text-lg font-bold">
              {activeEvent.title ? `${activeEvent.title.substring(0, 26)}... PASS` : "EVENT REGISTRATION"}
            </h3>
          </div>
          <button
            onClick={resetForm}
            aria-label="Close"
            className="w-8 h-8 rounded-sm btn-minimal btn-dark text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {response && qrCodeUrl ? (
            /* Success Ticket Preview with Scannable QR Code */
            <div className="text-center space-y-4 py-2 font-mono">
              <div className="w-12 h-12 rounded-sm btn-minimal btn-green text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>

              <div>
                <h4 className="font-display-pixel text-xl sm:text-2xl font-bold text-black dark:text-white">
                  Registration Confirmed!
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  Your digital entry pass has been issued for <span className="font-bold text-black dark:text-white">{activeEvent.title}</span>
                </p>
              </div>

              {/* Digital Pass Card with QR Code */}
              <div className="p-5 bg-white dark:bg-zinc-800 border-2.5 border-black dark:border-zinc-500 rounded-sm shadow-[5px_5px_0px_#000] text-left space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    OFFICIAL GDG ENTRY PASS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-sm btn-minimal btn-green text-white text-[10px] font-bold">
                    CONFIRMED & VERIFIED
                  </span>
                </div>

                {/* Generated QR Code Card */}
                <div className="flex flex-col items-center justify-center py-3 bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-sm p-4">
                  <img
                    src={qrCodeUrl}
                    alt={`Entry QR Pass for ${fullName}`}
                    className="w-44 h-44 rounded-sm border-2 border-black shadow-[3px_3px_0px_#000] bg-white p-2"
                  />
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300 font-bold mt-2.5 text-center">
                    <QrCode className="w-3.5 h-3.5 text-blue-500" />
                    <span>Scan at venue entrance for check-in</span>
                  </div>
                </div>

                {/* Pass Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900/60 p-2.5 rounded-sm border border-zinc-300 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 font-bold">TICKET ID</span>
                    <span className="font-bold text-[#EA4335] text-sm tracking-wider">{response.ticketId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">ATTENDEE</span>
                      <span className="font-bold text-black dark:text-white truncate block">{fullName}</span>
                      <span className="text-[10px] text-zinc-500 truncate block">{email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">DEPARTMENT / YEAR</span>
                      <span className="font-bold text-black dark:text-white truncate block">{department}</span>
                      <span className="text-[10px] text-zinc-500 truncate block">{year}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 text-xs">
                    <span className="text-[10px] text-zinc-500 block">EVENT & VENUE</span>
                    <div className="font-bold text-black dark:text-white">{activeEvent.title}</div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {activeEvent.dateTime} • {activeEvent.venue}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={qrCodeUrl}
                  download={`GDG-Pass-${response.ticketId || "orientation"}.png`}
                  className="flex-1 py-3 rounded-sm btn-minimal btn-blue text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR Pass</span>
                </a>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-sm btn-minimal btn-dark text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-800 border-2 border-red-500 rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Event Details Summary Banner */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-sm border-2 border-black dark:border-yellow-600 shadow-[3px_3px_0px_#000] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm btn-minimal btn-yellow text-black text-[10px] font-bold uppercase tracking-wider">
                    EVENT REGISTRATION
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                    GDG RBU
                  </span>
                </div>

                <h4 className="font-display-pixel text-base sm:text-lg font-bold text-black dark:text-white">
                  {activeEvent.title}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{activeEvent.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="truncate">{activeEvent.venue}</span>
                  </div>
                </div>

                {activeEvent.description && (
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans line-clamp-2 pt-1 border-t border-zinc-200 dark:border-zinc-700">
                    {activeEvent.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  College Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@rknec.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-xs cursor-pointer"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="Electronics & Communication">ECE</option>
                    <option value="Artificial Intelligence & DS">AI & DS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Current Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-xs cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Submit Button in sleek rectangular format */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm btn-minimal btn-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Generating Pass & QR Code...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-yellow-200" />
                      <span>Confirm Free Registration</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
