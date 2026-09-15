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
          ? "border-stone-700/80 bg-[#1E1B18]/95 backdrop-blur-md"
          : "border-orange-300 bg-[#FFE9D1]/95 backdrop-blur-md shadow-xs"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Left: Brand & Editorial Identity */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onToggleView && onToggleView("landing")}
            className="flex items-center space-x-2 text-left group cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.8)]" />
            <span
              className={`font-mono font-extrabold tracking-tight text-lg transition-colors ${
                isDark ? "text-white group-hover:text-orange-400" : "text-stone-950 group-hover:text-orange-600"
              }`}
            >
              NEXUS
            </span>
            <span className="text-[#FF6B00] font-mono text-sm font-bold">/ DESK</span>
          </button>

          <span className={`hidden md:inline-block h-5 w-px ${isDark ? "bg-stone-700" : "bg-orange-300"}`} />
          <span
            className={`hidden md:inline-block text-xs font-mono uppercase tracking-wider ${
              isDark ? "text-stone-300 font-bold" : "text-stone-800 font-bold"
            }`}
          >
            24/7 Tokenized Equity Intelligence
          </span>
        </div>

        {/* Center: View Switcher (Overview vs Terminal) */}
        {onToggleView && (
          <div
            className={`flex items-center space-x-1 p-0.5 rounded-lg border font-mono text-sm transition-colors ${
              isDark ? "bg-[#181512] border-stone-700" : "bg-white/80 border-orange-300"
            }`}
          >
            <button
              onClick={() => onToggleView("landing")}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
                currentView === "landing"
                  ? "bg-[#FF6B00] text-white shadow-xs"
                  : isDark
                  ? "text-stone-300 hover:text-white"
                  : "text-stone-800 hover:text-orange-950"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => onToggleView("terminal")}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
                currentView === "terminal"
                  ? "bg-[#FF6B00] text-white shadow-xs"
                  : isDark
                  ? "text-stone-300 hover:text-white"
                  : "text-stone-800 hover:text-orange-950"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Trading Terminal</span>
            </button>
          </div>
        )}

        {/* Right: Badges, Clock & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 text-xs sm:text-sm font-mono">
          {/* Bitget Demo Active Badge */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md border text-xs sm:text-sm font-bold ${
              isDark
                ? "bg-emerald-950/40 border-emerald-700/50 text-emerald-300"
                : "bg-emerald-100/90 border-emerald-300 text-emerald-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Bitget Demo</span>
          </div>

          {/* Qwen 3.8-Max */}
          <div
            className={`hidden xl:flex items-center space-x-1.5 px-3 py-1 rounded-md border text-xs sm:text-sm font-bold ${
              isDark
                ? "bg-[#25211D] border-stone-700 text-stone-200"
                : "bg-white border-orange-300 text-stone-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <span>Qwen 3.8-Max</span>
          </div>

          {/* Clock */}
          <div
            className={`hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-md border text-xs sm:text-sm font-bold tabular-nums ${
              isDark
                ? "bg-[#25211D] border-stone-700 text-stone-300"
                : "bg-white border-orange-300 text-stone-800"
            }`}
          >
            <Clock className="w-4 h-4 text-[#FF6B00]" />
            <span>{time}</span>
          </div>

          {/* Theme Switcher Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? "bg-[#25211D] border-stone-700 text-[#FF6B00] hover:bg-[#2F2A25]"
                : "bg-white border-orange-300 text-[#FF6B00] hover:bg-orange-100/70 shadow-2xs"
            }`}
            title={`Switch to ${isDark ? "Light (Radiant Orange)" : "Dark"} mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#FF6B00]" /> : <Moon className="w-4 h-4 text-[#FF6B00]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
