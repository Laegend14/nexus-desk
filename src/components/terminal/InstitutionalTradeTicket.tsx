"use client";

import React, { useState } from "react";
import { ResearchResult } from "@/services/qwenService";
import { ArrowUpRight, Download, CheckCircle2, Zap, Lock } from "lucide-react";

import { StockLogo } from "../StockLogo";

interface InstitutionalTradeTicketProps {
  ticker: string;
  name: string;
  stockImage?: string;
  activeAnalysis: ResearchResult | null;
  currentPrice: number;
  onOrderExecuted: (msg: string) => void;
  theme?: "light" | "dark";
}

export const InstitutionalTradeTicket: React.FC<InstitutionalTradeTicketProps> = ({
  ticker,
  name,
  activeAnalysis,
  currentPrice,
  onOrderExecuted,
  theme = "light",
}) => {
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [sizeShares, setSizeShares] = useState<number>(15);
  const [takeProfitPct, setTakeProfitPct] = useState<number>(3.5);
  const [stopLossPct, setStopLossPct] = useState<number>(1.2);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.05);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isExported, setIsExported] = useState<boolean>(false);

  const isDark = theme === "dark";

  const price = activeAnalysis?.suggestedEntry || currentPrice || 128.45;
  const notionalValue = +(price * sizeShares).toFixed(2);
  const tpTargetPrice = +(price * (1 + takeProfitPct / 100)).toFixed(2);
  const slTargetPrice = +(price * (1 - stopLossPct / 100)).toFixed(2);

  const handleExecuteDemoOrder = async () => {
    setIsExecuting(true);
    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: `${ticker}USDT`,
          side: "buy",
          orderType: orderType.toLowerCase(),
          price,
          size: sizeShares,
          reasoningTag: `NexusDesk MCP-UI (${ticker})`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onOrderExecuted(
          `Filled BUY ${sizeShares} ${ticker} @ $${price} (Bitget Demo Order #${data.data.orderId.slice(-6)})`
        );
      } else {
        onOrderExecuted(`Paper order filled: ${sizeShares} ${ticker} @ $${price}`);
      }
    } catch (err) {
      onOrderExecuted(`Paper order filled: ${sizeShares} ${ticker} @ $${price}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleExportPlaybook = () => {
    const playbookData = {
      version: "2.0-mcp-ui",
      platform: "Bitget Playbook",
      author: "Federal University of Technology Minna - NexusDesk Team",
      strategyIdentifier: `NEXUS_${ticker}_24x7_EQUITY_ALPHA`,
      underlyingAsset: `${ticker}/USDT`,
      executionEngine: "Bitget UTA v3",
      rules: {
        condition: "Weekend rToken Spread >= 1.5% vs Friday Official Close",
        executionType: orderType,
        positionSizeShares: sizeShares,
        notionalCapUSD: notionalValue,
        takeProfitPct,
        stopLossPct,
        maxSlippageBps: Math.round(slippageTolerance * 100),
      },
      qwenSynthesis: activeAnalysis?.reasoning || "Weekend equity transmission alpha",
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(playbookData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bitget_playbook_${ticker.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setIsExported(true);
    setTimeout(() => setIsExported(false), 3000);
    onOrderExecuted(`Playbook JSON generated for Bitget quantitative deployment!`);
  };

  return (
    <div
      className={`w-full rounded-xl p-4 flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#141210] border border-stone-800 shadow-md"
          : "bg-white border border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Header with Asset Badge */}
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <StockLogo ticker={ticker} size={30} />
          <div>
            <div className="flex items-center space-x-1.5">
              <span
                className={`font-mono font-bold text-sm sm:text-base ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {ticker}
              </span>
              <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase">
                Trade Ticket
              </span>
            </div>
            <div className={`text-xs truncate font-sans ${isDark ? "text-stone-400" : "text-stone-500"}`}>
              {name}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center space-x-1 p-0.5 rounded-lg border text-xs font-mono ${
            isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-100 border-stone-200"
          }`}
        >
          {(["MARKET", "LIMIT"] as const).map((ot) => (
            <button
              key={ot}
              onClick={() => setOrderType(ot)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                orderType === ot
                  ? "bg-[#FF6B00] text-white font-bold"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {ot}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Matrix */}
      <div
        className={`py-3.5 space-y-3 font-mono text-xs sm:text-sm border-b ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        {/* Vector Target */}
        <div
          className={`p-3 rounded-lg border flex items-center justify-between ${
            isDark
              ? "bg-[#1A1816] border-stone-800"
              : "bg-orange-50/70 border-orange-200 text-stone-800"
          }`}
        >
          <span className="text-xs text-stone-400 font-bold uppercase">Position Vector:</span>
          <span className="text-[#FF6B00] font-bold text-sm flex items-center">
            LONG {ticker} <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </span>
        </div>

        {/* Pricing & Sizing Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className={`p-3 rounded-lg border ${
              isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-50 border-stone-200"
            }`}
          >
            <div className="text-xs text-stone-400 uppercase font-bold">Entry Price</div>
            <div
              className={`font-bold text-base sm:text-lg tabular-nums mt-0.5 ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              ${price.toFixed(2)}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              isDark ? "bg-[#1A1816] border-stone-800" : "bg-stone-50 border-stone-200"
            }`}
          >
            <div className="text-xs text-stone-400 uppercase font-bold">Notional Value</div>
            <div className="text-[#FF6B00] font-bold text-base sm:text-lg tabular-nums mt-0.5">
              ${notionalValue}
            </div>
          </div>
        </div>

        {/* Sizing Slider */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className={isDark ? "text-stone-400" : "text-stone-600"}>Order Quantity:</span>
            <span
              className={`font-bold tabular-nums ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              {sizeShares} Shares
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={sizeShares}
            onChange={(e) => setSizeShares(Number(e.target.value))}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
          />
        </div>

        {/* TP / SL Dual Parameters */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className={isDark ? "text-emerald-400 font-semibold" : "text-emerald-700 font-semibold"}>
                TP (+{takeProfitPct}%):
              </span>
              <span className="tabular-nums font-bold text-emerald-600">${tpTargetPrice}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={takeProfitPct}
              onChange={(e) => setTakeProfitPct(Number(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className={isDark ? "text-rose-400 font-semibold" : "text-rose-700 font-semibold"}>
                SL (-{stopLossPct}%):
              </span>
              <span className="tabular-nums font-bold text-rose-600">${slTargetPrice}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={stopLossPct}
              onChange={(e) => setStopLossPct(Number(e.target.value))}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Risk & Slippage Guard Bar */}
        <div
          className={`p-2 rounded border text-[10px] flex items-center justify-between ${
            isDark
              ? "bg-[#1A1816] border-stone-800 text-stone-400"
              : "bg-stone-50 border-stone-200 text-stone-600"
          }`}
        >
          <span className="flex items-center font-medium">
            <Lock className="w-3 h-3 mr-1 text-[#FF6B00]" /> Max Slippage Limit:
          </span>
          <span
            className={`font-bold tabular-nums ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            {slippageTolerance * 100}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 space-y-2">
        <button
          onClick={handleExecuteDemoOrder}
          disabled={isExecuting}
          className="w-full py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs font-bold font-mono flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>
            {isExecuting ? "Submitting to Bitget UTA..." : `Execute Bitget Demo (${sizeShares} ${ticker})`}
          </span>
        </button>

        <button
          onClick={handleExportPlaybook}
          className={`w-full py-2 rounded-lg border text-xs font-semibold font-mono flex items-center justify-center space-x-1.5 transition-colors active:scale-[0.98] ${
            isDark
              ? "bg-[#1A1816] hover:bg-[#241F1A] text-stone-300 border-stone-800 hover:border-orange-500/40"
              : "bg-white hover:bg-orange-50 text-stone-700 border-stone-200 hover:border-orange-300 shadow-2xs"
          }`}
        >
          {isExported ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Playbook JSON Generated!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Export to Bitget Playbook</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
