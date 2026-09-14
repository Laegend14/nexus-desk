"use client";

import React, { useState } from "react";
import { StockGapData } from "@/services/rTokenService";
import { TrendingUp, TrendingDown, Minus, Play, Pause } from "lucide-react";
import { StockLogo } from "./StockLogo";

interface TickerTapeProps {
  stocks: StockGapData[];
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  theme?: "light" | "dark";
}

export const TickerTape: React.FC<TickerTapeProps> = ({
  stocks,
  selectedTicker,
  onSelectTicker,
  theme = "light",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const isDark = theme === "dark";

  // Duplicate stocks list twice to enable an infinite continuous seamless marquee loop
  const tickerItems = [...stocks, ...stocks];

  return (
    <div
      className={`w-full border-b overflow-hidden relative py-2 px-3 sm:px-6 transition-colors duration-200 select-none ${
        isDark ? "border-stone-800 bg-[#0E0C0A]" : "border-orange-100 bg-[#FAF7F2]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center">
        {/* Pinned Left Header / Controls */}
        <div
          className={`flex items-center space-x-2 text-[10px] uppercase tracking-wider font-mono pr-4 mr-3 border-r shrink-0 z-20 ${
            isDark
              ? "border-stone-800 bg-[#0E0C0A] text-stone-400"
              : "border-orange-200 bg-[#FAF7F2] text-stone-600 font-semibold"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
          <span className="font-bold hidden sm:inline">24/7 Ticker</span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Resume ticker movement" : "Pause ticker movement"}
            className={`p-1 rounded transition-colors ${
              isDark
                ? "hover:bg-stone-800 text-stone-400 hover:text-white"
                : "hover:bg-orange-100 text-stone-500 hover:text-stone-900"
            }`}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>

        {/* Relative Marquee Container with Gradient Edge Fade */}
        <div className="relative flex-1 overflow-hidden">
          {/* Left Fade Mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-r from-[#0E0C0A] to-transparent"
                : "bg-gradient-to-r from-[#FAF7F2] to-transparent"
            }`}
          />

          {/* Right Fade Mask */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-l from-[#0E0C0A] to-transparent"
                : "bg-gradient-to-l from-[#FAF7F2] to-transparent"
            }`}
          />

          {/* Continuous Infinite Moving Track */}
          <div
            className="animate-ticker space-x-3"
            style={{
              animationPlayState: isPaused ? "paused" : undefined,
            }}
          >
            {tickerItems.map((stock, index) => {
              const ticker = stock.ticker || stock.symbol;
              const isSelected = selectedTicker === ticker;
              const gapPct = stock.gapPercent ?? stock.spreadPct ?? 0;
              const price = stock.rTokenPrice ?? stock.currentRTokenPrice ?? 0;
              const isPositive = gapPct > 0;
              const isNegative = gapPct < 0;

              return (
                <button
                  key={`${ticker}-${index}`}
                  onClick={() => onSelectTicker(ticker)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono transition-all shrink-0 active:scale-[0.98] ${
                    isSelected
                      ? isDark
                        ? "bg-[#241F1A] border border-[#FF6B00] text-white font-semibold shadow-xs"
                        : "bg-white border-2 border-[#FF6B00] text-stone-900 font-bold shadow-xs"
                      : isDark
                      ? "bg-[#161412] hover:bg-[#1F1B17] text-stone-300 border border-stone-800 hover:border-orange-500/40"
                      : "bg-white hover:bg-orange-50/50 text-stone-700 border border-stone-200/80 hover:border-orange-300 shadow-2xs"
                  }`}
                >
                  <StockLogo ticker={ticker} size={15} />
                  <span className="font-bold">{ticker}</span>
                  <span className={`tabular-nums ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                    ${price.toFixed(2)}
                  </span>
                  <span
                    className={`flex items-center text-[11px] tabular-nums font-semibold ${
                      isPositive
                        ? isDark
                          ? "text-emerald-400"
                          : "text-emerald-700"
                        : isNegative
                        ? isDark
                          ? "text-rose-400"
                          : "text-rose-700"
                        : "text-stone-400"
                    }`}
                  >
                    {isPositive && <TrendingUp className="w-3 h-3 mr-0.5" />}
                    {isNegative && <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {!isPositive && !isNegative && <Minus className="w-3 h-3 mr-0.5" />}
                    {isPositive ? `+${gapPct}%` : `${gapPct}%`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
