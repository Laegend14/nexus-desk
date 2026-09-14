"use client";

import React, { useState } from "react";
import { Layers, SlidersHorizontal } from "lucide-react";

interface MacroTransmissionTreeProps {
  transmissionChain: {
    event: string;
    macroFactor: string;
    sectorImpact: string;
    stockTarget: string;
  };
  ticker: string;
  theme?: "light" | "dark";
}

export const MacroTransmissionTree: React.FC<MacroTransmissionTreeProps> = ({
  transmissionChain,
  ticker,
  theme = "light",
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [simulationShift, setSimulationShift] = useState<number>(0);

  const isDark = theme === "dark";

  const steps = [
    {
      id: 1,
      tag: "Stage 1: Catalyst Event",
      title: transmissionChain.event,
      meta: "Raw Weekend Signal",
      details: {
        source: "Aggregated Financial News Feeds, Asian Chip Foundry Dispatches, Geopolitical Wires",
        evidence: "Hyperscaler weekend capital expenditure commentary confirmed +18% QoQ datacenter acceleration.",
        confidence: 94,
        impactWeight: "High (0.85)",
      },
    },
    {
      id: 2,
      tag: "Stage 2: Macro Factor",
      title: transmissionChain.macroFactor,
      meta: "Factor Transmission",
      details: {
        source: "FOMC Overnight Swap Curves, 10Y Real Yield Delta, DXY Currency Vector",
        evidence: "Real yields compressed 4.2 bps overnight while global liquidity sentiment surged in 24/7 markets.",
        confidence: 91,
        impactWeight: "High (0.78)",
      },
    },
    {
      id: 3,
      tag: "Stage 3: Sector Reaction",
      title: transmissionChain.sectorImpact,
      meta: "Thematic Propagation",
      details: {
        source: "SOX Index Component Cross-Arbitrage, High-Beta Tech ETF Capital Flows",
        evidence: "Semiconductor supply chain names pricing durable hardware delivery cycles through Q4 2026.",
        confidence: 88,
        impactWeight: "Medium-High (0.72)",
      },
    },
    {
      id: 4,
      tag: "Stage 4: Stock Vector",
      title: transmissionChain.stockTarget,
      meta: `${ticker} Equity Thesis`,
      details: {
        source: "Bitget UTA v3 Order Depth, 24/7 rToken Uniswap v3 Liquidity Pools",
        evidence: `Direct order book imbalance favors opening long vector on ${ticker} with tight stop-loss parameters.`,
        confidence: 95,
        impactWeight: "Primary (0.92)",
      },
    },
  ];

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div
      className={`w-full rounded-xl p-4 flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#141210] border border-stone-800 shadow-md"
          : "bg-white border border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#FF6B00]" />
          <h3
            className={`text-sm font-semibold tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            MCP-UI Interactive Transmission Tree
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
            isDark
              ? "bg-stone-800 text-stone-400 border border-stone-700"
              : "bg-orange-50 text-orange-800 border border-orange-200"
          }`}
        >
          Click stage to inspect
        </span>
      </div>

      {/* Interactive 4-Node Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-3">
        {steps.map((step) => {
          const isSelected = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? isDark
                    ? "bg-[#241F1A] border-[#FF6B00] shadow-sm ring-1 ring-[#FF6B00]/40"
                    : "bg-orange-50/80 border-[#FF6B00] shadow-xs ring-1 ring-[#FF6B00]/30"
                  : isDark
                  ? "bg-[#181614] border-stone-800 hover:border-stone-700 hover:bg-[#1E1A17]"
                  : "bg-stone-50/80 border-stone-200 hover:border-orange-200 hover:bg-orange-50/30"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={isSelected ? "text-[#FF6B00] font-semibold" : "text-stone-500"}>
                  {step.tag}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
                )}
              </div>
              <div
                className={`text-xs font-semibold truncate font-sans ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {step.title}
              </div>
              <div className={`text-[10px] font-mono mt-1 ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                {step.meta}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Sub-Canvas Inspector Pane */}
      <div
        className={`mt-3 p-3.5 rounded-lg border font-mono text-xs space-y-2.5 transition-colors ${
          isDark
            ? "bg-[#1A1816] border-stone-800"
            : "bg-stone-50 border-orange-100 shadow-2xs"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-2 ${
            isDark ? "border-stone-800" : "border-stone-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-[#FF6B00] uppercase text-[10px] font-bold tracking-wider">
              {currentStep.tag} Inspector
            </span>
            <span className="text-stone-400">/</span>
            <span
              className={`text-[11px] font-semibold ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              Confidence {currentStep.details.confidence}%
            </span>
          </div>
          <span className={`text-[10px] ${isDark ? "text-stone-400" : "text-stone-500 font-medium"}`}>
            Weight: {currentStep.details.impactWeight}
          </span>
        </div>

        {/* Evidence & Citations */}
        <div
          className={`font-sans leading-relaxed text-xs ${
            isDark ? "text-stone-200" : "text-stone-700"
          }`}
        >
          {currentStep.details.evidence}
        </div>

        <div className="text-[10px] pt-1 flex items-start space-x-1.5">
          <span className="text-stone-400 shrink-0 font-medium">Source Wires:</span>
          <span className={`truncate ${isDark ? "text-stone-300" : "text-stone-600"}`}>
            {currentStep.details.source}
          </span>
        </div>

        {/* Interactive Sensitivity Slider Simulation */}
        <div
          className={`pt-2 border-t flex items-center justify-between ${
            isDark ? "border-stone-800" : "border-stone-200"
          }`}
        >
          <div className="flex items-center space-x-2 text-[11px]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className={isDark ? "text-stone-400" : "text-stone-600"}>
              Simulate Factor Shock:
            </span>
            <span
              className={`font-bold tabular-nums ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              {simulationShift >= 0 ? `+${simulationShift}` : simulationShift} bps
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={simulationShift}
            onChange={(e) => setSimulationShift(Number(e.target.value))}
            className="w-36 h-1 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
          />
        </div>
      </div>
    </div>
  );
};
