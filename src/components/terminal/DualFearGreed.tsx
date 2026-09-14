"use client";

import React from "react";
import { Gauge, Flame, Sparkles } from "lucide-react";

interface DualFearGreedProps {
  cryptoIndex?: number; // 0 - 100
  stockIndex?: number;  // 0 - 100
  theme?: "light" | "dark";
}

export const DualFearGreed: React.FC<DualFearGreedProps> = ({
  cryptoIndex = 68,
  stockIndex = 64,
  theme = "light",
}) => {
  const isDark = theme === "dark";

  const getSentimentLabel = (score: number) => {
    if (score >= 75) return { label: "Extreme Greed", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (score >= 55) return { label: "Greed", color: "text-emerald-400", bg: "bg-emerald-400/10" };
    if (score >= 45) return { label: "Neutral", color: "text-amber-500", bg: "bg-amber-500/10" };
    if (score >= 25) return { label: "Fear", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Extreme Fear", color: "text-rose-500", bg: "bg-rose-500/10" };
  };

  const cryptoSent = getSentimentLabel(cryptoIndex);
  const stockSent = getSentimentLabel(stockIndex);
  const delta = cryptoIndex - stockIndex;

  return (
    <div
      className={`rounded-xl border overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        isDark ? "bg-[#141210] border-stone-800 shadow-md" : "bg-white border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <Gauge className="w-4 h-4 text-[#FF6B00]" />
          <h2 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
            Dual Cross-Asset Sentiment Matrix
          </h2>
        </div>
        <span
          className={`text-xs font-mono px-2.5 py-1 rounded-md font-bold ${
            isDark ? "bg-stone-800 text-stone-200 border border-stone-700" : "bg-orange-50 text-orange-900 border border-orange-200"
          }`}
        >
          24/7 Macro Pulse
        </span>
      </div>

      {/* Dual Gauges Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Crypto Gauge */}
        <div
          className={`p-4 rounded-xl border flex flex-col items-center text-center ${
            isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-50 border-stone-200"
          }`}
        >
          <div className="flex items-center space-x-1.5 text-stone-400 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
            <Flame className="w-4 h-4 text-[#F7931A]" />
            <span>Crypto Sentiment</span>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[#FF6B00]">
              {cryptoIndex}
            </span>
            <span className="text-xs sm:text-sm text-stone-400 font-mono ml-0.5">/100</span>
          </div>

          <span
            className={`text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-md mt-1 ${cryptoSent.bg} ${cryptoSent.color}`}
          >
            {cryptoSent.label}
          </span>

          <div className="w-full bg-stone-300/40 dark:bg-stone-700/50 rounded-full h-2 mt-3.5 overflow-hidden">
            <div
              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-500"
              style={{ width: `${cryptoIndex}%` }}
            />
          </div>
          <span className="text-xs text-stone-400 font-mono mt-2">Bitget Futures & On-Chain Vol</span>
        </div>

        {/* US Equity Gauge */}
        <div
          className={`p-4 rounded-xl border flex flex-col items-center text-center ${
            isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-50 border-stone-200"
          }`}
        >
          <div className="flex items-center space-x-1.5 text-stone-400 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
            <Sparkles className="w-4 h-4 text-[#0052FF]" />
            <span>US Equities Sentiment</span>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <span className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums ${isDark ? "text-white" : "text-stone-900"}`}>
              {stockIndex}
            </span>
            <span className="text-xs sm:text-sm text-stone-400 font-mono ml-0.5">/100</span>
          </div>

          <span
            className={`text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-md mt-1 ${stockSent.bg} ${stockSent.color}`}
          >
            {stockSent.label}
          </span>

          <div className="w-full bg-stone-300/40 dark:bg-stone-700/50 rounded-full h-2 mt-3.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stockIndex}%` }}
            />
          </div>
          <span className="text-xs text-stone-400 font-mono mt-2">CBOE VIX & Put/Call Ratio</span>
        </div>
      </div>

      {/* Cross-Asset Divergence Diagnostic */}
      <div
        className={`p-3.5 border-t text-xs sm:text-sm font-mono flex flex-wrap items-center justify-between gap-2 ${
          isDark ? "bg-[#0E0C0A] border-stone-800 text-stone-300" : "bg-[#FDFBF7] border-orange-100 text-stone-700"
        }`}
      >
        <span className="text-xs text-stone-400 font-bold uppercase">Divergence Vector:</span>
        <span className="font-bold text-[#FF6B00]">
          {delta > 0
            ? `Crypto leading Equities by +${delta} pts (Risk-On lead)`
            : delta < 0
            ? `Equities leading Crypto by +${Math.abs(delta)} pts (Cash equity preference)`
            : "Perfect Cross-Asset Alignment"}
        </span>
      </div>
    </div>
  );
};
