"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, GraduationCap, Clock, LayoutDashboard, Compass, Sun, Moon } from "lucide-react";

interface HeaderProps {
  currentView?: "landing" | "terminal";
  onToggleView?: (view: "landing" | "terminal") => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = "terminal",
  onToggleView,
  theme,
  onToggleTheme,
}) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      className={`w-full border-b sticky top-0 z-50 transition-colors duration-200 ${
        isDark
          ? "border-stone-800/90 bg-[#12100E]/90 backdrop-blur-md"
          : "border-orange-200/80 bg-white/95 backdrop-blur-md shadow-xs"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand & Editorial Identity */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onToggleView && onToggleView("landing")}
            className="flex items-center space-x-2 text-left group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
            <span
              className={`font-mono font-bold tracking-tight text-base transition-colors ${
                isDark ? "text-white group-hover:text-orange-400" : "text-stone-900 group-hover:text-orange-600"
              }`}
            >
              NEXUS
            </span>
            <span className="text-[#FF6B00] font-mono text-xs font-semibold">/ DESK</span>
          </button>

          <span className={`hidden md:inline-block h-4 w-px ${isDark ? "bg-stone-800" : "bg-orange-200"}`} />
          <span
            className={`hidden md:inline-block text-[11px] font-mono uppercase tracking-widest ${
              isDark ? "text-stone-400" : "text-stone-600 font-medium"
            }`}
          >
            24/7 Tokenized Equity Intelligence
          </span>
        </div>

        {/* Center: View Switcher (Overview vs Terminal) */}
        {onToggleView && (
          <div
            className={`flex items-center space-x-1 p-0.5 rounded-lg border font-mono text-xs transition-colors ${
              isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-100 border-stone-200"
            }`}
          >
            <button
              onClick={() => onToggleView("landing")}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition-colors ${
                currentView === "landing"
                  ? "bg-[#FF6B00] text-white font-semibold shadow-xs"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => onToggleView("terminal")}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition-colors ${
                currentView === "terminal"
                  ? "bg-[#FF6B00] text-white font-semibold shadow-xs"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Trading Terminal</span>
            </button>
          </div>
        )}

        {/* Right: Badges, Clock & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 text-xs font-mono">
          {/* Bitget Demo Active Badge */}
          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border text-[11px] font-medium ${
              isDark
                ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-400"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bitget Demo</span>
          </div>

          {/* Qwen 3.8-Max */}
          <div
            className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded border text-[11px] ${
              isDark
                ? "bg-orange-950/30 border-orange-800/40 text-orange-400"
                : "bg-orange-50 border-orange-200 text-orange-700 font-medium"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Qwen 3.8-Max</span>
          </div>

          {/* University Tag */}
          <div
            className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded border text-[11px] ${
              isDark
                ? "bg-[#1A1816] border-stone-800 text-stone-300"
                : "bg-stone-100 border-stone-200 text-stone-700"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
            <span>FUT Minna</span>
          </div>

          {/* UTC Clock */}
          <div
            className={`flex items-center space-x-1.5 pl-1 ${
              isDark ? "text-stone-400" : "text-stone-600 font-medium"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums text-[11px]">{time || "11:30:00 UTC"}</span>
          </div>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center ${
              isDark
                ? "bg-[#1A1816] border-stone-800 text-orange-400 hover:text-white hover:border-orange-500/50"
                : "bg-orange-50 border-orange-200 text-orange-600 hover:text-orange-700 hover:bg-orange-100"
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
