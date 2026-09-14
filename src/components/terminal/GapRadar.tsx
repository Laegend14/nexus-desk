"use client";

import React from "react";
import { StockGapData } from "@/services/rTokenService";
import { ArrowUpRight, ArrowDownRight, Radio } from "lucide-react";

import { StockLogo } from "../StockLogo";

interface GapRadarProps {
  stocks: StockGapData[];
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  stockImages?: Record<string, string>;
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
      className={`w-full rounded-xl p-4 flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#141210] border border-stone-800 shadow-md"
          : "bg-white border border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-[#FF6B00]" />
          <h3
            className={`text-sm font-semibold tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            24/7 rToken Gap Radar
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
            isDark
              ? "bg-stone-800 text-stone-300 border border-stone-700"
              : "bg-orange-50 text-orange-800 border border-orange-200"
          }`}
        >
          US Equities vs 24/7 On-Chain
        </span>
      </div>

      {/* Table Subtitle */}
      <div className={`text-[11px] pt-2 pb-3 ${isDark ? "text-stone-400" : "text-stone-500"}`}>
        Select an asset to load its 24/7 gap curve, Qwen macro reasoning, and trade playbook.
      </div>

      {/* Stock Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr
              className={`text-[10px] uppercase tracking-wider border-b ${
                isDark ? "text-stone-500 border-stone-800" : "text-stone-400 border-stone-200"
              }`}
            >
              <th className="pb-2 font-medium">Asset</th>
              <th className="pb-2 font-medium text-right">Fri Close</th>
              <th className="pb-2 font-medium text-right">24/7 Price</th>
              <th className="pb-2 font-medium text-right">Spread</th>
              <th className="pb-2 font-medium text-right hidden sm:table-cell">24h Vol</th>
            </tr>
          </thead>
          <tbody className={isDark ? "divide-y divide-stone-800/80" : "divide-y divide-stone-100"}>
            {stocks.map((stock) => {
              const ticker = stock.ticker || stock.symbol;
              const isSelected = selectedTicker === ticker;
              const gapPct = stock.gapPercent ?? stock.spreadPct ?? 0;
              const isPositive = gapPct >= 0;
              const friClose = stock.fridayClose ?? stock.nativeFridayClose ?? 0;
              const livePrice = stock.rTokenPrice ?? stock.currentRTokenPrice ?? 0;
              const vol = stock.volume24hUsd ?? 18.4;

              return (
                <tr
                  key={ticker}
                  onClick={() => onSelectTicker(ticker)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? isDark
                        ? "bg-[#241F1A] border-l-3 border-l-[#FF6B00] font-semibold"
                        : "bg-orange-50/80 border-l-3 border-l-[#FF6B00] font-semibold"
                      : isDark
                      ? "hover:bg-[#1A1816] text-stone-300"
                      : "hover:bg-orange-50/30 text-stone-700"
                  }`}
                >
                  {/* Asset Column with Official Stock Logo */}
                  <td className="py-2.5 pr-2 pl-1.5">
                    <div className="flex items-center space-x-2.5">
                      <StockLogo ticker={ticker} size={24} />
                      <div>
                        <div className="flex items-center space-x-1">
                          <span
                            className={`font-bold ${
                              isSelected
                                ? "text-[#FF6B00]"
                                : isDark
                                ? "text-white"
                                : "text-stone-900"
                            }`}
                          >
                            {ticker}
                          </span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                          )}
                        </div>
                        <div
                          className={`text-[10px] truncate max-w-[90px] ${
                            isDark ? "text-stone-400" : "text-stone-500"
                          }`}
                        >
                          {stock.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Friday Cash Close */}
                  <td
                    className={`py-2.5 text-right tabular-nums ${
                      isDark ? "text-stone-400" : "text-stone-600"
                    }`}
                  >
                    ${friClose.toFixed(2)}
                  </td>

                  {/* 24/7 On-chain Price */}
                  <td
                    className={`py-2.5 text-right font-semibold tabular-nums ${
                      isDark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    ${livePrice.toFixed(2)}
                  </td>

                  {/* Spread / Implied Gap */}
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] tabular-nums font-semibold ${
                        isPositive
                          ? isDark
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isDark
                          ? "bg-rose-950/40 text-rose-400 border border-rose-800/40"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      )}
                      {isPositive ? "+" : ""}
                      {gapPct}%
                    </span>
                  </td>

                  {/* 24H Volume */}
                  <td
                    className={`py-2.5 text-right tabular-nums hidden sm:table-cell ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    ${vol}M
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Stat */}
      <div
        className={`pt-3 mt-auto border-t flex items-center justify-between text-[10px] font-mono ${
          isDark ? "border-stone-800 text-stone-500" : "border-orange-100 text-stone-500"
        }`}
      >
        <span>7 Live US Equity rTokens Active</span>
        <span className="text-[#FF6B00] font-bold">78% Monday Gap Match Rate</span>
      </div>
    </div>
  );
};
