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
        className={`flex items-center justify-between p-1 rounded-xl border font-mono text-xs sm:text-sm ${
          isDark ? "bg-[#141210] border-stone-800" : "bg-white border-orange-200 shadow-xs"
        }`}
      >
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setActiveTab("TRADINGVIEW")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "TRADINGVIEW"
                ? "bg-[#FF6B00] text-white shadow-xs"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Live TradingView</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("TRAJECTORY")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "TRAJECTORY"
                ? "bg-[#FF6B00] text-white shadow-xs"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Gap Trajectory</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ETF_FLOWS")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "ETF_FLOWS"
                ? "bg-[#FF6B00] text-white shadow-xs"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ETF Net Flows</span>
          </button>
        </div>

        <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 text-stone-400">
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
