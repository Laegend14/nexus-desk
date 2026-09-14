"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TickerTape } from "@/components/TickerTape";
import { LandingPage } from "@/components/LandingPage";
import { GapRadar } from "@/components/terminal/GapRadar";
import { UnifiedVisualHub } from "@/components/terminal/UnifiedVisualHub";
import { DualFearGreed } from "@/components/terminal/DualFearGreed";
import { ResearchDesk } from "@/components/ResearchDesk";
import { InstitutionalTradeTicket } from "@/components/terminal/InstitutionalTradeTicket";
import { Toast } from "@/components/Toast";
import { INITIAL_STOCKS, StockGapData } from "@/services/rTokenService";
import { ResearchResult } from "@/services/qwenService";
import {
  Brain,
  BarChart3,
  Radio,
  Briefcase,
  Gauge,
  Columns,
  Maximize2,
} from "lucide-react";

export default function Home() {
  const [stocks, setStocks] = useState<StockGapData[]>(INITIAL_STOCKS);
  const [selectedTicker, setSelectedTicker] = useState<string>("NVDA");
  const [activeAnalysis, setActiveAnalysis] = useState<ResearchResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"landing" | "terminal">("landing");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Mobile navigation active tab ("ai" | "chart" | "radar" | "ticket" | "sentiment")
  const [mobileTab, setMobileTab] = useState<"ai" | "chart" | "radar" | "ticket" | "sentiment">("ai");

  // Desktop workstation layout mode ("split" | "ai_focus" | "chart_focus")
  const [desktopLayout, setDesktopLayout] = useState<"split" | "ai_focus" | "chart_focus">("split");

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
          {/* Continuous Ticker Tape with Official Logos & Live Prices */}
          <TickerTape
            stocks={stocks}
            selectedTicker={selectedTicker}
            onSelectTicker={(ticker) => setSelectedTicker(ticker)}
            theme={theme}
          />

          {/* Desktop Workstation Sub-Header Toolbar (Layout Switcher) */}
          <div
            className={`hidden lg:flex items-center justify-between px-6 py-2 border-b text-xs font-mono transition-colors ${
              isDark ? "bg-[#0E0C0A] border-stone-800 text-stone-400" : "bg-[#FAF7F2] border-orange-100 text-stone-600"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="font-bold text-stone-300 dark:text-stone-300 uppercase tracking-wider">
                Workstation Layout:
              </span>
              <div
                className={`flex items-center space-x-1 p-0.5 rounded-lg border ${
                  isDark ? "bg-[#181614] border-stone-800" : "bg-white border-stone-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setDesktopLayout("split")}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    desktopLayout === "split"
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : isDark
                      ? "text-stone-400 hover:text-white"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Dual-Lens Split (Chart + AI Desk)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDesktopLayout("ai_focus")}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    desktopLayout === "ai_focus"
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : isDark
                      ? "text-stone-400 hover:text-white"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>AI Research Desk Focus</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDesktopLayout("chart_focus")}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    desktopLayout === "chart_focus"
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : isDark
                      ? "text-stone-400 hover:text-white"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Chart &amp; Execution Focus</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 text-emerald-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Feed Synced</span>
              </span>
              <span>•</span>
              <span className="font-semibold text-[#FF6B00]">Active Asset: {tickerKey}</span>
            </div>
          </div>

          {/* Sticky Mobile Segmented View Control (Screens < 1024px) */}
          <div
            className={`lg:hidden sticky top-14 z-30 px-3 py-2 border-b backdrop-blur-md flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5 text-xs font-mono ${
              isDark ? "bg-[#12100E]/95 border-stone-800" : "bg-white/95 border-orange-200 shadow-xs"
            }`}
          >
            <button
              type="button"
              onClick={() => setMobileTab("ai")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                mobileTab === "ai"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : isDark
                  ? "bg-stone-900 text-stone-300 border border-stone-800"
                  : "bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>💬 AI Desk</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("chart")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                mobileTab === "chart"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : isDark
                  ? "bg-stone-900 text-stone-300 border border-stone-800"
                  : "bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>📈 Chart</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("radar")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                mobileTab === "radar"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : isDark
                  ? "bg-stone-900 text-stone-300 border border-stone-800"
                  : "bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>🎯 Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("ticket")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                mobileTab === "ticket"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : isDark
                  ? "bg-stone-900 text-stone-300 border border-stone-800"
                  : "bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>💼 Ticket</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("sentiment")}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                mobileTab === "sentiment"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : isDark
                  ? "bg-stone-900 text-stone-300 border border-stone-800"
                  : "bg-stone-100 text-stone-700 border border-stone-200"
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>🌊 Pulse</span>
            </button>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 lg:p-6">
            {/* MOBILE VIEW (< 1024px): Renders only the selected tab with zero-scroll ergonomics */}
            <div className="lg:hidden flex flex-col space-y-4">
              {mobileTab === "ai" && (
                <ResearchDesk
                  selectedTicker={selectedTicker}
                  onAnalysisGenerated={(analysis) => {
                    setActiveAnalysis(analysis);
                    showToast(`Synthesized Dual-Lens memo for ${analysis.ticker} via Qwen 3.8-Max`);
                  }}
                  theme={theme}
                />
              )}

              {mobileTab === "chart" && (
                <UnifiedVisualHub
                  ticker={tickerKey}
                  name={activeStock.name}
                  tradingViewSymbol={tvSymbol}
                  cryptoTradingViewSymbol={cryptoTvSymbol}
                  fridayClose={friClose}
                  currentPrice={livePrice}
                  gapPercent={gapPct}
                  theme={theme}
                />
              )}

              {mobileTab === "radar" && (
                <div className="flex flex-col space-y-4">
                  <GapRadar
                    stocks={stocks}
                    selectedTicker={selectedTicker}
                    onSelectTicker={(ticker) => {
                      setSelectedTicker(ticker);
                      setMobileTab("chart");
                    }}
                    theme={theme}
                  />
                  <DualFearGreed cryptoIndex={68} stockIndex={64} theme={theme} />
                </div>
              )}

              {mobileTab === "ticket" && (
                <InstitutionalTradeTicket
                  ticker={tickerKey}
                  name={activeStock.name}
                  activeAnalysis={activeAnalysis}
                  currentPrice={livePrice}
                  onOrderExecuted={(msg) => showToast(msg)}
                  theme={theme}
                />
              )}

              {mobileTab === "sentiment" && (
                <div className="flex flex-col space-y-4">
                  <DualFearGreed cryptoIndex={68} stockIndex={64} theme={theme} />
                </div>
              )}
            </div>

            {/* DESKTOP WORKSTATION (>= 1024px): High-Efficiency Multi-Column Layout */}
            <div className="hidden lg:block">
              {desktopLayout === "split" && (
                <div className="grid grid-cols-12 gap-5 items-start">
                  {/* Left Column (3 cols): Asset Radar & Sentiment Matrix */}
                  <div className="col-span-3 flex flex-col space-y-4">
                    <GapRadar
                      stocks={stocks}
                      selectedTicker={selectedTicker}
                      onSelectTicker={(ticker) => setSelectedTicker(ticker)}
                      theme={theme}
                    />

                    <DualFearGreed cryptoIndex={68} stockIndex={64} theme={theme} />
                  </div>

                  {/* Center Column (5 cols): Unified Visual Hub & Institutional Trade Ticket */}
                  <div className="col-span-5 flex flex-col space-y-4">
                    <UnifiedVisualHub
                      ticker={tickerKey}
                      name={activeStock.name}
                      tradingViewSymbol={tvSymbol}
                      cryptoTradingViewSymbol={cryptoTvSymbol}
                      fridayClose={friClose}
                      currentPrice={livePrice}
                      gapPercent={gapPct}
                      theme={theme}
                    />

                    <InstitutionalTradeTicket
                      ticker={tickerKey}
                      name={activeStock.name}
                      activeAnalysis={activeAnalysis}
                      currentPrice={livePrice}
                      onOrderExecuted={(msg) => showToast(msg)}
                      theme={theme}
                    />
                  </div>

                  {/* Right Column (4 cols): AI Research Desk ALWAYS PROMINENT AT TOP (0 Scrolling) */}
                  <div className="col-span-4 flex flex-col space-y-4">
                    <ResearchDesk
                      selectedTicker={selectedTicker}
                      onAnalysisGenerated={(analysis) => {
                        setActiveAnalysis(analysis);
                        showToast(`Synthesized Dual-Lens memo for ${analysis.ticker} via Qwen 3.8-Max`);
                      }}
                      theme={theme}
                    />
                  </div>
                </div>
              )}

              {desktopLayout === "ai_focus" && (
                <div className="grid grid-cols-12 gap-5 items-start">
                  {/* Left (4 cols): Chart & Radar */}
                  <div className="col-span-4 flex flex-col space-y-4">
                    <UnifiedVisualHub
                      ticker={tickerKey}
                      name={activeStock.name}
                      tradingViewSymbol={tvSymbol}
                      cryptoTradingViewSymbol={cryptoTvSymbol}
                      fridayClose={friClose}
                      currentPrice={livePrice}
                      gapPercent={gapPct}
                      theme={theme}
                    />
                    <GapRadar
                      stocks={stocks}
                      selectedTicker={selectedTicker}
                      onSelectTicker={(ticker) => setSelectedTicker(ticker)}
                      theme={theme}
                    />
                  </div>

                  {/* Right (8 cols): AI Research Desk Takes Center Stage */}
                  <div className="col-span-8 flex flex-col space-y-4">
                    <ResearchDesk
                      selectedTicker={selectedTicker}
                      onAnalysisGenerated={(analysis) => {
                        setActiveAnalysis(analysis);
                        showToast(`Synthesized Dual-Lens memo for ${analysis.ticker} via Qwen 3.8-Max`);
                      }}
                      theme={theme}
                    />
                  </div>
                </div>
              )}

              {desktopLayout === "chart_focus" && (
                <div className="grid grid-cols-12 gap-5 items-start">
                  {/* Left (8 cols): Large Chart Hub & Execution Ticket */}
                  <div className="col-span-8 flex flex-col space-y-4">
                    <UnifiedVisualHub
                      ticker={tickerKey}
                      name={activeStock.name}
                      tradingViewSymbol={tvSymbol}
                      cryptoTradingViewSymbol={cryptoTvSymbol}
                      fridayClose={friClose}
                      currentPrice={livePrice}
                      gapPercent={gapPct}
                      theme={theme}
                    />
                    <InstitutionalTradeTicket
                      ticker={tickerKey}
                      name={activeStock.name}
                      activeAnalysis={activeAnalysis}
                      currentPrice={livePrice}
                      onOrderExecuted={(msg) => showToast(msg)}
                      theme={theme}
                    />
                  </div>

                  {/* Right (4 cols): AI Desk & Radar */}
                  <div className="col-span-4 flex flex-col space-y-4">
                    <ResearchDesk
                      selectedTicker={selectedTicker}
                      onAnalysisGenerated={(analysis) => {
                        setActiveAnalysis(analysis);
                        showToast(`Synthesized Dual-Lens memo for ${analysis.ticker} via Qwen 3.8-Max`);
                      }}
                      theme={theme}
                    />
                    <GapRadar
                      stocks={stocks}
                      selectedTicker={selectedTicker}
                      onSelectTicker={(ticker) => setSelectedTicker(ticker)}
                      theme={theme}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* Floating Status Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
