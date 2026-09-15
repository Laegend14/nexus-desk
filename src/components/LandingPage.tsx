"use client";

import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  GraduationCap,
  Clock,
  ExternalLink,
  Cpu,
  BarChart2,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { StockGapData } from "@/services/rTokenService";
import { StockLogo } from "./StockLogo";

interface LandingPageProps {
  stocks: StockGapData[];
  stockImages?: Record<string, string>;
  onLaunchTerminal: (ticker?: string) => void;
  theme?: "light" | "dark";
}

export const LandingPage: React.FC<LandingPageProps> = ({
  stocks,
  onLaunchTerminal,
  theme = "light",
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#191613] text-[#FAF8F5]"
          : "bg-[#FFF5EA] text-stone-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200/50 via-[#FFF6EC] to-[#FFEDD5]"
      }`}
    >
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-12 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <h1
              className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight font-sans ${
                isDark ? "text-white" : "text-stone-950"
              }`}
            >
              <span className="text-[#FF6B00]">NexusDesk</span>: Dual-Lens Cross-Asset Research Station.
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-medium ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              Traders today trade both crypto and US equities, but their workflows are fractured across 5 different apps
              (TradingView, Twitter/X, Bloomberg, on-chain scanners). NexusDesk unifies them into a single{" "}
              <strong className="text-[#FF6B00] font-extrabold">Dual-Lens Station</strong> powered by{" "}
              <strong className={isDark ? "text-white font-extrabold" : "text-stone-950 font-extrabold"}>
                Qwen 3.8-Max
              </strong>
              , pre-built{" "}
              <strong className="text-[#FF6B00] font-extrabold">bitget-signal</strong> research skills, and live TradingView widgets.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2 font-mono text-sm">
              <button
                onClick={() => onLaunchTerminal()}
                className="px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white font-extrabold flex items-center space-x-2 transition-all shadow-lg shadow-orange-500/30 active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Launch Research Station</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("matrix");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-6 py-3.5 rounded-xl border-2 font-extrabold transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#25211D] hover:bg-[#2C2723] text-stone-200 border-stone-700"
                    : "bg-white hover:bg-orange-100 text-stone-900 border-orange-300 shadow-sm"
                }`}
              >
                <span>View Live Equities ↓</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div
              className={`grid grid-cols-3 gap-4 pt-6 border-t font-mono ${
                isDark ? "border-stone-700" : "border-orange-300"
              }`}
            >
              <div>
                <div className={`text-xs uppercase font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  App Fragmentation
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6B00] mt-1">
                  5 → 1 Unified
                </div>
              </div>
              <div>
                <div className={`text-xs uppercase font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  Bitget Research
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isDark ? "text-white" : "text-stone-950"}`}>
                  5 Open Skills
                </div>
              </div>
              <div>
                <div className={`text-xs uppercase font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  Execution Speed
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                    isDark ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  UTA v3 Instant
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dual-Lens Feature Preview Card */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-2xl border-2 p-6 space-y-5 transition-all shadow-xl ${
                isDark
                  ? "bg-[#1E1B18] border-stone-700/80 shadow-stone-950/50"
                  : "bg-white border-orange-300 shadow-[0_12px_36px_-6px_rgba(255,107,0,0.18)]"
              }`}
            >
              <div className={`flex items-center justify-between pb-3.5 border-b ${isDark ? "border-stone-700" : "border-orange-200"}`}>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-[#FF6B00]" />
                  <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    Dual-Lens Intelligence Grid
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] font-extrabold border border-[#FF6B00]/30">
                  24/7 Live
                </span>
              </div>

              {/* Feature 1: Natural Language Research Interface */}
              <div
                className={`p-4 rounded-xl border-2 space-y-1.5 ${
                  isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-r from-orange-100 to-amber-50/80 border-orange-200"
                }`}
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base font-mono font-extrabold text-[#FF6B00]">
                  <Sparkles className="w-4 h-4" />
                  <span>Integrated Natural Language Interface</span>
                </div>
                <p className={`text-xs sm:text-sm font-mono font-medium ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                  Chat with your research station: <em>&quot;Show me NVDA tokenized volume vs native stock and correlate with AI meme-coins.&quot;</em>
                </p>
              </div>

              {/* Feature 2: Pre-Built Bitget Research Skills */}
              <div
                className={`p-4 rounded-xl border-2 space-y-1.5 ${
                  isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-r from-orange-100 to-amber-50/80 border-orange-200"
                }`}
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base font-mono font-extrabold text-[#FF6B00]">
                  <Layers className="w-4 h-4" />
                  <span>5 Pre-Built Bitget Research Skills</span>
                </div>
                <p className={`text-xs sm:text-sm font-sans font-medium ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                  Plugs into <strong>bitget-signal</strong> open skills: macro-analyst, market-intel, news-briefing, sentiment-analyst, and technical-analysis.
                </p>
              </div>

              {/* Feature 3: Dynamic Modular Dashboard Grid */}
              <div
                className={`p-4 rounded-xl border-2 space-y-1.5 ${
                  isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-r from-orange-100 to-amber-50/80 border-orange-200"
                }`}
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base font-mono font-extrabold text-[#FF6B00]">
                  <BarChart2 className="w-4 h-4" />
                  <span>Dynamic Dashboard Grid</span>
                </div>
                <p className={`text-xs sm:text-sm font-sans font-medium ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                  AI dynamically renders live TradingView charts, institutional ETF net flow trackers, Fear &amp; Greed gauges, and 1-click export to Bitget Playbook.
                </p>
              </div>

              <button
                onClick={() => onLaunchTerminal()}
                className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white font-mono text-sm font-extrabold transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-[0.98]"
              >
                <span>Enter Workstation Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Stock Matrix Section with Official Logos */}
      <section id="matrix" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FF6B00] font-extrabold mb-1">
              Active Official Coverage
            </h2>
            <h3
              className={`text-2xl sm:text-4xl font-extrabold font-sans ${
                isDark ? "text-white" : "text-stone-950"
              }`}
            >
              US Equities &amp; 24/7 Tokenized Assets
            </h3>
          </div>
          <p className={`text-xs sm:text-sm font-mono mt-2 md:mt-0 font-bold ${isDark ? "text-stone-400" : "text-stone-700"}`}>
            Live prices &amp; official brand vector logos • Click to inspect cross-asset beta
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stocks.map((stock) => {
            const ticker = stock.ticker || stock.symbol || "NVDA";
            const gapPct = stock.gapPercent ?? stock.spreadPct ?? 0;
            const isPositive = gapPct >= 0;
            const friClose = stock.fridayClose ?? stock.nativeFridayClose ?? 125.75;
            const livePrice = stock.rTokenPrice ?? stock.currentRTokenPrice ?? 128.45;

            return (
              <div
                key={ticker}
                onClick={() => onLaunchTerminal(ticker)}
                className={`group cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between space-y-4 ${
                  isDark
                    ? "bg-[#1E1B18] border-stone-700/80 hover:border-[#FF6B00] hover:bg-[#25211D] shadow-sm"
                    : "bg-white border-orange-300 hover:border-[#FF6B00] hover:shadow-xl shadow-[0_4px_20px_-4px_rgba(255,107,0,0.12)]"
                }`}
              >
                {/* Official Brand Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StockLogo ticker={ticker} size={40} />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`font-mono font-extrabold text-lg sm:text-xl ${
                            isDark ? "text-white" : "text-stone-950"
                          }`}
                        >
                          {ticker}
                        </span>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded font-extrabold border border-emerald-500/30">
                          24/7 Live
                        </span>
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-sans mt-0.5 truncate max-w-[130px] font-medium ${
                          isDark ? "text-stone-400" : "text-stone-600"
                        }`}
                      >
                        {stock.name}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-mono font-extrabold tabular-nums px-2.5 py-1 rounded-md ${
                      isPositive
                        ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-600 border border-rose-500/30"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {gapPct}%
                  </span>
                </div>

                {/* Price Stats */}
                <div
                  className={`grid grid-cols-2 gap-2 pt-3 border-t font-mono text-xs sm:text-sm ${
                    isDark ? "border-stone-700" : "border-orange-200"
                  }`}
                >
                  <div>
                    <span className={`text-xs uppercase block font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                      Native Close
                    </span>
                    <span
                      className={`font-extrabold tabular-nums text-base sm:text-lg ${
                        isDark ? "text-stone-200" : "text-stone-800"
                      }`}
                    >
                      ${friClose.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs uppercase block font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                      Live 24/7 rToken
                    </span>
                    <span className="font-extrabold text-[#FF6B00] tabular-nums text-base sm:text-lg">
                      ${livePrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Correlated Crypto & CTA */}
                <div
                  className={`pt-2.5 border-t flex items-center justify-between text-xs sm:text-sm font-mono ${
                    isDark ? "border-stone-700 text-stone-300" : "border-orange-200 text-stone-700 font-medium"
                  }`}
                >
                  <span>Beta: {stock.correlatedCrypto || "BTC / ETH"}</span>
                  <span className="text-[#FF6B00] font-extrabold group-hover:translate-x-1 transition-transform flex items-center">
                    Inspect →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`mt-auto border-t-2 py-8 px-4 sm:px-6 transition-colors duration-200 ${
          isDark
            ? "border-stone-800 bg-[#161412] text-stone-300"
            : "border-orange-300 bg-[#FFE9D1] text-stone-900"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-sm font-bold">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#FF6B00]" />
            <span className="font-extrabold text-[#FF6B00]">NexusDesk Dual-Lens Research Station</span>
            <span>• Bitget Base Camp Season 2</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
              <span>Federal University of Technology Minna</span>
            </span>
            <span>•</span>
            <span>Qwen 3.8-Max • UTA v3</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
