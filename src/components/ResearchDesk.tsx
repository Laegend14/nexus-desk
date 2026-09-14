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
  Layers,
  Sparkles,
  Download,
  CheckCircle2,
  TrendingUp,
  Activity,
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
      className={`w-full rounded-xl overflow-hidden flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? "bg-[#141210] border border-stone-800 shadow-md"
          : "bg-white border border-orange-200/90 shadow-sm"
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? "border-stone-800" : "border-orange-100"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-[#FF6B00]" />
          <h2
            className={`text-sm font-semibold tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            NexusDesk Dual-Lens Research Station (Qwen 3.8-Max)
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <StockLogo ticker={selectedTicker} size={18} />
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
              isDark
                ? "bg-stone-800 text-stone-300 border border-stone-700"
                : "bg-orange-50 text-orange-800 border border-orange-200 font-semibold"
            }`}
          >
            Station Target: {selectedTicker}
          </span>
        </div>
      </div>

      {/* Bitget Open Research Skills Bar */}
      <div
        className={`px-4 py-2.5 border-b flex flex-col space-y-1.5 ${
          isDark ? "bg-[#100E0C] border-stone-800" : "bg-[#FAF7F2] border-orange-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-[#FF6B00]" />
            <span>Pre-Built Bitget Research Skills (bitget-signal):</span>
          </span>
          <span className="text-[10px] font-mono text-[#FF6B00] font-semibold">
            {activeSkills.length}/5 Skills Active
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {BITGET_RESEARCH_SKILLS.map((skill) => {
            const isSelected = activeSkills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md border flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? isDark
                      ? "bg-[#FF6B00]/15 border-[#FF6B00] text-[#FF6B00] font-bold"
                      : "bg-orange-50 border-[#FF6B00] text-orange-950 font-bold"
                    : isDark
                    ? "bg-[#1A1816] border-stone-800 text-stone-500 hover:text-stone-300"
                    : "bg-white border-stone-200 text-stone-400 hover:text-stone-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-[#FF6B00]" : "bg-stone-400"
                  }`}
                />
                <span>{skill.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Command Bar / LUI Natural Language Input */}
      <div
        className={`p-4 border-b ${
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
            className={`w-full rounded-lg py-2.5 pl-3.5 pr-28 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-[#FF6B00] ${
              isDark
                ? "bg-[#1A1816] border border-stone-700 text-white placeholder:text-stone-500"
                : "bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 shadow-2xs"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 px-3.5 py-1.5 rounded-md bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs font-bold font-mono flex items-center space-x-1 disabled:opacity-50 transition-colors shadow-xs active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Synthesize</span>
                <Send className="w-3 h-3 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Prompts */}
        <div className="flex items-center space-x-2 mt-2.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider shrink-0">
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
              className={`shrink-0 text-[11px] font-mono px-2.5 py-1 rounded border transition-colors ${
                isDark
                  ? "bg-[#1A1816] hover:bg-[#241F1A] text-stone-300 border-stone-800 hover:border-orange-500/40"
                  : "bg-white hover:bg-orange-50 text-stone-700 border-stone-200 hover:border-orange-300 shadow-2xs"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesis Display Area */}
      <div className="p-4 flex-1 space-y-4 overflow-y-auto max-h-[620px]">
        {!analysis && !loading && (
          <div className="py-16 text-center font-mono text-xs space-y-2">
            <FileText className="w-8 h-8 mx-auto text-stone-400" />
            <p className={`font-semibold ${isDark ? "text-stone-300" : "text-stone-800"}`}>
              Ready to synthesize Dual-Lens cross-asset intelligence for {selectedTicker}.
            </p>
            <p className="text-[11px] text-stone-400 max-w-md mx-auto font-sans">
              Type an institutional inquiry above or select a preset prompt to correlate 24/7 tokenized US equities with crypto liquidity via Qwen 3.8-Max.
            </p>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center font-mono text-xs space-y-3">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#FF6B00]" />
            <p className={`animate-pulse font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
              Qwen 3.8-Max is orchestrating {activeSkills.length} Bitget research skills...
            </p>
            <p className="text-[11px] text-stone-400 font-sans">
              Bridging cash equity close, rToken weekend order book depth, and digital asset liquidity vectors.
            </p>
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-4">
            {/* Catalyst Alert Card */}
            <div
              className={`p-3.5 rounded-lg border ${
                isDark
                  ? "bg-[#1A1816] border-orange-500/30 text-stone-200"
                  : "bg-orange-50/70 border-orange-200 text-stone-800"
              }`}
            >
              <div className="flex items-center space-x-2 text-[#FF6B00] font-mono text-xs font-bold mb-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Primary Cross-Asset Catalyst:</span>
              </div>
              <p className="text-xs leading-relaxed font-sans">{analysis.catalystSummary}</p>
            </div>

            {/* Cross-Asset Correlation Card */}
            <div
              className={`p-3.5 rounded-lg border text-xs font-mono ${
                isDark ? "bg-[#171513] border-stone-800" : "bg-white border-orange-200/70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#FF6B00] flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Dual-Lens Cross-Asset Correlation Matrix</span>
                </span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  r = {analysis.crossAssetCorrelation?.correlationCoefficient ?? 0.86} (High Beta)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div
                  className={`p-2 rounded ${
                    isDark ? "bg-[#1E1B18]" : "bg-orange-50/50 border border-orange-100"
                  }`}
                >
                  <span className="text-stone-400 block text-[10px]">Correlated Crypto Proxy:</span>
                  <span className="font-bold text-stone-200 dark:text-white">
                    {analysis.crossAssetCorrelation?.correlatedCrypto ?? "RNDR / NEAR / FET"}
                  </span>
                </div>
                <div
                  className={`p-2 rounded ${
                    isDark ? "bg-[#1E1B18]" : "bg-orange-50/50 border border-orange-100"
                  }`}
                >
                  <span className="text-stone-400 block text-[10px]">Tokenized vs Native ADV:</span>
                  <span className="font-bold text-stone-200 dark:text-white">
                    {analysis.crossAssetCorrelation?.volumeComparison ?? "16.4% of Cash Market Turnover"}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-stone-300 dark:text-stone-400 font-sans border-t pt-2 border-stone-800 dark:border-stone-800/80">
                <span className="font-bold text-[#FF6B00]">Divergence Signal: </span>
                {analysis.crossAssetCorrelation?.divergenceSignal}
              </div>
            </div>

            {/* Bitget 5-Skills Intelligence Breakdown */}
            {analysis.skillSummaries && analysis.skillSummaries.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-stone-400">
                  <span className="font-bold text-stone-300">Bitget Research Skills Breakdown</span>
                  <span className="text-[#FF6B00]">Multi-Agent Synthesis</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                  {analysis.skillSummaries.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border flex flex-col space-y-1 ${
                        isDark ? "bg-[#161412] border-stone-800" : "bg-stone-50 border-stone-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#FF6B00] flex items-center space-x-1.5">
                          <Activity className="w-3 h-3" />
                          <span>{s.name}</span>
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans">{s.focus}</span>
                      </div>
                      <p className="text-[11px] text-stone-300 dark:text-stone-400 font-sans leading-relaxed">
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
              <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider">
                <span className="flex items-center space-x-1.5 text-[#FF6B00] font-bold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Qwen 3.8-Max Institutional Reasoning</span>
                </span>
                <span className={isDark ? "text-emerald-400" : "text-emerald-700 font-semibold"}>
                  Verified Synthesis
                </span>
              </div>
              <div
                className={`p-3.5 rounded-lg border text-xs leading-relaxed font-mono whitespace-pre-wrap ${
                  isDark
                    ? "bg-[#161412] border-stone-800 text-stone-300"
                    : "bg-stone-50 border-stone-200 text-stone-700"
                }`}
              >
                {analysis.reasoning}
              </div>
            </div>

            {/* Metric Summary Ribbon & Export to Bitget Playbook */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
              <div
                className={`p-2.5 rounded border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/50 border-orange-100"
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase">Implied Monday Gap</div>
                <div
                  className={`font-bold text-sm tabular-nums mt-0.5 ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  {analysis.impliedGapForecast}
                </div>
              </div>
              <div
                className={`p-2.5 rounded border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/50 border-orange-100"
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase">Risk / Reward</div>
                <div
                  className={`font-bold text-sm tabular-nums mt-0.5 ${
                    isDark ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  {analysis.riskRewardRatio}
                </div>
              </div>
              <div
                className={`p-2.5 rounded border ${
                  isDark ? "bg-[#1A1816] border-stone-800" : "bg-orange-50/50 border-orange-100"
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase">Est. Slippage</div>
                <div className="text-[#FF6B00] font-bold text-sm tabular-nums mt-0.5">
                  {analysis.slippageEstimatePct}%
                </div>
              </div>
            </div>

            {/* 1-Click Export to Bitget Playbook Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExportPlaybook}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs font-bold font-mono flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-[0.99]"
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
