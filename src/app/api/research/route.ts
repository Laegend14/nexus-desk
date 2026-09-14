import { NextResponse } from "next/server";
import { runStockResearch } from "@/services/qwenService";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      ticker = "NVDA",
      query = "Analyze weekend gap and macro transmission",
      activeSkills,
    } = body;

    const analysis = await runStockResearch(ticker, query, activeSkills);

    // Try to persist to Supabase if credentials are valid
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("research_memos").insert([
          {
            ticker: analysis.ticker,
            user_query: query,
            qwen_reasoning: analysis.reasoning,
            catalyst_summary: analysis.catalystSummary,
            transmission_chain: JSON.stringify(analysis.transmissionChain),
            implied_gap_forecast: analysis.impliedGapForecast,
            risk_reward_ratio: analysis.riskRewardRatio,
            playbook_spec: analysis.playbookSpec,
          },
        ]);
      }
    } catch (dbErr) {
      console.warn("Supabase record write optional notice:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to execute research synthesis" },
      { status: 500 }
    );
  }
}
