"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  registerUser: (data: { name: string; email: string; password: string; department?: string; year?: string; role?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  quickLogin: (role: "admin" | "student") => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
      } else {
        localStorage.removeItem("gdg_auth_token");
        setUser(null);
        setToken(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("gdg_auth_token");
    if (savedToken) {
      setToken(savedToken);
      fetchCurrentUser(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("gdg_auth_token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "Login failed" };
    } catch {
      return { success: false, message: "Network error occurred." };
    }
  };

  const registerUser = async (formData: { name: string; email: string; password: string; department?: string; year?: string; role?: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("gdg_auth_token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "Registration failed" };
    } catch {
      return { success: false, message: "Network error occurred." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/me", { method: "POST" });
    } catch {}
    localStorage.removeItem("gdg_auth_token");
    setToken(null);
    setUser(null);
  };

  const quickLogin = async (role: "admin" | "student") => {
    if (role === "admin") {
      await login("k3kriplani@gmail.com", "pass-Kanishk");
    } else {
      await login("student@rknec.edu", "student123");
    }
  };

  const refreshUser = async () => {
    if (token) await fetchCurrentUser(token);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, registerUser, logout, quickLogin, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
