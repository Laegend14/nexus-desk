"use client";

import React from "react";
import { StockGapData } from "@/services/rTokenService";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full border-b overflow-x-auto no-scrollbar py-2 px-4 sm:px-6 transition-colors duration-200 ${
        isDark
          ? "border-stone-800 bg-[#0E0C0A]"
          : "border-orange-100 bg-[#FAF7F2]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center space-x-6 min-w-max">
        <div
          className={`flex items-center space-x-2 text-[10px] uppercase tracking-wider font-mono pr-3 border-r ${
            isDark ? "border-stone-800 text-stone-400" : "border-orange-200 text-stone-600 font-semibold"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
          <span>24/7 Equity Tape</span>
        </div>

        <div className="flex items-center space-x-2">
          {stocks.map((stock) => {
            const ticker = stock.ticker || stock.symbol;
            const isSelected = selectedTicker === ticker;
            const gapPct = stock.gapPercent ?? stock.spreadPct ?? 0;
            const price = stock.rTokenPrice ?? stock.currentRTokenPrice ?? 0;
            const isPositive = gapPct > 0;
            const isNegative = gapPct < 0;

            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono transition-all active:scale-[0.98] ${
                  isSelected
                    ? isDark
                      ? "bg-[#241F1A] border border-[#FF6B00] text-white font-semibold shadow-xs"
                      : "bg-white border-2 border-[#FF6B00] text-stone-900 font-bold shadow-xs"
                    : isDark
                    ? "bg-[#161412] hover:bg-[#1F1B17] text-stone-300 border border-stone-800"
                    : "bg-white hover:bg-orange-50/50 text-stone-700 border border-stone-200/80 shadow-2xs"
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
  );
};
