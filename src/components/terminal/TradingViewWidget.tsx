"use client";

import React, { useState, useEffect, useRef } from "react";
import { StockLogo } from "../StockLogo";
import { ArrowLeftRight, ExternalLink, Maximize2, RefreshCw } from "lucide-react";

interface TradingViewWidgetProps {
  ticker: string;
  name: string;
  tradingViewSymbol: string;
  cryptoTradingViewSymbol: string;
  fridayClose: number;
  currentPrice: number;
  gapPercent: number;
  theme?: "light" | "dark";
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  ticker,
  name,
  tradingViewSymbol,
  cryptoTradingViewSymbol,
  fridayClose,
  currentPrice,
  gapPercent,
  theme = "light",
}) => {
  const [activeLens, setActiveLens] = useState<"STOCK" | "CRYPTO">("STOCK");
  const [timeframe, setTimeframe] = useState<"15" | "60" | "240" | "D">("60");
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const currentSymbol = activeLens === "STOCK" ? tradingViewSymbol : cryptoTradingViewSymbol;

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).TradingView !== "undefined" && containerRef.current) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: currentSymbol,
          interval: timeframe,
          timezone: "America/New_York",
          theme: isDark ? "dark" : "light",
          style: "1",
          locale: "en",
          toolbar_bg: isDark ? "#141210" : "#FFFFFF",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"],
        });
      }
    };

    containerRef.current.appendChild(script);
  }, [currentSymbol, timeframe, isDark]);

  return (
    <div
      className={`rounded-xl border overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#141210] border-stone-800 shadow-md"
          : "bg-white border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Top Header & Dual-Lens Switcher */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-3">
          <StockLogo ticker={activeLens === "STOCK" ? ticker : "BTC"} size={26} />
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-bold tracking-tight ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {activeLens === "STOCK" ? ticker : cryptoTradingViewSymbol.replace("BITGET:", "")}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 font-bold">
                {activeLens === "STOCK" ? "US Equity Lens" : "Correlated Crypto Lens"}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-mono">
              {activeLens === "STOCK" ? name : "Bitget UTA 24/7 Futures Anchor"}
            </p>
          </div>
        </div>

        {/* Dual Lens Switcher Pill & Timeframes */}
        <div className="flex items-center space-x-2">
          {/* Dual Lens Button */}
          <button
            onClick={() => setActiveLens((prev) => (prev === "STOCK" ? "CRYPTO" : "STOCK"))}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border shadow-xs ${
              activeLens === "STOCK"
                ? "bg-[#FF6B00] text-white border-[#FF6B00] hover:bg-[#EA580C]"
                : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500"
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Switch to {activeLens === "STOCK" ? "Crypto" : "Stock"} Lens</span>
          </button>

          {/* Timeframe selector */}
          <div
            className={`hidden sm:flex items-center rounded-lg p-0.5 border text-[11px] font-mono ${
              isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-100 border-stone-200"
            }`}
          >
            {(["15", "60", "240", "D"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  timeframe === tf
                    ? "bg-[#FF6B00] text-white font-bold"
                    : isDark
                    ? "text-stone-400 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tf === "D" ? "1D" : `${tf}m`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div
        className={`px-4 py-2 border-b flex items-center justify-between text-xs font-mono ${
          isDark ? "bg-[#0E0C0A] border-stone-800" : "bg-[#FDFBF7] border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Native Close</span>
            <span className={`font-semibold tabular-nums ${isDark ? "text-stone-300" : "text-stone-800"}`}>
              ${fridayClose.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Live 24/7 rToken</span>
            <span className="font-bold tabular-nums text-[#FF6B00]">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase block">Cross-Market Gap</span>
            <span
              className={`font-bold tabular-nums ${
                gapPercent >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {gapPercent >= 0 ? `+${gapPercent.toFixed(2)}%` : `${gapPercent.toFixed(2)}%`}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
            Live Dual-Lens Feed
          </span>
        </div>
      </div>

      {/* Embedded TradingView Chart Container */}
      <div className="relative w-full h-[380px] bg-black/5">
        <div
          id={`tradingview_nexus_${ticker}_${activeLens}`}
          ref={containerRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
