"use client";

import React from "react";
import { StockGapData } from "@/services/rTokenService";
import { ArrowUpRight, ArrowDownRight, Radio } from "lucide-react";
import { StockLogo } from "./StockLogo";

interface GapRadarProps {
  stocks: StockGapData[];
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  theme?: "light" | "dark";
}

export const GapRadar: React.FC<GapRadarProps> = ({
  stocks,
  selectedTicker,
  onSelectTicker,
  theme = "light",
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden flex flex-col font-sans transition-colors duration-200 border ${
        isDark
          ? "bg-[#1E1B18] border-stone-700/80 shadow-xl"
          : "bg-white border-2 border-orange-300 shadow-[0_8px_30px_-6px_rgba(255,107,0,0.15)]"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 sm:p-4.5 border-b flex items-center justify-between ${
          isDark ? "border-stone-700 bg-[#25211D]" : "border-orange-200 bg-[#FFE9D1]"
        }`}
      >
        <div>
          <div className="flex items-center space-x-2.5">
            <Radio className="w-4 h-4 text-[#FF6B00] animate-pulse" />
            <h2
              className={`text-base sm:text-lg font-bold tracking-tight ${
                isDark ? "text-white" : "text-stone-950"
              }`}
            >
              24/7 rToken Gap Radar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-mono mt-0.5 font-medium">
            US Equities vs 24/7 On-Chain Weekend Trading
          </p>
        </div>
        <span
          className={`text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-lg border ${
            isDark
              ? "bg-[#181512] text-stone-200 border-stone-700"
              : "bg-white text-stone-900 border-orange-300 shadow-2xs"
          }`}
        >
          {stocks.length} Pairs Live
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b text-xs uppercase font-mono tracking-wider font-bold ${
                isDark
                  ? "bg-[#181512] border-stone-700 text-stone-400"
                  : "bg-[#FFF0DF] border-orange-200 text-stone-800"
              }`}
            >
              <th className="py-3 px-4">Asset</th>
              <th className="py-3 px-3 text-right">Fri Close</th>
              <th className="py-3 px-3 text-right">24/7 Price</th>
              <th className="py-3 px-3 text-right">Spread / Gap</th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">24h Vol</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y text-sm font-mono ${
              isDark ? "divide-stone-700/60" : "divide-orange-100"
            }`}
          >
            {stocks.map((stock) => {
              const sym = stock.symbol || stock.ticker;
              const isSelected = selectedTicker === sym;
              const isUp = stock.spreadPct > 0;
              const isDown = stock.spreadPct < 0;

              return (
                <tr
                  key={sym}
                  onClick={() => onSelectTicker(sym)}
                  className={`cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? isDark
                        ? "bg-[#2D2721] text-white border-l-4 border-l-[#FF6B00]"
                        : "bg-orange-100/80 text-stone-950 font-bold border-l-4 border-l-[#FF6B00]"
                      : isDark
                      ? "hover:bg-[#25211D] text-stone-300"
                      : "hover:bg-orange-50/70 text-stone-800"
                  }`}
                >
                  {/* Asset */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <StockLogo ticker={sym} size={22} />
                      <div>
                        <div
                          className={`font-extrabold text-sm sm:text-base tracking-wide ${
                            isDark ? "text-white" : "text-stone-950"
                          }`}
                        >
                          {sym}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 font-sans truncate max-w-[120px] font-medium">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Friday Native Close */}
                  <td className="py-3.5 px-3 text-right tabular-nums text-stone-500 dark:text-stone-400 font-bold">
                    ${stock.nativeFridayClose.toFixed(2)}
                  </td>

                  {/* 24/7 On-Chain Price */}
                  <td
                    className={`py-3.5 px-3 text-right tabular-nums font-bold text-sm sm:text-base ${
                      isDark ? "text-white" : "text-stone-950"
                    }`}
                  >
                    ${stock.currentRTokenPrice.toFixed(2)}
                  </td>

                  {/* Spread / Implied Monday Gap */}
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center justify-end px-2.5 py-1 rounded-md text-xs sm:text-sm tabular-nums font-extrabold ${
                        isUp
                          ? isDark
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : isDown
                          ? isDark
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-stone-500/10 text-stone-400 border border-stone-500/20"
                      }`}
                    >
                      {isUp && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
                      {isDown && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                      {isUp ? `+${stock.spreadPct}%` : `${stock.spreadPct}%`}
                    </span>
                  </td>

                  {/* Volume Depth */}
                  <td className="py-3.5 px-4 text-right tabular-nums text-stone-500 dark:text-stone-400 hidden sm:table-cell text-xs sm:text-sm font-semibold">
                    {stock.volume24h}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info Box */}
      <div
        className={`p-3.5 border-t text-xs sm:text-sm font-mono font-bold flex items-center justify-between ${
          isDark
            ? "bg-[#221E1A] border-stone-700 text-stone-300"
            : "bg-[#FFE9D1] border-orange-200 text-stone-800"
        }`}
      >
        <span>Pricing via On-Chain Oracles</span>
        <span className="text-[#FF6B00] font-extrabold">78% Monday Gap Match Rate</span>
      </div>
    </div>
  );
};
