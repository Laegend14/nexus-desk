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
        isDark ? "bg-[#0C0A09] text-[#FAF8F5]" : "bg-[#FDFBF7] text-stone-900"
      }`}
    >
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-12 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono border ${
                isDark
                  ? "bg-[#1A1816] border-stone-800 text-orange-400"
                  : "bg-orange-50 border-orange-200 text-orange-800 font-medium"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>Bitget AI Base Camp S2 • Track 3: AI Trading Desk (Concept 4)</span>
            </div>

            <h1
              className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight font-sans ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              <span className="text-[#FF6B00]">NexusDesk</span>: Dual-Lens Cross-Asset Research Station.
            </h1>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl font-sans ${
                isDark ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Traders today trade both crypto and US equities, but their workflows are fractured across 5 different apps
              (TradingView, Twitter/X, Bloomberg, on-chain scanners). NexusDesk unifies them into a single{" "}
              <strong className="text-[#FF6B00] font-semibold">Dual-Lens Station</strong> powered by{" "}
              <strong className={isDark ? "text-white font-semibold" : "text-stone-900 font-semibold"}>
                Qwen 3.8-Max
              </strong>
              , pre-built{" "}
              <strong className="text-[#FF6B00] font-semibold">bitget-signal</strong> research skills, and live TradingView widgets.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={() => onLaunchTerminal()}
                className="px-5 py-3 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white font-bold flex items-center space-x-2 transition-all shadow-md shadow-orange-500/25 active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Launch Research Station</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("matrix");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-3 rounded-lg border font-medium transition-colors ${
                  isDark
                    ? "bg-[#1A1816] hover:bg-[#241F1A] text-stone-300 border-stone-800"
                    : "bg-white hover:bg-orange-50/50 text-stone-700 border-stone-200/80 shadow-2xs"
                }`}
              >
                <span>View Live Equities ↓</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div
              className={`grid grid-cols-3 gap-4 pt-6 border-t font-mono text-xs ${
                isDark ? "border-stone-800" : "border-orange-100"
              }`}
            >
              <div>
                <div className="text-[10px] uppercase text-stone-400">Trading App Fragmentation</div>
                <div className="text-xl font-bold text-[#FF6B00] mt-0.5">5 → 1 Unified</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-stone-400">Bitget Research Skills</div>
                <div className={`text-xl font-bold mt-0.5 ${isDark ? "text-white" : "text-stone-900"}`}>
                  5 Open Skills
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-stone-400">Execution Speed</div>
                <div
                  className={`text-xl font-bold mt-0.5 ${
                    isDark ? "text-emerald-400" : "text-emerald-700 font-semibold"
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
              className={`rounded-2xl border p-6 space-y-5 transition-all shadow-lg ${
                isDark
                  ? "bg-[#141210] border-stone-800 shadow-stone-950/50"
                  : "bg-white border-orange-200/90 shadow-orange-950/5"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/60">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[#FF6B00]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Dual-Lens Intelligence Grid
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00] font-bold">
                  24/7 Live
                </span>
              </div>

              {/* Feature 1: Natural Language Research Interface */}
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-[#FDFBF7] border-orange-100"
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FF6B00]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Integrated Natural Language Interface</span>
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  Chat with your research station: <em>&quot;Show me NVDA tokenized volume vs native stock and correlate with AI meme-coins.&quot;</em>
                </p>
              </div>

              {/* Feature 2: Pre-Built Bitget Research Skills */}
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-[#FDFBF7] border-orange-100"
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FF6B00]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>5 Pre-Built Bitget Research Skills</span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  Plugs into <strong>bitget-signal</strong> open skills: macro-analyst, market-intel, news-briefing, sentiment-analyst, and technical-analysis.
                </p>
              </div>

              {/* Feature 3: Dynamic Modular Dashboard Grid */}
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-[#FDFBF7] border-orange-100"
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FF6B00]">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Dynamic Dashboard Grid</span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  AI dynamically renders live TradingView charts, institutional ETF net flow trackers, Fear &amp; Greed gauges, and 1-click export to Bitget Playbook.
                </p>
              </div>

              <button
                onClick={() => onLaunchTerminal()}
                className="w-full py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Enter Workstation Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Stock Matrix Section with Official Logos */}
      <section id="matrix" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold mb-1">
              Active Official Coverage
            </h2>
            <h3
              className={`text-2xl sm:text-3xl font-bold font-sans ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              US Equities &amp; 24/7 Tokenized Assets
            </h3>
          </div>
          <p className="text-stone-500 text-xs font-mono mt-2 md:mt-0">
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
                className={`group cursor-pointer rounded-xl border transition-all p-5 flex flex-col justify-between space-y-4 ${
                  isDark
                    ? "bg-[#141210] border-stone-800 hover:border-[#FF6B00] hover:bg-[#1A1816] shadow-sm"
                    : "bg-white border-orange-200/90 hover:border-[#FF6B00] hover:shadow-md shadow-xs"
                }`}
              >
                {/* Official Brand Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StockLogo ticker={ticker} size={36} />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`font-mono font-bold text-base ${
                            isDark ? "text-white" : "text-stone-900"
                          }`}
                        >
                          {ticker}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.2 rounded font-bold">
                          24/7 Live
                        </span>
                      </div>
                      <div
                        className={`text-xs font-sans mt-0.5 truncate max-w-[130px] ${
                          isDark ? "text-stone-400" : "text-stone-500"
                        }`}
                      >
                        {stock.name}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold tabular-nums px-2 py-0.5 rounded ${
                      isPositive
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {gapPct}%
                  </span>
                </div>

                {/* Price Stats */}
                <div
                  className={`grid grid-cols-2 gap-2 pt-3 border-t font-mono text-xs ${
                    isDark ? "border-stone-800/80" : "border-stone-100"
                  }`}
                >
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase block">Native Close</span>
                    <span
                      className={`font-semibold tabular-nums ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      ${friClose.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 text-[10px] uppercase block">Live 24/7 rToken</span>
                    <span className="font-bold text-[#FF6B00] tabular-nums">
                      ${livePrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Correlated Crypto & CTA */}
                <div
                  className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono ${
                    isDark ? "border-stone-800/60 text-stone-400" : "border-stone-100 text-stone-500"
                  }`}
                >
                  <span>Beta: {stock.correlatedCrypto || "BTC / ETH"}</span>
                  <span className="text-[#FF6B00] font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
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
        className={`mt-auto border-t py-8 px-4 sm:px-6 transition-colors duration-200 ${
          isDark
            ? "border-stone-800 bg-[#0A0807] text-stone-500"
            : "border-orange-100 bg-[#F7F4EE] text-stone-600"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6B00]" />
            <span className="font-bold text-[#FF6B00]">NexusDesk Dual-Lens Research Station</span>
            <span>• Bitget Base Camp Season 2</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF6B00]" />
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
