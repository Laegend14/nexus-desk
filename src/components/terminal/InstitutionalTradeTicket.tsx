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
      author: "NexusDesk Research Team",
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
      className={`w-full rounded-2xl p-4 sm:p-5 flex flex-col font-sans transition-colors duration-200 border ${
        isDark
          ? "bg-[#1E1B18] border-stone-700/80 shadow-xl"
          : "bg-white border-2 border-orange-300 shadow-[0_8px_30px_-6px_rgba(255,107,0,0.15)]"
      }`}
    >
      {/* Header with Asset Badge */}
      <div
        className={`flex items-center justify-between pb-3.5 border-b ${
          isDark ? "border-stone-700" : "border-orange-200"
        }`}
      >
        <div className="flex items-center space-x-3">
          <StockLogo ticker={ticker} size={32} />
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`font-mono font-extrabold text-base sm:text-lg ${
                  isDark ? "text-white" : "text-stone-950"
                }`}
              >
                {ticker}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[#FF6B00] font-extrabold uppercase">
                Trade Ticket
              </span>
            </div>
            <div className={`text-xs sm:text-sm truncate font-sans font-medium ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              {name}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center space-x-1 p-0.5 rounded-lg border text-xs sm:text-sm font-mono font-bold ${
            isDark ? "bg-[#181512] border-stone-700" : "bg-white/80 border-orange-300 shadow-2xs"
          }`}
        >
          {(["MARKET", "LIMIT"] as const).map((ot) => (
            <button
              key={ot}
              onClick={() => setOrderType(ot)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                orderType === ot
                  ? "bg-[#FF6B00] text-white shadow-xs"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              {ot}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Matrix */}
      <div
        className={`py-4 space-y-3.5 font-mono text-sm border-b ${
          isDark ? "border-stone-700" : "border-orange-200"
        }`}
      >
        {/* Vector Target */}
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between ${
            isDark
              ? "bg-[#282420] border-stone-700"
              : "bg-orange-100/70 border-orange-300 text-stone-950 shadow-2xs"
          }`}
        >
          <span className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-bold uppercase">
            Position Vector:
          </span>
          <span className="text-[#FF6B00] font-extrabold text-sm sm:text-base flex items-center">
            LONG {ticker} <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </span>
        </div>

        {/* Pricing & Sizing Row */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3.5 rounded-xl border ${
              isDark ? "bg-[#24201D] border-stone-700" : "bg-orange-50/80 border-orange-200"
            }`}
          >
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 uppercase font-bold">
              Entry Price
            </div>
            <div
              className={`font-extrabold text-base sm:text-xl tabular-nums mt-0.5 ${
                isDark ? "text-white" : "text-stone-950"
              }`}
            >
              ${price.toFixed(2)}
            </div>
          </div>
          <div
            className={`p-3.5 rounded-xl border ${
              isDark ? "bg-[#24201D] border-stone-700" : "bg-orange-50/80 border-orange-200"
            }`}
          >
            <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 uppercase font-bold">
              Notional Value
            </div>
            <div className="text-[#FF6B00] font-extrabold text-base sm:text-xl tabular-nums mt-0.5">
              ${notionalValue}
            </div>
          </div>
        </div>

        {/* Sizing Slider */}
        <div className="pt-1.5">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <span className={isDark ? "text-stone-300 font-medium" : "text-stone-700 font-bold"}>
              Order Quantity:
            </span>
            <span
              className={`font-extrabold tabular-nums text-sm sm:text-base ${
                isDark ? "text-white" : "text-stone-950"
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
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
          />
        </div>

        {/* TP / SL Dual Parameters */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-bold">
              <span className={isDark ? "text-emerald-400" : "text-emerald-800"}>
                TP (+{takeProfitPct}%):
              </span>
              <span className="tabular-nums text-emerald-600 dark:text-emerald-400">${tpTargetPrice}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={takeProfitPct}
              onChange={(e) => setTakeProfitPct(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-bold">
              <span className={isDark ? "text-rose-400" : "text-rose-800"}>
                SL (-{stopLossPct}%):
              </span>
              <span className="tabular-nums text-rose-600 dark:text-rose-400">${slTargetPrice}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={stopLossPct}
              onChange={(e) => setStopLossPct(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Risk & Slippage Guard Bar */}
        <div
          className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-center justify-between font-bold ${
            isDark
              ? "bg-[#181512] border-stone-700 text-stone-300"
              : "bg-orange-50 border-orange-200 text-stone-800"
          }`}
        >
          <span className="flex items-center">
            <Lock className="w-3.5 h-3.5 mr-1 text-[#FF6B00]" /> Max Slippage Limit:
          </span>
          <span
            className={`font-extrabold tabular-nums ${
              isDark ? "text-white" : "text-stone-950"
            }`}
          >
            {slippageTolerance * 100}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3.5 space-y-2.5">
        <button
          onClick={handleExecuteDemoOrder}
          disabled={isExecuting}
          className="w-full py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white text-sm sm:text-base font-bold font-mono flex items-center justify-center space-x-2 transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>
            {isExecuting ? "Submitting to Bitget UTA..." : `Execute Bitget Demo (${sizeShares} ${ticker})`}
          </span>
        </button>

        <button
          onClick={handleExportPlaybook}
          className={`w-full py-3 rounded-xl border-2 text-sm sm:text-base font-bold font-mono flex items-center justify-center space-x-2 transition-colors active:scale-[0.98] cursor-pointer ${
            isDark
              ? "bg-[#24201D] hover:bg-[#2F2923] text-stone-200 border-stone-700 hover:border-orange-500/40"
              : "bg-white hover:bg-orange-100/70 text-stone-900 border-orange-300 shadow-2xs"
          }`}
        >
          {isExported ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-500">Playbook JSON Generated!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#FF6B00]" />
              <span>Export to Bitget Playbook</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
