"use client";

import React, { useState } from "react";
import { ShieldCheck, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { StockLogo } from "../StockLogo";

interface StockGapChartProps {
  ticker: string;
  name: string;
  fridayClose: number;
  rTokenPrice: number;
  gapPercent: number;
  stockImage?: string;
  theme?: "light" | "dark";
}

export const StockGapChart: React.FC<StockGapChartProps> = ({
  ticker,
  name,
  fridayClose,
  rTokenPrice,
  gapPercent,
  theme = "light",
}) => {
  const [timeframe, setTimeframe] = useState<"WEEKEND" | "24H" | "1W">("WEEKEND");
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; price: number; time: string } | null>(null);

  const isDark = theme === "dark";
  const isPositive = gapPercent >= 0;
  const priceDiff = rTokenPrice - fridayClose;

  // Points representing 24/7 weekend price trajectory
  const points = [
    { label: "Fri 16:00 Close", price: fridayClose, time: "Fri 20:00 UTC", x: 20, y: 150 },
    { label: "Sat Asian Session", price: +(fridayClose + priceDiff * 0.15).toFixed(2), time: "Sat 04:00 UTC", x: 120, y: 140 },
    { label: "Sat European Flow", price: +(fridayClose + priceDiff * 0.35).toFixed(2), time: "Sat 12:00 UTC", x: 220, y: 125 },
    { label: "Sun Geo News Spike", price: +(fridayClose + priceDiff * 0.70).toFixed(2), time: "Sun 02:00 UTC", x: 320, y: 85 },
    { label: "Sun Asia Tech Open", price: +(fridayClose + priceDiff * 0.55).toFixed(2), time: "Sun 14:00 UTC", x: 420, y: 105 },
    { label: "Sun US Pre-Prep", price: +(fridayClose + priceDiff * 0.88).toFixed(2), time: "Sun 20:00 UTC", x: 520, y: 70 },
    { label: "Live 24/7 rToken", price: rTokenPrice, time: "Live On-Chain", x: 620, y: 55 },
  ];

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x},${pt.y}`, "");
  const areaD = `${pathD} L 620,180 L 20,180 Z`;

  // Bloomberg Orange / Amber Accent Colors
  const chartStrokeColor = "#FF6B00";

  return (
    <div
      className={`w-full rounded-2xl p-4 sm:p-5 flex flex-col font-sans transition-colors duration-200 border-2 ${
        isDark
          ? "bg-[#1E1B18] border-stone-700/80 shadow-md"
          : "bg-white border-orange-300 shadow-[0_8px_30px_-6px_rgba(255,107,0,0.15)]"
      }`}
    >
      {/* Stock Header & Asset Visual */}
      <div
        className={`flex items-center justify-between pb-3.5 border-b ${
          isDark ? "border-stone-700" : "border-orange-200"
        }`}
      >
        <div className="flex items-center space-x-3">
          <StockLogo ticker={ticker} size={36} />
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`font-extrabold tracking-tight text-lg font-mono ${
                  isDark ? "text-white" : "text-stone-950"
                }`}
              >
                {ticker}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-mono font-bold ${
                  isDark
                    ? "bg-[#25211D] text-orange-400 border border-stone-700"
                    : "bg-[#FFE9D1] text-orange-950 border border-orange-300"
                }`}
              >
                US Equity rToken
              </span>
              <span
                className={`text-xs font-mono flex items-center font-bold ${
                  isDark ? "text-emerald-400" : "text-emerald-700"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 24/7 On-Chain
              </span>
            </div>
            <div className={`text-xs sm:text-sm font-medium mt-0.5 ${isDark ? "text-stone-300" : "text-stone-700"}`}>
              {name}
            </div>
          </div>
        </div>

        {/* Timeframe Controls */}
        <div
          className={`flex items-center space-x-1 p-0.5 rounded-lg border text-xs sm:text-sm font-mono font-bold ${
            isDark ? "bg-[#181512] border-stone-700" : "bg-white/80 border-orange-300 shadow-2xs"
          }`}
        >
          {(["WEEKEND", "24H", "1W"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                timeframe === tf
                  ? "bg-[#FF6B00] text-white font-extrabold"
                  : isDark
                  ? "text-stone-300 hover:text-white"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 border-b font-mono ${
          isDark ? "border-stone-700" : "border-orange-200"
        }`}
      >
        <div className={`p-3 rounded-xl border ${isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-b from-orange-100 to-amber-50/80 border-2 border-orange-200"}`}>
          <div className={`text-xs uppercase font-extrabold tracking-wider ${isDark ? "text-stone-400" : "text-stone-600"}`}>Fri Cash Close</div>
          <div
            className={`text-base sm:text-lg font-extrabold tabular-nums mt-0.5 ${
              isDark ? "text-stone-200" : "text-stone-900"
            }`}
          >
            ${fridayClose.toFixed(2)}
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-b from-orange-100 to-amber-50/80 border-2 border-orange-200"}`}>
          <div className={`text-xs uppercase font-extrabold tracking-wider ${isDark ? "text-stone-400" : "text-stone-600"}`}>Live 24/7 Price</div>
          <div
            className={`text-base sm:text-lg font-extrabold tabular-nums mt-0.5 ${
              isDark ? "text-white" : "text-stone-950"
            }`}
          >
            ${rTokenPrice.toFixed(2)}
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-b from-orange-100 to-amber-50/80 border-2 border-orange-200"}`}>
          <div className={`text-xs uppercase font-extrabold tracking-wider ${isDark ? "text-stone-400" : "text-stone-600"}`}>Weekend Spread</div>
          <div
            className={`text-base sm:text-lg font-extrabold tabular-nums mt-0.5 ${
              isPositive
                ? isDark
                  ? "text-emerald-400"
                  : "text-emerald-700"
                : isDark
                ? "text-rose-400"
                : "text-rose-700"
            }`}
          >
            {isPositive ? "+" : ""}
            {gapPercent}%
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${isDark ? "bg-[#24201D] border-stone-700" : "bg-gradient-to-b from-orange-100 to-amber-50/80 border-2 border-orange-200"}`}>
          <div className="text-xs uppercase tracking-wider text-[#FF6B00] font-extrabold">
            Implied Mon Gap
          </div>
          <div className="text-base sm:text-lg font-extrabold text-[#FF6B00] tabular-nums mt-0.5">
            {isPositive ? "+" : ""}${priceDiff.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative pt-3 pb-1">
        <svg viewBox="0 0 640 190" className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="orangeChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity={isDark ? "0.25" : "0.18"} />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="20"
            y1="40"
            x2="620"
            y2="40"
            stroke={isDark ? "#241F1A" : "#F3EBE1"}
            strokeDasharray="3 3"
          />
          <line
            x1="20"
            y1="90"
            x2="620"
            y2="90"
            stroke={isDark ? "#241F1A" : "#F3EBE1"}
            strokeDasharray="3 3"
          />
          <line
            x1="20"
            y1="140"
            x2="620"
            y2="140"
            stroke={isDark ? "#241F1A" : "#F3EBE1"}
            strokeDasharray="3 3"
          />

          {/* Friday Close Reference Line */}
          <line
            x1="20"
            y1="150"
            x2="620"
            y2="150"
            stroke={isDark ? "#78716C" : "#A8A29E"}
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <text
            x="24"
            y="165"
            fill={isDark ? "#A8A29E" : "#78716C"}
            fontSize="10"
            fontFamily="monospace"
          >
            Friday Official Cash Close: ${fridayClose.toFixed(2)}
          </text>

          {/* Weekend Area and Vibrant Orange Line */}
          <path d={areaD} fill="url(#orangeChartGradient)" />
          <path
            d={pathD}
            fill="none"
            stroke={chartStrokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.label === pt.label ? 6 : 4}
                fill={chartStrokeColor}
                stroke={isDark ? "#141210" : "#FFFFFF"}
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 rounded-md px-3 py-1.5 shadow-xl font-mono text-xs z-10 pointer-events-none border ${
              isDark
                ? "bg-[#1A1816] border-stone-700 text-white"
                : "bg-white border-orange-200 text-stone-900 shadow-md"
            }`}
          >
            <div className="text-[10px] text-stone-500">
              {hoveredPoint.time} • {hoveredPoint.label}
            </div>
            <div className="font-bold text-[#FF6B00] tabular-nums mt-0.5">
              ${hoveredPoint.price.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Chart Footer */}
      <div
        className={`flex items-center justify-between pt-2 border-t text-[10px] font-mono ${
          isDark ? "border-stone-800 text-stone-500" : "border-orange-100 text-stone-500"
        }`}
      >
        <span className="flex items-center">
          <Activity className="w-3 h-3 mr-1 text-[#FF6B00]" /> Continuous 24/7 On-Chain Order Book Feeds
        </span>
        <span>Oracle: Pyth / Chainlink UTA</span>
      </div>
    </div>
  );
};
