"use client";

import React from "react";
import { StockGapData } from "@/services/rTokenService";
import { ArrowUpRight, ArrowDownRight, Radio } from "lucide-react";

interface GapRadarProps {
  stocks: StockGapData[];
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
}

export const GapRadar: React.FC<GapRadarProps> = ({
  stocks,
  selectedTicker,
  onSelectTicker,
}) => {
  return (
    <div className="w-full rounded-xl bg-[#0E1017] border border-white/[0.08] overflow-hidden flex flex-col">
      {/* Header (Swiss Minimalist Layout) */}
      <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <h2 className="text-sm font-semibold tracking-tight text-white">
              24/7 rToken Gap Radar
            </h2>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
            US Native Equities vs On-Chain Weekend Trading
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400">
          7 Pairs Live
        </span>
      </div>

      {/* Table (Mirrored from Figma Minimalist Table Rows) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] uppercase font-mono tracking-wider text-zinc-500">
              <th className="py-2.5 px-4 font-normal">Asset</th>
              <th className="py-2.5 px-3 font-normal text-right">Fri Close</th>
              <th className="py-2.5 px-3 font-normal text-right">24/7 Price</th>
              <th className="py-2.5 px-3 font-normal text-right">Spread / Gap</th>
              <th className="py-2.5 px-4 font-normal text-right hidden sm:table-cell">24h Vol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
            {stocks.map((stock) => {
              const isSelected = selectedTicker === stock.symbol;
              const isUp = stock.spreadPct > 0;
              const isDown = stock.spreadPct < 0;

              return (
                <tr
                  key={stock.symbol}
                  onClick={() => onSelectTicker(stock.symbol)}
                  className={`cursor-pointer transition-colors duration-100 ${
                    isSelected
                      ? "bg-white/[0.08] text-white"
                      : "hover:bg-white/[0.03] text-zinc-300"
                  }`}
                >
                  {/* Asset */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-cyan-400" : "bg-transparent"
                        }`}
                      />
                      <div>
                        <div className="font-bold text-white tracking-wide">
                          {stock.symbol}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-sans truncate max-w-[110px]">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Friday Native Close */}
                  <td className="py-3 px-3 text-right tabular-nums text-zinc-400">
                    ${stock.nativeFridayClose.toFixed(2)}
                  </td>

                  {/* 24/7 On-Chain Price */}
                  <td className="py-3 px-3 text-right tabular-nums text-white font-medium">
                    ${stock.currentRTokenPrice.toFixed(2)}
                  </td>

                  {/* Spread / Implied Monday Gap */}
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-flex items-center justify-end px-2 py-0.5 rounded text-[11px] tabular-nums font-semibold ${
                        isUp
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : isDown
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                      }`}
                    >
                      {isUp && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                      {isDown && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {isUp ? `+${stock.spreadPct}%` : `${stock.spreadPct}%`}
                    </span>
                  </td>

                  {/* Volume Depth */}
                  <td className="py-3 px-4 text-right tabular-nums text-zinc-400 hidden sm:table-cell text-[11px]">
                    {stock.volume24h}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 bg-white/[0.02] border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
        <span>Pricing via On-Chain Oracles</span>
        <span className="text-cyan-400">78% Monday Gap Match Rate</span>
      </div>
    </div>
  );
};
