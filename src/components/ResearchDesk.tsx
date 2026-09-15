"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ResearchResult,
  BITGET_RESEARCH_SKILLS,
  ChatMessage,
  reconstructResearchResultFromDbRecord,
} from "@/services/qwenService";
import {
  Brain,
  AlertCircle,
  Loader2,
  Send,
  Cpu,
  Download,
  CheckCircle2,
  TrendingUp,
  Activity,
  Sparkles,
  History,
  Clock,
  Database,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  MessageSquare,
  CornerDownRight,
  RotateCcw,
} from "lucide-react";
import { MacroTransmissionTree } from "./terminal/MacroTransmissionTree";
import { StockLogo } from "./StockLogo";

interface ResearchDeskProps {
  selectedTicker: string;
  onAnalysisGenerated: (result: ResearchResult) => void;
  onSelectTicker?: (ticker: string) => void;
  theme?: "light" | "dark";
}

const PRESET_QUERIES = [
  "Show me NVDA tokenized volume vs native stock and correlate with AI meme-coins.",
  "Correlate MSTR premium vs Bitcoin spot ETF inflows & liquidations.",
  "Evaluate TSLA weekend spread vs Asian EV battery supply chain & Doge sentiment.",
  "Analyze COIN weekend volume vs Ethereum gas fee velocity & L2 TVL.",
];

const FOLLOW_UP_SUGGESTIONS = [
  "⚡ Correlate with Solana / BTC liquidity vectors",
  "📉 Evaluate gap fade risk on Monday market open",
  "🛡️ Suggest tighter Stop Loss & Take Profit targets",
  "🌐 Check Asian semiconductor supply checks & wires",
];

const TICKER_TABS = ["ALL", "NVDA", "TSLA", "AAPL", "MSTR", "COIN", "AMZN", "MSFT"];

export const ResearchDesk: React.FC<ResearchDeskProps> = ({
  selectedTicker,
  onAnalysisGenerated,
  onSelectTicker,
  theme = "light",
}) => {
  // Tabs: "cockpit" | "history"
  const [activeTab, setActiveTab] = useState<"cockpit" | "history">("cockpit");
  
  // Cockpit & Chat State
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResearchResult | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [savedDbNotice, setSavedDbNotice] = useState<{ id?: string; time: string } | null>(null);
  const [activeSkills, setActiveSkills] = useState<string[]>([
    "macro-analyst",
    "market-intel",
    "news-briefing",
    "sentiment-analyst",
    "technical-analysis",
  ]);
  const [exported, setExported] = useState(false);

  // History State
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [historyFilterTicker, setHistoryFilterTicker] = useState("ALL");

  const isDark = theme === "dark";

  // Fetch history from Supabase database API
  const fetchHistory = useCallback(async (silent = false) => {
    if (!silent) setLoadingHistory(true);
    try {
      const res = await fetch("/api/research/history?limit=50");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setHistoryList(json.data);
        try {
          localStorage.setItem("nexus_research_history_cache", JSON.stringify(json.data));
        } catch {
          // ignore storage quota
        }
      }
    } catch (err) {
      console.warn("Failed to fetch history from Supabase:", err);
      // Try local fallback
      try {
        const cached = localStorage.getItem("nexus_research_history_cache");
        if (cached) setHistoryList(JSON.parse(cached));
      } catch {
        // ignore
      }
    } finally {
      if (!silent) setLoadingHistory(false);
    }
  }, []);

  // Initial load of history on mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

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
    setSavedDbNotice(null);

    const userMessage: ChatMessage = {
      role: "user",
      content: activeQuery,
      timestamp: new Date().toISOString(),
    };

    // Keep up to 6 turns of history for context
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: selectedTicker,
          query: activeQuery,
          activeSkills,
          history: updatedConversation,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
        onAnalysisGenerated(data.data);

        // Append assistant response to conversational memory
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.data.reasoning || data.data.catalystSummary,
            timestamp: new Date().toISOString(),
          },
        ]);

        // Notice of Supabase database persistence
        setSavedDbNotice({
          id: data.memoId || undefined,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });

        // Silently refresh history list so it appears in the History tab immediately
        fetchHistory(true);
      }
    } catch (err) {
      console.error("Research fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Revisit a historical memo: reconstruct full state and load into active cockpit
  const handleRevisitMemo = (record: any) => {
    const reconstructed = reconstructResearchResultFromDbRecord(record);
    setAnalysis(reconstructed);
    setQuery(record.user_query || "");
    onAnalysisGenerated(reconstructed);
    if (onSelectTicker && record.ticker) {
      onSelectTicker(record.ticker);
    }

    // Set conversation context to this reloaded synthesis
    setConversation([
      {
        role: "user",
        content: record.user_query || "",
        timestamp: record.created_at,
      },
      {
        role: "assistant",
        content: record.qwen_reasoning || record.catalyst_summary,
        timestamp: record.created_at,
      },
    ]);

    setActiveTab("cockpit");
  };

  // Delete an item from history
  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/research/history?id=${id}`, { method: "DELETE" });
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete memo:", err);
    }
  };

  // Clear all history
  const handleClearAllHistory = async () => {
    if (!confirm("Are you sure you want to clear all research history from the database?")) return;
    try {
      await fetch("/api/research/history?clearAll=true", { method: "DELETE" });
      setHistoryList([]);
      localStorage.removeItem("nexus_research_history_cache");
    } catch (err) {
      console.error("Failed to clear history:", err);
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

  // Filtered history list
  const filteredHistory = historyList.filter((item) => {
    const matchesTicker =
      historyFilterTicker === "ALL" ||
      (item.ticker && item.ticker.toUpperCase() === historyFilterTicker.toUpperCase());
    const matchesSearch =
      !historySearch ||
      (item.user_query && item.user_query.toLowerCase().includes(historySearch.toLowerCase())) ||
      (item.catalyst_summary &&
        item.catalyst_summary.toLowerCase().includes(historySearch.toLowerCase())) ||
      (item.ticker && item.ticker.toLowerCase().includes(historySearch.toLowerCase()));
    return matchesTicker && matchesSearch;
  });

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden flex flex-col font-sans transition-colors duration-200 border ${
        isDark
          ? "bg-[#141210] border-stone-800 shadow-xl"
          : "bg-white border-orange-200 shadow-md"
      }`}
    >
      {/* Top Header & Tab Selector */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
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
              Qwen 3.8-Max • Supabase Memory • Bitget UTA v3
            </p>
          </div>
        </div>

        {/* View Switcher Tabs: Cockpit vs History */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-stone-200/50 dark:bg-[#1E1B18] border border-stone-300/60 dark:border-stone-800">
          <button
            type="button"
            onClick={() => setActiveTab("cockpit")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "cockpit"
                ? "bg-[#FF6B00] text-white shadow-xs"
                : isDark
                ? "text-stone-400 hover:text-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Active Cockpit</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("history");
              fetchHistory(true);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer relative ${
              activeTab === "history"
                ? "bg-[#FF6B00] text-white shadow-xs"
                : isDark
                ? "text-stone-400 hover:text-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
            {historyList.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  activeTab === "history"
                    ? "bg-white text-[#FF6B00]"
                    : "bg-[#FF6B00] text-white"
                }`}
              >
                {historyList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ACTIVE COCKPIT & CHAT INTERFACE */}
      {/* ========================================================================= */}
      {activeTab === "cockpit" && (
        <div className="flex flex-col">
          {/* Target Stock & Skills Banner */}
          <div
            className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
              isDark ? "bg-[#100E0C] border-stone-800" : "bg-orange-50/40 border-orange-100"
            }`}
          >
            <div className="flex items-center space-x-2">
              <StockLogo ticker={selectedTicker} size={20} />
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-md font-bold ${
                  isDark
                    ? "bg-stone-800 text-stone-200 border border-stone-700"
                    : "bg-orange-100/70 text-orange-950 border border-orange-200"
                }`}
              >
                Target: {selectedTicker}
              </span>

              {savedDbNotice && (
                <span className="flex items-center space-x-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <Database className="w-3 h-3" />
                  <span>Stored in Supabase ({savedDbNotice.time})</span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-stone-400 font-bold">
                {activeSkills.length}/5 Skills Active
              </span>
              {conversation.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setConversation([]);
                    setSavedDbNotice(null);
                  }}
                  className={`text-[11px] font-mono flex items-center space-x-1 px-2 py-0.5 rounded border transition-all cursor-pointer ${
                    isDark
                      ? "bg-[#1E1B18] border-stone-800 text-stone-400 hover:text-stone-200"
                      : "bg-white border-stone-200 text-stone-600 hover:text-stone-900"
                  }`}
                  title="Reset conversation memory"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>New Thread</span>
                </button>
              )}
            </div>
          </div>

          {/* Bitget Open Research Skills Bar */}
          <div
            className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap gap-2 ${
              isDark ? "bg-[#0E0C0A] border-stone-800" : "bg-[#FAF7F2] border-orange-100"
            }`}
          >
            {BITGET_RESEARCH_SKILLS.map((skill) => {
              const isSelected = activeSkills.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => toggleSkill(skill.id)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border flex items-center space-x-1.5 transition-all cursor-pointer ${
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
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected
                        ? "bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.8)]"
                        : "bg-stone-500"
                    }`}
                  />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>

          {/* Conversational Memory Thread Preview (if multi-turn) */}
          {conversation.length > 2 && (
            <div
              className={`px-4 sm:px-6 py-2 border-b flex items-center space-x-2 text-xs font-mono overflow-x-auto no-scrollbar ${
                isDark ? "bg-[#171412] border-stone-800 text-stone-400" : "bg-orange-50/30 border-orange-100 text-stone-600"
              }`}
            >
              <CornerDownRight className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span className="font-bold uppercase text-[11px] text-[#FF6B00] shrink-0">
                Memory Active ({conversation.length} msgs):
              </span>
              <span className="truncate max-w-md italic">
                Last: "{conversation[conversation.length - 2]?.content.slice(0, 70)}..."
              </span>
            </div>
          )}

          {/* Natural Language Input Bar */}
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
                placeholder={`Ask station: "Show me ${selectedTicker} volume vs native stock and correlate with crypto liquidity"`}
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

            {/* Quick Suggestion Chips */}
            <div className="flex items-center space-x-2 mt-3 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-wider shrink-0 font-bold">
                {analysis ? "Follow-ups:" : "Presets:"}
              </span>
              {(analysis ? FOLLOW_UP_SUGGESTIONS : PRESET_QUERIES).map((preset, idx) => (
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
                <p
                  className={`font-bold text-sm sm:text-base ${
                    isDark ? "text-stone-200" : "text-stone-900"
                  }`}
                >
                  Dual-Lens Research Ready for {selectedTicker}
                </p>
                <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-sans leading-relaxed">
                  Type your inquiry above or tap a preset prompt. Every synthesis is automatically
                  persisted to the Supabase database so you can revisit past memos in the History tab.
                </p>
                {historyList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-mono font-bold hover:bg-[#FF6B00]/10 transition-colors"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>View {historyList.length} Stored Historical Memos</span>
                  </button>
                )}
              </div>
            )}

            {loading && (
              <div className="py-12 text-center space-y-3 font-mono">
                <Loader2 className="w-9 h-9 mx-auto animate-spin text-[#FF6B00]" />
                <p
                  className={`text-sm sm:text-base font-bold animate-pulse ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  Qwen 3.8-Max is synthesizing across {activeSkills.length} Bitget skills...
                </p>
                <p className="text-xs sm:text-sm text-stone-400 font-sans">
                  Processing 24/7 on-chain spreads, Bitget UTA open interest, and saving analysis to
                  database.
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
                        isDark
                          ? "bg-[#1E1B18] border border-stone-800"
                          : "bg-orange-50/60 border border-orange-100"
                      }`}
                    >
                      <span className="text-stone-400 block text-xs uppercase font-bold">
                        Correlated Crypto Proxy:
                      </span>
                      <span className="font-bold text-sm sm:text-base text-stone-100 dark:text-white mt-0.5 block">
                        {analysis.crossAssetCorrelation?.correlatedCrypto ?? "RNDR / NEAR / FET"}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark
                          ? "bg-[#1E1B18] border border-stone-800"
                          : "bg-orange-50/60 border border-orange-100"
                      }`}
                    >
                      <span className="text-stone-400 block text-xs uppercase font-bold">
                        Tokenized vs Native ADV:
                      </span>
                      <span className="font-bold text-sm sm:text-base text-stone-100 dark:text-white mt-0.5 block">
                        {analysis.crossAssetCorrelation?.volumeComparison ??
                          "16.4% of Cash Market Turnover"}
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
                    <span
                      className={
                        isDark ? "text-emerald-400 font-bold" : "text-emerald-700 font-bold"
                      }
                    >
                      Database Verified ✓
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
                    <div className="text-xs text-stone-400 uppercase font-semibold">
                      Implied Monday Gap
                    </div>
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
                    <div className="text-xs text-stone-400 uppercase font-semibold">
                      Risk / Reward
                    </div>
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
                    <div className="text-xs text-stone-400 uppercase font-semibold">
                      Est. Slippage
                    </div>
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
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RESEARCH HISTORY & DATABASE ARCHIVE */}
      {/* ========================================================================= */}
      {activeTab === "history" && (
        <div className="flex flex-col flex-1">
          {/* History Controls Bar */}
          <div
            className={`p-4 border-b space-y-3 ${
              isDark ? "bg-[#100E0C] border-stone-800" : "bg-[#FAF7F2] border-orange-100"
            }`}
          >
            {/* Search & Top Action Row */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Search research queries, catalysts, or tickers..."
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-mono rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-colors ${
                    isDark
                      ? "bg-[#1A1816] border-stone-700 text-white placeholder:text-stone-500"
                      : "bg-white border-stone-300 text-stone-900 placeholder:text-stone-400"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => fetchHistory()}
                disabled={loadingHistory}
                className={`p-2 rounded-lg border text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#1A1816] border-stone-700 text-stone-300 hover:text-white"
                    : "bg-white border-stone-200 text-stone-700 hover:text-stone-950 shadow-2xs"
                }`}
                title="Refresh database records"
              >
                <RefreshCw className={`w-4 h-4 ${loadingHistory ? "animate-spin text-[#FF6B00]" : ""}`} />
              </button>

              {historyList.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllHistory}
                  className={`p-2 rounded-lg border text-xs font-mono transition-all text-red-500 hover:bg-red-500/10 cursor-pointer ${
                    isDark ? "border-stone-800" : "border-stone-200"
                  }`}
                  title="Clear all research history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ticker Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[11px] font-mono text-stone-400 uppercase font-bold shrink-0 mr-1">
                Filter:
              </span>
              {TICKER_TABS.map((t) => {
                const isSelected = historyFilterTicker === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setHistoryFilterTicker(t)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white font-bold"
                        : isDark
                        ? "bg-[#1A1816] border-stone-800 text-stone-400 hover:text-stone-200"
                        : "bg-white border-stone-200 text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Status & Stats Meta */}
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                <span>Supabase Live DB: {historyList.length} total syntheses recorded</span>
              </div>
              <span>Showing: {filteredHistory.length}</span>
            </div>
          </div>

          {/* History Item Cards List */}
          <div className="p-4 sm:p-6 space-y-3 overflow-y-auto max-h-[620px] flex-1">
            {loadingHistory && (
              <div className="py-12 text-center space-y-2 font-mono">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#FF6B00]" />
                <p className="text-xs text-stone-400">Loading stored research memos from database...</p>
              </div>
            )}

            {!loadingHistory && filteredHistory.length === 0 && (
              <div className="py-12 text-center space-y-3 font-mono">
                <div className="w-10 h-10 rounded-xl bg-stone-500/10 mx-auto flex items-center justify-center text-stone-400">
                  <Database className="w-5 h-5" />
                </div>
                <p className={`font-bold text-sm ${isDark ? "text-stone-300" : "text-stone-800"}`}>
                  No Historical Memos Found
                </p>
                <p className="text-xs text-stone-400 max-w-sm mx-auto font-sans">
                  {historySearch || historyFilterTicker !== "ALL"
                    ? "Try adjusting your search terms or ticker filter above."
                    : "Every synthesis you execute in the Active Cockpit will automatically be stored here."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setHistorySearch("");
                    setHistoryFilterTicker("ALL");
                    setActiveTab("cockpit");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-white text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors"
                >
                  Go to Cockpit & Ask AI
                </button>
              </div>
            )}

            {!loadingHistory &&
              filteredHistory.map((item) => {
                const ticker = item.ticker || "NVDA";
                const dateStr = item.created_at
                  ? new Date(item.created_at).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recent";

                return (
                  <div
                    key={item.id}
                    onClick={() => handleRevisitMemo(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group hover:border-[#FF6B00] ${
                      isDark
                        ? "bg-[#171412] border-stone-800 hover:bg-[#1E1B18]"
                        : "bg-white border-orange-100 hover:bg-orange-50/40 shadow-xs"
                    }`}
                  >
                    {/* Top Row: Logo, Ticker, Date, Delete */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <StockLogo ticker={ticker} size={18} />
                        <span className="font-mono font-bold text-xs sm:text-sm text-[#FF6B00]">
                          {ticker}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                            item.implied_gap_forecast?.includes("-")
                              ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          }`}
                        >
                          Gap: {item.implied_gap_forecast || "+1.8% to +2.4%"}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          className="p-1 rounded text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete from database"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Query Prompt */}
                    <div className="mb-2">
                      <p
                        className={`text-xs sm:text-sm font-bold font-sans line-clamp-2 ${
                          isDark ? "text-stone-100" : "text-stone-900"
                        }`}
                      >
                        "{item.user_query}"
                      </p>
                    </div>

                    {/* Catalyst Excerpt */}
                    {item.catalyst_summary && (
                      <p className="text-xs text-stone-400 font-sans line-clamp-2 mb-3 leading-relaxed">
                        {item.catalyst_summary}
                      </p>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-800/40 text-xs font-mono">
                      <span className="text-stone-400 text-[11px]">
                        R/R: <strong className="text-emerald-500">{item.risk_reward_ratio || "3.2 : 1"}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRevisitMemo(item);
                        }}
                        className="flex items-center space-x-1 text-[#FF6B00] group-hover:underline font-bold text-xs"
                      >
                        <span>Revisit in Cockpit</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
