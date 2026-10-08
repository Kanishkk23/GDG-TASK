"use client";

import { useState } from "react";
import { X, CheckCircle2, Ticket, Sparkles, Loader2, AlertCircle, ChevronDown, Check } from "lucide-react";
import { RegistrationRequest, RegistrationResponse } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// User-specified domain list
const AVAILABLE_DOMAINS = [
  "Web dev",
  "MAC",
  "design",
  "marketing",
  "management",
  "socials",
  "competetive programming"
];

export default function RegistrationModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<RegistrationRequest>({
    eventId: "gdg-orientation-2024",
    fullName: "",
    email: "",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    phone: "",
    interestTracks: ["Web dev"],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [response, setResponse] = useState<RegistrationResponse | null>(null);

  if (!isOpen) return null;

  const handleSelectDomain = (domain: string) => {
    const current = formData.interestTracks || [];
    if (current.includes(domain)) {
      if (current.length > 1) {
        setFormData({ ...formData, interestTracks: current.filter((d) => d !== domain) });
      }
    } else {
      setFormData({ ...formData, interestTracks: [...current, domain] });
    }
  };

  const handleSingleSelectDomain = (domain: string) => {
    setFormData({ ...formData, interestTracks: [domain] });
    setIsDropdownOpen(false);
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
    setIsDropdownOpen(false);
    setFormData({
      eventId: "gdg-orientation-2024",
      fullName: "",
      email: "",
      department: "Computer Science & Engineering",
      year: "2nd Year",
      phone: "",
      interestTracks: ["Web dev"],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border-3 border-black dark:border-zinc-400 rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden">
        
        {/* Modal Header */}
        <div className="ios-glass-blue text-white p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-300" />
            <h3 className="font-display-pixel text-base sm:text-lg font-bold">
              GDG ORIENTATION 2024 PASS
            </h3>
          </div>
          <button
            onClick={resetForm}
            aria-label="Close modal"
            className="w-8 h-8 rounded-xl ios-glass-btn ios-glass-dark text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {response ? (
            /* Success Ticket Preview */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-2xl ios-glass-btn ios-glass-green text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-white" />
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
              <div className="p-5 bg-white/70 dark:bg-zinc-800/80 backdrop-blur-xl border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] text-left space-y-3 font-mono">
                <div className="flex justify-between items-center border-b border-zinc-300 dark:border-zinc-700 pb-2">
                  <span className="text-xs text-zinc-500">TICKET PASS</span>
                  <span className="px-2.5 py-0.5 rounded-full ios-glass-btn ios-glass-blue text-white text-[10px] font-bold">
                    CONFIRMED
                  </span>
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
                    <span className="text-[10px] text-zinc-500 block">SELECTED DOMAIN</span>
                    <span className="font-bold text-[#4285F4] truncate">
                      {formData.interestTracks?.join(", ") || "Web dev"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3.5 rounded-2xl ios-glass-btn ios-glass-dark text-white font-bold font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-800 border-2 border-red-500 rounded-xl flex items-center gap-2">
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
                  className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
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
                  className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
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
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-xl text-black dark:text-white font-mono text-xs"
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
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-xl text-black dark:text-white font-mono text-xs"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* User-Requested Dropdown Button for Domains */}
              <div className="relative">
                <label className="block font-bold text-black dark:text-white mb-1">
                  Select Domain / Track *
                </label>
                
                {/* Sleek iOS Glass Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-3 rounded-2xl ios-glass-btn flex items-center justify-between text-left border-2 border-black dark:border-white/30 text-black dark:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-zinc-500 dark:text-zinc-400">Domain:</span>
                    <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
                      {formData.interestTracks && formData.interestTracks.length > 0
                        ? formData.interestTracks.join(", ")
                        : "Choose a Domain..."}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-600 dark:text-zinc-300 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu with all requested domains */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border-2 border-black dark:border-white/20 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in max-h-56 overflow-y-auto">
                    <div className="px-2 py-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase font-semibold">
                      Available GDG Domains
                    </div>
                    {AVAILABLE_DOMAINS.map((domain) => {
                      const isSelected = formData.interestTracks?.includes(domain);

                      return (
                        <button
                          key={domain}
                          type="button"
                          onClick={() => handleSingleSelectDomain(domain)}
                          className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "ios-glass-btn ios-glass-blue font-bold text-white"
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white font-medium"
                          }`}
                        >
                          <span className="text-xs">{domain}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Native dropdown selector for accessibility */}
                <div className="mt-2">
                  <select
                    value={formData.interestTracks?.[0] || "Web dev"}
                    onChange={(e) => handleSingleSelectDomain(e.target.value)}
                    aria-label="Select Domain"
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black dark:border-white/30 rounded-xl text-black dark:text-white font-mono text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>-- Or choose from standard dropdown --</option>
                    {AVAILABLE_DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Selection Tags below dropdown for convenience */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {AVAILABLE_DOMAINS.map((domain) => {
                    const isSelected = formData.interestTracks?.includes(domain);
                    return (
                      <button
                        type="button"
                        key={domain}
                        onClick={() => handleSelectDomain(domain)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "ios-glass-btn ios-glass-yellow text-black"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                        }`}
                      >
                        {domain}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button with iOS Glass Effect */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl ios-glass-btn ios-glass-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-yellow-200" />
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
