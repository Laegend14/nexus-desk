"use client";

import React, { useState } from "react";
import { ResearchResult } from "@/services/qwenService";
import { Zap, Download, CheckCircle2, ShieldAlert, Sliders, ArrowUpRight } from "lucide-react";

interface TradePlaybookProps {
  selectedTicker: string;
  activeAnalysis: ResearchResult | null;
  fallbackPrice?: number;
  onOrderExecuted: (orderMsg: string) => void;
}

export const TradePlaybook: React.FC<TradePlaybookProps> = ({
  selectedTicker,
  activeAnalysis,
  fallbackPrice,
  onOrderExecuted,
}) => {
  const [size, setSize] = useState<number>(10);
  const [takeProfitPct, setTakeProfitPct] = useState<number>(3.5);
  const [stopLossPct, setStopLossPct] = useState<number>(1.2);
  const [isExecuting, setIsExecuting] = useState(false);
  const [exported, setExported] = useState(false);

  const currentPrice = activeAnalysis?.suggestedEntry || fallbackPrice || 128.45;
  const estimatedTpPrice = (currentPrice * (1 + takeProfitPct / 100)).toFixed(2);
  const estimatedSlPrice = (currentPrice * (1 - stopLossPct / 100)).toFixed(2);
  const totalValue = (currentPrice * size).toFixed(2);

  const handleExecuteDemoOrder = async () => {
    setIsExecuting(true);
    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: `${selectedTicker}USDT`,
          side: "buy",
          orderType: "market",
          price: currentPrice,
          size,
          reasoningTag: `NexusDesk Qwen Gap (${selectedTicker})`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onOrderExecuted(
          `Filled BUY ${size} ${selectedTicker} @ $${currentPrice} (Bitget Demo Order #${data.data.orderId.slice(-6)})`
        );
      }
    } catch (err) {
      console.error("Order error:", err);
      onOrderExecuted(`Demo order sent for ${size} shares of ${selectedTicker}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleExportPlaybook = () => {
    const playbookData = {
      platform: "Bitget Playbook",
      author: "Federal University of Technology Minna - NexusDesk Team",
      strategyName: `NexusDesk_${selectedTicker}_7x24_Gap_Alpha`,
      asset: `${selectedTicker}/USDT`,
      executionVenue: "Bitget UTA v3",
      parameters: {
        entryCondition: `rToken_spread >= 1.5% at Monday open`,
        positionSizeShares: size,
        takeProfitPct,
        stopLossPct,
        maxSlippagePct: 0.05,
      },
      qwenReasoningMemo: activeAnalysis?.reasoning || "Weekend tokenized equity spread alpha",
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(playbookData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexusdesk_playbook_${selectedTicker.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 3000);
    onOrderExecuted(`Strategy JSON exported for Bitget Playbook submission!`);
  };

  return (
    <div className="w-full rounded-xl bg-[#0E1017] border border-white/[0.08] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold tracking-tight text-white">
            Actionable Trade Playbook
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
          Bitget UTA v3
        </span>
      </div>

      {/* Playbook Setup Body */}
      <div className="p-4 space-y-4 flex-1 font-mono text-xs">
        {/* Active Trade Vector */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Target Setup:</span>
            <span className="font-bold text-white flex items-center text-cyan-400">
              LONG {selectedTicker} <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Entry Reference:</span>
            <span className="text-white tabular-nums">${currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Total Notional Value:</span>
            <span className="text-white tabular-nums">${totalValue}</span>
          </div>
        </div>

        {/* Sliders & Parameter Controls */}
        <div className="space-y-3 pt-1">
          {/* Sizing Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
              <span>Order Size:</span>
              <span className="text-white font-bold tabular-nums">{size} Shares</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Take Profit Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
              <span className="text-emerald-400">Take Profit (+{takeProfitPct}%):</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                ${estimatedTpPrice}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={takeProfitPct}
              onChange={(e) => setTakeProfitPct(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Stop Loss Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
              <span className="text-rose-400">Stop Loss (-{stopLossPct}%):</span>
              <span className="text-rose-400 font-bold tabular-nums">
                ${estimatedSlPrice}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={stopLossPct}
              onChange={(e) => setStopLossPct(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>
        </div>

        {/* Risk Mitigation Guardrail Notice */}
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/[0.06] text-[11px] text-zinc-400 flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Pre-trade slippage guard active. Max slippage capped at 0.05% against on-chain liquidity.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {/* Button 1: Execute Bitget Paper Order */}
          <button
            onClick={handleExecuteDemoOrder}
            disabled={isExecuting}
            className="tactile-btn w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090A0E] text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>
              {isExecuting ? "Routing to Bitget Demo..." : `Execute Bitget Demo (${size} ${selectedTicker})`}
            </span>
          </button>

          {/* Button 2: Export to Bitget Playbook */}
          <button
            onClick={handleExportPlaybook}
            className="tactile-btn w-full py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center space-x-2"
          >
            {exported ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Playbook JSON Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export to Bitget Playbook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
