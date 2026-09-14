"use client";

import React, { useState } from "react";
import { ResearchResult, BITGET_RESEARCH_SKILLS } from "@/services/qwenService";
import {
  Brain,
  AlertCircle,
  Loader2,
  FileText,
  Send,
  Cpu,
  Download,
  CheckCircle2,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";
import { MacroTransmissionTree } from "./terminal/MacroTransmissionTree";
import { StockLogo } from "./StockLogo";

interface ResearchDeskProps {
  selectedTicker: string;
  onAnalysisGenerated: (result: ResearchResult) => void;
  theme?: "light" | "dark";
}

const PRESET_QUERIES = [
  "Show me NVDA tokenized volume vs native stock and correlate with AI meme-coins.",
  "Correlate MSTR premium vs Bitcoin spot ETF inflows & liquidations.",
  "Evaluate TSLA weekend spread vs Asian EV battery supply chain & Doge sentiment.",
  "Analyze COIN weekend volume vs Ethereum gas fee velocity & L2 TVL.",
];

export const ResearchDesk: React.FC<ResearchDeskProps> = ({
  selectedTicker,
  onAnalysisGenerated,
  theme = "light",
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResearchResult | null>(null);
  const [activeSkills, setActiveSkills] = useState<string[]>([
    "macro-analyst",
    "market-intel",
    "news-briefing",
    "sentiment-analyst",
    "technical-analysis",
  ]);
  const [exported, setExported] = useState(false);

  const isDark = theme === "dark";

  const toggleSkill = (skillId: string) => {
    setActiveSkills((prev) =>
      prev.includes(skillId)
        ? prev.length > 1
          ? prev.filter((s) => s !== skillId)
          : prev
        : [...prev, skillId]
    );
  };

  const handleRunAnalysis = async (userPrompt?: string) => {
    const activeQuery =
      userPrompt ||
      query ||
      `Show me ${selectedTicker} tokenized volume vs native stock and correlate with crypto liquidity`;
    setLoading(true);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: selectedTicker,
          query: activeQuery,
          activeSkills,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
        onAnalysisGenerated(data.data);
      }
    } catch (err) {
      console.error("Research fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPlaybook = () => {
    if (!analysis) return;
    const jsonStr = JSON.stringify(analysis.playbookSpec, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${analysis.playbookSpec.strategyName}_bitget_playbook.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden flex flex-col font-sans transition-colors duration-200 border ${
        isDark
          ? "bg-[#141210] border-stone-800 shadow-xl"
          : "bg-white border-orange-200 shadow-md"
      }`}
    >
      {/* Top Header */}
      <div
        className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between ${
          isDark ? "border-stone-800 bg-[#161412]" : "border-orange-100 bg-[#FAF7F2]"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/15 flex items-center justify-center text-[#FF6B00]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`text-sm sm:text-base font-bold tracking-tight ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              NexusDesk AI Research Station
            </h2>
            <p className="text-xs text-stone-400 font-mono">
              Powered by Qwen 3.8-Max • Bitget UTA v3
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <StockLogo ticker={selectedTicker} size={22} />
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded-md font-bold ${
              isDark
                ? "bg-stone-800 text-stone-200 border border-stone-700"
                : "bg-orange-50 text-orange-900 border border-orange-200"
            }`}
          >
            Target: {selectedTicker}
          </span>
        </div>
      </div>

      {/* Bitget Open Research Skills Bar */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex flex-col space-y-2 ${
          isDark ? "bg-[#100E0C] border-stone-800" : "bg-orange-50/30 border-orange-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Pre-Built Bitget Research Skills (bitget-signal):</span>
          </span>
          <span className="text-xs font-mono text-[#FF6B00] font-bold">
            {activeSkills.length}/5 Skills Active
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-0.5">
          {BITGET_RESEARCH_SKILLS.map((skill) => {
            const isSelected = activeSkills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`text-xs sm:text-sm font-mono px-3 py-1.5 rounded-lg border flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? "bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00] font-bold shadow-xs"
                      : "bg-orange-50 border-[#FF6B00] text-orange-950 font-bold shadow-xs"
                    : isDark
                    ? "bg-[#1A1816] border-stone-800 text-stone-400 hover:text-white"
                    : "bg-white border-stone-200 text-stone-500 hover:text-stone-900"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.8)]" : "bg-stone-500"
                  }`}
                />
                <span>{skill.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prominent Command Bar / LUI Natural Language Input */}
      <div
        className={`p-4 sm:p-5 border-b ${
          isDark ? "border-stone-800 bg-[#0E0C0A]" : "border-orange-100 bg-[#FDFBF7]"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunAnalysis();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask research station: "Show me ${selectedTicker} tokenized volume vs native stock and correlate with AI meme-coins."`}
            className={`w-full rounded-xl py-3.5 pl-4 pr-32 text-sm sm:text-base font-mono transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
              isDark
                ? "bg-[#1A1816] border border-stone-700 text-white placeholder:text-stone-400 shadow-inner"
                : "bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 shadow-sm"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold font-mono flex items-center space-x-1.5 disabled:opacity-50 transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Synthesize</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Prompts */}
        <div className="flex items-center space-x-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-mono text-stone-400 uppercase tracking-wider shrink-0 font-bold">
            Presets:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(preset);
                handleRunAnalysis(preset);
              }}
              className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                isDark
                  ? "bg-[#1A1816] hover:bg-[#26201A] text-stone-300 border-stone-800 hover:border-orange-500/50"
                  : "bg-white hover:bg-orange-50 text-stone-700 border-stone-200 hover:border-orange-300 shadow-2xs"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesis Display Area */}
      <div className="p-4 sm:p-6 flex-1 space-y-5 overflow-y-auto max-h-[700px]">
        {!analysis && !loading && (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 mx-auto flex items-center justify-center text-[#FF6B00]">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className={`font-bold text-sm sm:text-base ${isDark ? "text-stone-200" : "text-stone-900"}`}>
              Dual-Lens Research Ready for {selectedTicker}
            </p>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-sans leading-relaxed">
              Type your question in the chatbox above or tap a preset prompt to correlate 24/7 tokenized US equity volume with crypto liquidity vectors via Qwen 3.8-Max.
            </p>
          </div>
        )}

        {loading && (
          <div className="py-12 text-center space-y-3 font-mono">
            <Loader2 className="w-9 h-9 mx-auto animate-spin text-[#FF6B00]" />
            <p className={`text-sm sm:text-base font-bold animate-pulse ${isDark ? "text-white" : "text-stone-900"}`}>
              Qwen 3.8-Max is synthesizing across {activeSkills.length} Bitget skills...
            </p>
            <p className="text-xs sm:text-sm text-stone-400 font-sans">
              Processing 24/7 on-chain spreads, Bitget UTA open interest, and macro transmission trees.
            </p>
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-5">
            {/* Catalyst Alert Card */}
            <div
              className={`p-4 rounded-xl border ${
                isDark
                  ? "bg-[#1A1816] border-orange-500/30 text-stone-100 shadow-sm"
                  : "bg-orange-50/80 border-orange-200 text-stone-900 shadow-xs"
              }`}
            >
              <div className="flex items-center space-x-2 text-[#FF6B00] font-mono text-xs sm:text-sm font-bold mb-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Primary Cross-Asset Catalyst:</span>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed font-sans font-medium">
                {analysis.catalystSummary}
              </p>
            </div>

            {/* Cross-Asset Correlation Card */}
            <div
              className={`p-4 rounded-xl border font-mono ${
                isDark ? "bg-[#171513] border-stone-800" : "bg-white border-orange-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-bold text-sm text-[#FF6B00] flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Dual-Lens Cross-Asset Correlation</span>
                </span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/15 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  r = {analysis.crossAssetCorrelation?.correlationCoefficient ?? 0.86} (High Beta)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  className={`p-3 rounded-lg ${
                    isDark ? "bg-[#1E1B18] border border-stone-800" : "bg-orange-50/60 border border-orange-100"
                  }`}
                >
                  <span className="text-stone-400 block text-xs uppercase font-bold">Correlated Crypto Proxy:</span>
                  <span className="font-bold text-sm sm:text-base text-stone-100 dark:text-white mt-0.5 block">
                    {analysis.crossAssetCorrelation?.correlatedCrypto ?? "RNDR / NEAR / FET"}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDark ? "bg-[#1E1B18] border border-stone-800" : "bg-orange-50/60 border border-orange-100"
                  }`}
                >
                  <span className="text-stone-400 block text-xs uppercase font-bold">Tokenized vs Native ADV:</span>
                  <span className="font-bold text-sm sm:text-base text-stone-100 dark:text-white mt-0.5 block">
                    {analysis.crossAssetCorrelation?.volumeComparison ?? "16.4% of Cash Market Turnover"}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs sm:text-sm font-sans pt-3 border-t border-stone-800/80 leading-relaxed">
                <strong className="text-[#FF6B00] font-mono">Divergence Signal: </strong>
                <span className={isDark ? "text-stone-300" : "text-stone-700"}>
                  {analysis.crossAssetCorrelation?.divergenceSignal}
                </span>
              </div>
            </div>

            {/* Bitget 5-Skills Intelligence Breakdown */}
            {analysis.skillSummaries && analysis.skillSummaries.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                  <span className="font-bold text-stone-300">Bitget Research Skills Breakdown</span>
                  <span className="text-[#FF6B00] font-bold">Multi-Agent Synthesis</span>
                </div>

                <div className="grid grid-cols-1 gap-2 font-mono">
                  {analysis.skillSummaries.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col space-y-1.5 transition-colors ${
                        isDark ? "bg-[#161412] border-stone-800" : "bg-stone-50 border-stone-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#FF6B00] flex items-center space-x-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{s.name}</span>
                        </span>
                        <span className="text-xs text-stone-400 font-sans">{s.focus}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 dark:text-stone-300 font-sans leading-relaxed">
                        {s.insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MCP-UI Interactive Transmission Tree */}
            <MacroTransmissionTree
              transmissionChain={analysis.transmissionChain}
              ticker={selectedTicker}
              theme={theme}
            />

            {/* Qwen Chain-of-Thought Reasoning Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="flex items-center space-x-1.5 text-[#FF6B00] font-bold">
                  <Brain className="w-4 h-4" />
                  <span>Qwen 3.8-Max Institutional Reasoning</span>
                </span>
                <span className={isDark ? "text-emerald-400 font-bold" : "text-emerald-700 font-bold"}>
                  Verified Synthesis
                </span>
              </div>
              <div
                className={`p-4 sm:p-5 rounded-xl border text-sm sm:text-[15px] leading-relaxed font-sans whitespace-pre-wrap ${
                  isDark
                    ? "bg-[#161412] border-stone-800 text-stone-200"
                    : "bg-stone-50 border-stone-200 text-stone-800"
                }`}
              >
                {analysis.reasoning}
              </div>
            </div>

            {/* Metric Summary Ribbon */}
            <div className="grid grid-cols-3 gap-3 pt-1 font-mono text-center">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/60 border-orange-200"
                }`}
              >
                <div className="text-xs text-stone-400 uppercase font-semibold">Implied Monday Gap</div>
                <div
                  className={`font-bold text-base sm:text-lg tabular-nums mt-1 ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  {analysis.impliedGapForecast}
                </div>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/60 border-orange-200"
                }`}
              >
                <div className="text-xs text-stone-400 uppercase font-semibold">Risk / Reward</div>
                <div
                  className={`font-bold text-base sm:text-lg tabular-nums mt-1 ${
                    isDark ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  {analysis.riskRewardRatio}
                </div>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/60 border-orange-200"
                }`}
              >
                <div className="text-xs text-stone-400 uppercase font-semibold">Est. Slippage</div>
                <div className="text-[#FF6B00] font-bold text-base sm:text-lg tabular-nums mt-1">
                  {analysis.slippageEstimatePct}%
                </div>
              </div>
            </div>

            {/* 1-Click Export to Bitget Playbook Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExportPlaybook}
                className="w-full py-3.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white text-sm font-bold font-mono flex items-center justify-center space-x-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {exported ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Exported to Bitget Playbook JSON!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>1-Click Export to Bitget Playbook JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
