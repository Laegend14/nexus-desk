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
    if (score >= 75)
      return {
        label: "Extreme Greed",
        color: isDark ? "text-emerald-400" : "text-emerald-800",
        bg: isDark ? "bg-emerald-500/20 border-emerald-500/30" : "bg-emerald-100 border-emerald-300",
      };
    if (score >= 55)
      return {
        label: "Greed",
        color: isDark ? "text-emerald-400" : "text-emerald-800",
        bg: isDark ? "bg-emerald-400/20 border-emerald-400/30" : "bg-emerald-100 border-emerald-300",
      };
    if (score >= 45)
      return {
        label: "Neutral",
        color: isDark ? "text-amber-400" : "text-amber-800",
        bg: isDark ? "bg-amber-500/20 border-amber-500/30" : "bg-amber-100 border-amber-300",
      };
    if (score >= 25)
      return {
        label: "Fear",
        color: isDark ? "text-orange-400" : "text-orange-900",
        bg: isDark ? "bg-orange-500/20 border-orange-500/30" : "bg-orange-100 border-orange-300",
      };
    return {
      label: "Extreme Fear",
      color: isDark ? "text-rose-400" : "text-rose-900",
      bg: isDark ? "bg-rose-500/20 border-rose-500/30" : "bg-rose-100 border-rose-300",
    };
  };

  const cryptoSent = getSentimentLabel(cryptoIndex);
  const stockSent = getSentimentLabel(stockIndex);
  const delta = cryptoIndex - stockIndex;

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col font-sans transition-colors duration-200 border ${
        isDark
          ? "bg-[#1E1B18] border-stone-700/80 shadow-xl"
          : "bg-white border-2 border-orange-300 shadow-[0_8px_30px_-6px_rgba(255,107,0,0.15)]"
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? "border-stone-700 bg-[#25211D]" : "border-orange-200 bg-[#FFE9D1]"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <Gauge className="w-5 h-5 text-[#FF6B00]" />
          <h2
            className={`text-base sm:text-lg font-bold tracking-tight ${
              isDark ? "text-white" : "text-stone-950"
            }`}
          >
            Dual Cross-Asset Sentiment Matrix
          </h2>
        </div>
        <span
          className={`text-xs sm:text-sm font-mono px-3 py-1 rounded-md font-bold border ${
            isDark
              ? "bg-[#181512] text-stone-200 border-stone-700"
              : "bg-white text-orange-950 border-orange-300 shadow-2xs"
          }`}
        >
          24/7 Macro Pulse
        </span>
      </div>

      {/* Dual Gauges Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-2 gap-4">
        {/* Crypto Gauge */}
        <div
          className={`p-4 sm:p-5 rounded-xl border-2 flex flex-col items-center text-center ${
            isDark
              ? "bg-[#282420] border-stone-700"
              : "bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EB] border-orange-200"
          }`}
        >
          <div className="flex items-center space-x-1.5 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-mono uppercase tracking-wider mb-2 font-bold">
            <Flame className="w-4 h-4 text-[#F7931A]" />
            <span>Crypto Sentiment</span>
          </div>

          <div className="relative flex items-center justify-center my-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-[#FF6B00]">
              {cryptoIndex}
            </span>
            <span className="text-xs sm:text-sm text-stone-400 font-mono ml-1 font-bold">/100</span>
          </div>

          <span
            className={`text-xs sm:text-sm font-mono font-extrabold px-3.5 py-1 rounded-md mt-1 border ${cryptoSent.bg} ${cryptoSent.color}`}
          >
            {cryptoSent.label}
          </span>

          <div className="w-full bg-stone-200 dark:bg-stone-700/50 rounded-full h-2.5 mt-4 overflow-hidden">
            <div
              className="bg-[#FF6B00] h-2.5 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,107,0,0.6)]"
              style={{ width: `${cryptoIndex}%` }}
            />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-2 font-semibold">
            Bitget Futures &amp; On-Chain Vol
          </span>
        </div>

        {/* US Equity Gauge */}
        <div
          className={`p-4 sm:p-5 rounded-xl border-2 flex flex-col items-center text-center ${
            isDark
              ? "bg-[#282420] border-stone-700"
              : "bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EB] border-orange-200"
          }`}
        >
          <div className="flex items-center space-x-1.5 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-mono uppercase tracking-wider mb-2 font-bold">
            <Sparkles className="w-4 h-4 text-[#0052FF]" />
            <span>US Equities Sentiment</span>
          </div>

          <div className="relative flex items-center justify-center my-1.5">
            <span
              className={`text-4xl sm:text-5xl font-extrabold font-mono tabular-nums ${
                isDark ? "text-white" : "text-stone-950"
              }`}
            >
              {stockIndex}
            </span>
            <span className="text-xs sm:text-sm text-stone-400 font-mono ml-1 font-bold">/100</span>
          </div>

          <span
            className={`text-xs sm:text-sm font-mono font-extrabold px-3.5 py-1 rounded-md mt-1 border ${stockSent.bg} ${stockSent.color}`}
          >
            {stockSent.label}
          </span>

          <div className="w-full bg-stone-200 dark:bg-stone-700/50 rounded-full h-2.5 mt-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              style={{ width: `${stockIndex}%` }}
            />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-2 font-semibold">
            CBOE VIX &amp; Put/Call Ratio
          </span>
        </div>
      </div>

      {/* Cross-Asset Divergence Diagnostic */}
      <div
        className={`p-4 border-t text-sm font-mono flex flex-wrap items-center justify-between gap-2.5 font-bold ${
          isDark
            ? "bg-[#221E1A] border-stone-700 text-stone-200"
            : "bg-[#FFE9D1] border-orange-200 text-stone-900"
        }`}
      >
        <span className="text-xs sm:text-sm uppercase tracking-wide text-stone-600 dark:text-stone-400">
          Divergence Vector:
        </span>
        <span className="text-[#FF6B00] font-extrabold text-sm sm:text-base">
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
