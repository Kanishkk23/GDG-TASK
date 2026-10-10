"use client";

import { useState } from "react";
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "./AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: Props) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const { login, registerUser } = useAuth();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [year, setYear] = useState("2nd Year");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      setSuccessMsg("Welcome back!");
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const res = await registerUser({
      name,
      email: regEmail,
      password: regPassword,
      department,
      year,
      role: "user",
    });
    setLoading(false);
    if (res.success) {
      setSuccessMsg("Account created successfully!");
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-400 rounded-sm w-full max-w-md shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#4285F4] text-white p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-300" />
            <h3 className="font-display-pixel text-base font-bold">
              GDG AUTHENTICATION PORTAL
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

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-black dark:border-zinc-700">
          <button
            type="button"
            onClick={() => { setTab("login"); setErrorMsg(null); }}
            className={`flex-1 py-3 text-xs font-mono font-bold text-center transition-colors cursor-pointer ${
              tab === "login"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab("register"); setErrorMsg(null); }}
            className={`flex-1 py-3 text-xs font-mono font-bold text-center transition-colors cursor-pointer ${
              tab === "register"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border-2 border-red-500 rounded-sm flex items-center gap-2 text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border-2 border-green-500 rounded-sm flex items-center gap-2 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="student@rknec.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-sm btn-minimal btn-blue text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Sign In</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  College Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@rknec.edu"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white focus:outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-[11px]"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="AI & Data Science">AI & DS</option>
                    <option value="ECE">ECE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-black dark:text-white mb-1">
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-black rounded-sm text-black dark:text-white font-mono text-[11px]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-sm btn-minimal btn-green text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Create Account</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
