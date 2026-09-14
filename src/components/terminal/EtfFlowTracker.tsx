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
      className={`rounded-xl border overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        isDark ? "bg-[#141210] border-stone-800 shadow-md" : "bg-white border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-4 border-b flex flex-wrap items-center justify-between gap-2 ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <Layers className="w-4 h-4 text-[#FF6B00]" />
          <h2 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
            Institutional ETF Net Flow Tracker
          </h2>
        </div>

        {/* Filter Pills */}
        <div
          className={`flex items-center rounded-lg p-0.5 border text-xs font-mono ${
            isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-100 border-stone-200"
          }`}
        >
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "ALL"
                ? "bg-[#FF6B00] text-white font-bold"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("CRYPTO_SPOT")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "CRYPTO_SPOT"
                ? "bg-[#FF6B00] text-white font-bold"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Crypto Spot
          </button>
          <button
            onClick={() => setActiveCategory("TECH_EQUITY")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeCategory === "TECH_EQUITY"
                ? "bg-[#FF6B00] text-white font-bold"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Tech Equities
          </button>
        </div>
      </div>

      {/* Cross-Asset Rotation Banner */}
      <div
        className={`p-3.5 border-b grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono ${
          isDark ? "bg-[#0E0C0A] border-stone-800" : "bg-orange-50/40 border-orange-100"
        }`}
      >
        <div
          className={`p-3 rounded-lg border ${
            isDark ? "bg-[#161412] border-stone-800" : "bg-white border-orange-200/60"
          }`}
        >
          <span className="text-xs text-stone-400 uppercase tracking-wider block font-bold">Spot Crypto Inflow (24h)</span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-base sm:text-lg font-bold text-emerald-500 tabular-nums">
              +${totalCryptoInflowToday.toFixed(1)}M
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              IBIT + FBTC Lead
            </span>
          </div>
        </div>

        <div
          className={`p-3 rounded-lg border ${
            isDark ? "bg-[#161412] border-stone-800" : "bg-white border-orange-200/60"
          }`}
        >
          <span className="text-xs text-stone-400 uppercase tracking-wider block font-bold">Tech Equity Inflow (24h)</span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-base sm:text-lg font-bold text-emerald-500 tabular-nums">
              +${totalEquityInflowToday.toFixed(1)}M
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1 rounded">
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
              className={`p-3 flex items-center justify-between hover:bg-orange-500/5 transition-colors text-xs font-mono ${
                isDark ? "divide-stone-800" : "divide-stone-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    etf.category === "CRYPTO_SPOT"
                      ? "bg-[#F7931A]/10 text-[#F7931A] border border-[#F7931A]/20"
                      : "bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20"
                  }`}
                >
                  {etf.ticker}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`font-bold ${isDark ? "text-white" : "text-stone-900"}`}>{etf.ticker}</span>
                    <span className="text-[10px] text-stone-400 font-sans">{etf.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block font-sans truncate max-w-[200px]">
                    {etf.primaryHoldings}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold tabular-nums flex items-center justify-end space-x-0.5 ${
                    isPositive ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>
                    {isPositive ? `+$${etf.flowTodayM.toFixed(1)}M` : `-$${Math.abs(etf.flowTodayM).toFixed(1)}M`}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 tabular-nums">
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
