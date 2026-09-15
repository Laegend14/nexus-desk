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
      className={`w-full border-b overflow-hidden relative py-2.5 px-3 sm:px-6 transition-colors duration-200 select-none ${
        isDark ? "border-stone-800 bg-[#1E1B18]" : "border-orange-300 bg-[#FFE9D1]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center">
        {/* Pinned Left Header / Controls */}
        <div
          className={`flex items-center space-x-2 text-xs uppercase tracking-wider font-mono pr-4 mr-3 border-r shrink-0 z-20 ${
            isDark
              ? "border-stone-700 bg-[#1E1B18] text-stone-200"
              : "border-orange-300 bg-[#FFE9D1] text-stone-900 font-bold"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
          <span className="font-extrabold hidden sm:inline">24/7 Ticker</span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Resume ticker movement" : "Pause ticker movement"}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              isDark
                ? "hover:bg-stone-800 text-stone-300 hover:text-white"
                : "hover:bg-orange-200 text-stone-800 hover:text-stone-950"
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Relative Marquee Container with Gradient Edge Fade */}
        <div className="relative flex-1 overflow-hidden">
          {/* Left Fade Mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-r from-[#1E1B18] to-transparent"
                : "bg-gradient-to-r from-[#FFE9D1] to-transparent"
            }`}
          />

          {/* Right Fade Mask */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-l from-[#1E1B18] to-transparent"
                : "bg-gradient-to-l from-[#FFE9D1] to-transparent"
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
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-mono transition-all shrink-0 active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? isDark
                        ? "bg-[#2A241F] border-2 border-[#FF6B00] text-white font-bold shadow-xs"
                        : "bg-white border-2 border-[#FF6B00] text-stone-950 font-extrabold shadow-xs"
                      : isDark
                      ? "bg-[#25211D] hover:bg-[#2F2923] text-stone-200 border border-stone-700/80 hover:border-orange-500/40"
                      : "bg-white/90 hover:bg-white text-stone-900 border border-orange-200 hover:border-orange-400 shadow-2xs font-semibold"
                  }`}
                >
                  <StockLogo ticker={ticker} size={18} />
                  <span className="font-extrabold">{ticker}</span>
                  <span className={`tabular-nums font-bold ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                    ${price.toFixed(2)}
                  </span>
                  <span
                    className={`flex items-center text-xs sm:text-sm tabular-nums font-bold ${
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
                    {isPositive && <TrendingUp className="w-3.5 h-3.5 mr-0.5" />}
                    {isNegative && <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                    {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5 mr-0.5" />}
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
