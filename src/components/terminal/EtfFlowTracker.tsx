"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Layers, ShieldCheck } from "lucide-react";

interface EtfFlowTrackerProps {
  theme?: "light" | "dark";
}

interface EtfItem {
  ticker: string;
  name: string;
  category: "CRYPTO_SPOT" | "TECH_EQUITY";
  flowTodayM: number;
  flow5dM: number;
  aumB: number;
  primaryHoldings: string;
}

const ETF_DATA: EtfItem[] = [
  // Spot Crypto ETFs
  {
    ticker: "IBIT",
    name: "iShares Bitcoin Trust",
    category: "CRYPTO_SPOT",
    flowTodayM: 284.5,
    flow5dM: 1140.8,
    aumB: 32.4,
    primaryHoldings: "BTC (BlackRock Physical Custody)",
  },
  {
    ticker: "FBTC",
    name: "Fidelity Wise Origin Bitcoin",
    category: "CRYPTO_SPOT",
    flowTodayM: 112.0,
    flow5dM: 498.2,
    aumB: 14.8,
    primaryHoldings: "BTC (Fidelity Digital Assets)",
  },
  {
    ticker: "ETHA",
    name: "iShares Ethereum Trust",
    category: "CRYPTO_SPOT",
    flowTodayM: 45.6,
    flow5dM: 182.4,
    aumB: 2.1,
    primaryHoldings: "ETH (Physical Spot Custody)",
  },
  {
    ticker: "ARKB",
    name: "ARK 21Shares Bitcoin ETF",
    category: "CRYPTO_SPOT",
    flowTodayM: -18.2,
    flow5dM: 84.5,
    aumB: 3.9,
    primaryHoldings: "BTC Spot Vault",
  },
  // Tech & US Equity ETFs
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    category: "TECH_EQUITY",
    flowTodayM: 415.0,
    flow5dM: 1820.0,
    aumB: 285.0,
    primaryHoldings: "AAPL, NVDA, MSFT, AMZN",
  },
  {
    ticker: "SMH",
    name: "VanEck Semiconductor ETF",
    category: "TECH_EQUITY",
    flowTodayM: 188.4,
    flow5dM: 742.1,
    aumB: 24.6,
    primaryHoldings: "NVDA, TSM, AVGO, ASML",
  },
  {
    ticker: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    category: "TECH_EQUITY",
    flowTodayM: 620.5,
    flow5dM: 2950.0,
    aumB: 560.0,
    primaryHoldings: "S&P 500 Market Cap Blend",
  },
];

export const EtfFlowTracker: React.FC<EtfFlowTrackerProps> = ({ theme = "light" }) => {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "CRYPTO_SPOT" | "TECH_EQUITY">("ALL");
  const isDark = theme === "dark";

  const filtered = activeCategory === "ALL" ? ETF_DATA : ETF_DATA.filter((e) => e.category === activeCategory);

  const totalCryptoInflowToday = ETF_DATA.filter((e) => e.category === "CRYPTO_SPOT").reduce(
    (acc, curr) => acc + curr.flowTodayM,
    0
  );
  const totalEquityInflowToday = ETF_DATA.filter((e) => e.category === "TECH_EQUITY").reduce(
    (acc, curr) => acc + curr.flowTodayM,
    0
  );

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        isDark ? "bg-[#1E1B18] border-stone-700/80 shadow-md" : "bg-white border-orange-300 shadow-[0_8px_30px_-6px_rgba(255,107,0,0.15)]"
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-4 border-b flex flex-wrap items-center justify-between gap-2 ${
          isDark ? "bg-[#24201D] border-stone-700" : "bg-[#FFE9D1] border-orange-300"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <Layers className="w-5 h-5 text-[#FF6B00]" />
          <h2 className={`text-base sm:text-lg font-extrabold tracking-tight ${isDark ? "text-white" : "text-stone-950"}`}>
            Institutional ETF Net Flow Tracker
          </h2>
        </div>

        {/* Filter Pills */}
        <div
          className={`flex items-center rounded-lg p-0.5 border text-xs sm:text-sm font-mono font-bold ${
            isDark ? "bg-[#181512] border-stone-700" : "bg-white/80 border-orange-300 shadow-2xs"
          }`}
        >
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "ALL"
                ? "bg-[#FF6B00] text-white font-extrabold"
                : isDark
                ? "text-stone-300 hover:text-white"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("CRYPTO_SPOT")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "CRYPTO_SPOT"
                ? "bg-[#FF6B00] text-white font-extrabold"
                : isDark
                ? "text-stone-300 hover:text-white"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            Crypto Spot
          </button>
          <button
            onClick={() => setActiveCategory("TECH_EQUITY")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "TECH_EQUITY"
                ? "bg-[#FF6B00] text-white font-extrabold"
                : isDark
                ? "text-stone-300 hover:text-white"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            Tech Equities
          </button>
        </div>
      </div>

      {/* Cross-Asset Rotation Banner */}
      <div
        className={`p-4 border-b grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono ${
          isDark ? "bg-[#181512] border-stone-700" : "bg-[#FFF4E5] border-orange-200"
        }`}
      >
        <div
          className={`p-3.5 rounded-xl border ${
            isDark ? "bg-[#24201D] border-stone-700" : "bg-white border-2 border-orange-200 shadow-2xs"
          }`}
        >
          <span className={`text-xs uppercase tracking-wider block font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Spot Crypto Inflow (24h)
          </span>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-500 tabular-nums">
              +${totalCryptoInflowToday.toFixed(1)}M
            </span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              IBIT + FBTC Lead
            </span>
          </div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isDark ? "bg-[#24201D] border-stone-700" : "bg-white border-2 border-orange-200 shadow-2xs"
          }`}
        >
          <span className={`text-xs uppercase tracking-wider block font-extrabold ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Tech Equity Inflow (24h)
          </span>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-500 tabular-nums">
              +${totalEquityInflowToday.toFixed(1)}M
            </span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              QQQ + SMH Lead
            </span>
          </div>
        </div>
      </div>

      {/* ETF Table List */}
      <div className="divide-y overflow-y-auto max-h-[300px]">
        {filtered.map((etf) => {
          const isPositive = etf.flowTodayM >= 0;
          return (
            <div
              key={etf.ticker}
              className={`p-3.5 flex items-center justify-between hover:bg-orange-500/10 transition-colors text-xs sm:text-sm font-mono ${
                isDark ? "border-b border-stone-800" : "border-b border-orange-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 shadow-2xs ${
                    etf.category === "CRYPTO_SPOT"
                      ? "bg-[#F7931A]/15 text-[#F7931A] border-2 border-[#F7931A]/30"
                      : "bg-[#0052FF]/15 text-[#0052FF] border-2 border-[#0052FF]/30"
                  }`}
                >
                  {etf.ticker}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-extrabold text-sm sm:text-base ${isDark ? "text-white" : "text-stone-950"}`}>{etf.ticker}</span>
                    <span className={`text-xs font-sans font-medium ${isDark ? "text-stone-400" : "text-stone-600"}`}>{etf.name}</span>
                  </div>
                  <span className={`text-xs block font-sans truncate max-w-[240px] font-normal ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                    {etf.primaryHoldings}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-extrabold text-sm sm:text-base tabular-nums flex items-center justify-end space-x-0.5 ${
                    isPositive ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>
                    {isPositive ? `+$${etf.flowTodayM.toFixed(1)}M` : `-$${Math.abs(etf.flowTodayM).toFixed(1)}M`}
                  </span>
                </div>
                <div className={`text-xs font-bold tabular-nums ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  5D: +${etf.flow5dM.toFixed(1)}M • AUM: ${etf.aumB}B
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
