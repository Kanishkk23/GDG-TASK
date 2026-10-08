"use client";

import { useState } from "react";
import { X, CheckCircle2, Ticket, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { RegistrationRequest, RegistrationResponse } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<RegistrationRequest>({
    eventId: "gdg-orientation-2024",
    fullName: "",
    email: "",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    phone: "",
    interestTracks: ["Web Development"],
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [response, setResponse] = useState<RegistrationResponse | null>(null);

  if (!isOpen) return null;

  const handleTrackToggle = (track: string) => {
    const current = formData.interestTracks || [];
    if (current.includes(track)) {
      setFormData({ ...formData, interestTracks: current.filter((t) => t !== track) });
    } else {
      setFormData({ ...formData, interestTracks: [...current, track] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: RegistrationResponse = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to complete registration.");
      } else {
        setResponse(data);
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResponse(null);
    setErrorMsg(null);
    setFormData({
      eventId: "gdg-orientation-2024",
      fullName: "",
      email: "",
      department: "Computer Science & Engineering",
      year: "2nd Year",
      phone: "",
      interestTracks: ["Web Development"],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-400 rounded-2xl w-full max-w-lg shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#4285F4] text-white p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-300" />
            <h3 className="font-display-pixel text-base sm:text-lg font-bold">
              GDG ORIENTATION 2024 PASS
            </h3>
          </div>
          <button
            onClick={resetForm}
            aria-label="Close modal"
            className="p-1 rounded-md bg-black text-white hover:bg-zinc-800 border border-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {response ? (
            /* Success Ticket Preview */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 bg-green-100 text-[#34A853] border-2 border-black rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display-pixel text-xl font-bold text-black dark:text-white">
                  You are Registered!
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-mono">
                  {response.message}
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 bg-amber-50 dark:bg-zinc-800 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] text-left space-y-3 font-mono">
                <div className="flex justify-between items-center border-b border-zinc-300 dark:border-zinc-700 pb-2">
                  <span className="text-xs text-zinc-500">TICKET PASS</span>
                  <span className="px-2 py-0.5 bg-[#4285F4] text-white text-[11px] font-bold rounded">CONFIRMED</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">TICKET ID</span>
                  <span className="text-base font-bold text-[#EA4335] tracking-wider">{response.ticketId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">ATTENDEE</span>
                    <span className="font-bold text-black dark:text-white truncate">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">EVENT DATE</span>
                    <span className="font-bold text-black dark:text-white">10 Oct 2024 • 3 PM</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3 bg-black text-white hover:bg-zinc-800 font-bold font-mono text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-800 border-2 border-red-500 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  College Email (RBU / Personal) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@rknec.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-lg text-black dark:text-white font-mono text-xs"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="Electronics & Communication">ECE</option>
                    <option value="Artificial Intelligence & DS">AI & DS</option>
                    <option value="Other Department">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Current Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-lg text-black dark:text-white font-mono text-xs"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Interested Domains / Tracks:
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Web Development", "AI / ML", "Google Cloud", "Android Dev"].map((track) => {
                    const isSelected = formData.interestTracks?.includes(track);
                    return (
                      <button
                        type="button"
                        key={track}
                        onClick={() => handleTrackToggle(track)}
                        className={`px-2.5 py-1 rounded-md border-2 border-black text-[11px] font-bold transition-all ${
                          isSelected
                            ? "bg-[#FBBC04] text-black shadow-[2px_2px_0px_#000]"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "} {track}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#34A853] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Free RSVP</span>
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
