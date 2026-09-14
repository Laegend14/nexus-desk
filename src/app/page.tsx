"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { LandingPage } from "@/components/LandingPage";
import { GapRadar } from "@/components/terminal/GapRadar";
import { StockGapChart } from "@/components/terminal/StockGapChart";
import { TradingViewWidget } from "@/components/terminal/TradingViewWidget";
import { EtfFlowTracker } from "@/components/terminal/EtfFlowTracker";
import { DualFearGreed } from "@/components/terminal/DualFearGreed";
import { ResearchDesk } from "@/components/ResearchDesk";
import { InstitutionalTradeTicket } from "@/components/terminal/InstitutionalTradeTicket";
import { Toast } from "@/components/Toast";
import { INITIAL_STOCKS, StockGapData } from "@/services/rTokenService";
import { ResearchResult } from "@/services/qwenService";

export default function Home() {
  const [stocks, setStocks] = useState<StockGapData[]>(INITIAL_STOCKS);
  const [selectedTicker, setSelectedTicker] = useState<string>("NVDA");
  const [activeAnalysis, setActiveAnalysis] = useState<ResearchResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"landing" | "terminal">("landing");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Fetch live gaps from API on mount and on 15s interval for live price updates
  useEffect(() => {
    async function loadGaps() {
      try {
        const res = await fetch("/api/rtoken/gaps");
        const json = await res.json();
        if (json.success && json.data) {
          setStocks(json.data);
        }
      } catch (err) {
        console.error("Failed to load live gaps:", err);
      }
    }
    loadGaps();

    const interval = setInterval(loadGaps, 15000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLaunchTerminal = (ticker?: string) => {
    if (ticker) {
      setSelectedTicker(ticker);
    }
    setCurrentView("terminal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = theme === "dark";
  const activeStock = stocks.find((s) => (s.ticker || s.symbol) === selectedTicker) || stocks[0];
  const tickerKey = activeStock.ticker || activeStock.symbol || "NVDA";
  const friClose = activeStock.fridayClose ?? activeStock.nativeFridayClose ?? 125.75;
  const livePrice = activeStock.rTokenPrice ?? activeStock.currentRTokenPrice ?? 128.45;
  const gapPct = activeStock.gapPercent ?? activeStock.spreadPct ?? 0;
  const tvSymbol = activeStock.tradingViewSymbol || `NASDAQ:${tickerKey}`;
  const cryptoTvSymbol = activeStock.cryptoTradingViewSymbol || "BITGET:BTCUSDT";

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? "bg-[#0C0A09] text-[#FAF8F5]" : "bg-[#FDFBF7] text-stone-900"
      }`}
    >
      {/* Top Header with Seamless View Switcher & Theme Switcher */}
      <Header
        currentView={currentView}
        onToggleView={(v) => setCurrentView(v)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      />

      {/* Main View: Landing Page or MCP-UI Trading Terminal */}
      {currentView === "landing" ? (
        <LandingPage
          stocks={stocks}
          onLaunchTerminal={handleLaunchTerminal}
          theme={theme}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Ticker Tape with Official Logos & Live Prices */}
          <TickerTape
            stocks={stocks}
            selectedTicker={selectedTicker}
            onSelectTicker={(ticker) => setSelectedTicker(ticker)}
            theme={theme}
          />

          {/* 3-Column Institutional Dual-Lens Cockpit */}
          <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column (4 cols): 24/7 Gap Radar & Dual Fear & Greed Matrix */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col space-y-4">
              <GapRadar
                stocks={stocks}
                selectedTicker={selectedTicker}
                onSelectTicker={(ticker) => setSelectedTicker(ticker)}
                theme={theme}
              />

              <DualFearGreed
                cryptoIndex={68}
                stockIndex={64}
                theme={theme}
              />
            </div>

            {/* Center Column (5 cols): Dual-Lens Interactive Chart & Qwen Research Station */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col space-y-4">
              {/* Dynamic Interactive TradingView Chart (Stock vs Crypto Dual-Lens) */}
              <TradingViewWidget
                ticker={tickerKey}
                name={activeStock.name}
                tradingViewSymbol={tvSymbol}
                cryptoTradingViewSymbol={cryptoTvSymbol}
                fridayClose={friClose}
                currentPrice={livePrice}
                gapPercent={gapPct}
                theme={theme}
              />

              {/* Interactive Stock Gap Trajectory Chart */}
              <StockGapChart
                ticker={tickerKey}
                name={activeStock.name}
                fridayClose={friClose}
                rTokenPrice={livePrice}
                gapPercent={gapPct}
                theme={theme}
              />

              {/* Qwen 3.8-Max AI Research Desk with 5 Bitget Research Skills */}
              <ResearchDesk
                selectedTicker={selectedTicker}
                onAnalysisGenerated={(analysis) => {
                  setActiveAnalysis(analysis);
                  showToast(`Synthesized Dual-Lens memo for ${analysis.ticker} via Qwen 3.8-Max`);
                }}
                theme={theme}
              />
            </div>

            {/* Right Column (3 cols): Trade Ticket & Institutional ETF Flow Tracker */}
            <div className="lg:col-span-3 xl:col-span-3 flex flex-col space-y-4">
              <InstitutionalTradeTicket
                ticker={tickerKey}
                name={activeStock.name}
                activeAnalysis={activeAnalysis}
                currentPrice={livePrice}
                onOrderExecuted={(msg) => showToast(msg)}
                theme={theme}
              />

              <EtfFlowTracker theme={theme} />
            </div>
          </main>
        </div>
      )}

      {/* Floating Status Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
