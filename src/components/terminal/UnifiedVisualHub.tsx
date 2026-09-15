"use client";

import React, { useState } from "react";
import { TradingViewWidget } from "./TradingViewWidget";
import { StockGapChart } from "./StockGapChart";
import { EtfFlowTracker } from "./EtfFlowTracker";
import { BarChart3, LineChart, Layers } from "lucide-react";

interface UnifiedVisualHubProps {
  ticker: string;
  name: string;
  tradingViewSymbol: string;
  cryptoTradingViewSymbol: string;
  fridayClose: number;
  currentPrice: number;
  gapPercent: number;
  theme?: "light" | "dark";
}

export const UnifiedVisualHub: React.FC<UnifiedVisualHubProps> = ({
  ticker,
  name,
  tradingViewSymbol,
  cryptoTradingViewSymbol,
  fridayClose,
  currentPrice,
  gapPercent,
  theme = "light",
}) => {
  const [activeTab, setActiveTab] = useState<"TRADINGVIEW" | "TRAJECTORY" | "ETF_FLOWS">("TRADINGVIEW");
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Visual Hub Mode Tabs */}
      <div
        className={`flex items-center justify-between p-1.5 rounded-xl border-2 font-mono text-sm sm:text-base ${
          isDark ? "bg-[#1E1B18] border-stone-700/80" : "bg-[#FFE9D1] border-orange-300 shadow-sm"
        }`}
      >
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("TRADINGVIEW")}
            className={`flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-extrabold text-xs sm:text-sm md:text-base transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "TRADINGVIEW"
                ? "bg-[#FF6B00] text-white shadow-sm"
                : isDark
                ? "text-stone-300 hover:text-white hover:bg-stone-800"
                : "text-stone-700 hover:text-stone-950 hover:bg-orange-200/70"
            }`}
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Live TradingView</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("TRAJECTORY")}
            className={`flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-extrabold text-xs sm:text-sm md:text-base transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "TRAJECTORY"
                ? "bg-[#FF6B00] text-white shadow-sm"
                : isDark
                ? "text-stone-300 hover:text-white hover:bg-stone-800"
                : "text-stone-700 hover:text-stone-950 hover:bg-orange-200/70"
            }`}
          >
            <LineChart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Gap Trajectory</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ETF_FLOWS")}
            className={`flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-extrabold text-xs sm:text-sm md:text-base transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "ETF_FLOWS"
                ? "bg-[#FF6B00] text-white shadow-sm"
                : isDark
                ? "text-stone-300 hover:text-white hover:bg-stone-800"
                : "text-stone-700 hover:text-stone-950 hover:bg-orange-200/70"
            }`}
          >
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>ETF Net Flows</span>
          </button>
        </div>

        <span className={`hidden md:inline text-xs sm:text-sm font-mono font-bold px-2.5 py-1 rounded-md ${
          isDark ? "bg-[#25211D] text-stone-300 border border-stone-700" : "bg-orange-100 text-orange-950 border border-orange-200"
        }`}>
          {activeTab === "TRADINGVIEW"
            ? "Dual-Lens View"
            : activeTab === "TRAJECTORY"
            ? "Weekend Curve"
            : "Institutional Liquidity"}
        </span>
      </div>

      {/* Render Active View */}
      {activeTab === "TRADINGVIEW" && (
        <TradingViewWidget
          ticker={ticker}
          name={name}
          tradingViewSymbol={tradingViewSymbol}
          cryptoTradingViewSymbol={cryptoTradingViewSymbol}
          fridayClose={fridayClose}
          currentPrice={currentPrice}
          gapPercent={gapPercent}
          theme={theme}
        />
      )}

      {activeTab === "TRAJECTORY" && (
        <StockGapChart
          ticker={ticker}
          name={name}
          fridayClose={fridayClose}
          rTokenPrice={currentPrice}
          gapPercent={gapPercent}
          theme={theme}
        />
      )}

      {activeTab === "ETF_FLOWS" && <EtfFlowTracker theme={theme} />}
    </div>
  );
};
