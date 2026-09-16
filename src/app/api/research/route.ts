import { NextResponse } from "next/server";
import { runStockResearch } from "@/services/qwenService";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      ticker = "NVDA",
      query = "Analyze weekend gap and macro transmission",
      activeSkills,
      history = [],
    } = body;

    const analysis = await runStockResearch(ticker, query, activeSkills, history);

    let memoId: string | null = null;

    // Persist to Supabase if credentials are valid
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: insertedData, error: dbError } = await supabase
          .from("research_memos")
          .insert([
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
          ])
          .select("id")
          .single();

        if (dbError) {
          console.warn("Supabase record write notice:", dbError.message);
        } else if (insertedData) {
          memoId = insertedData.id;
        }
      }
    } catch (dbErr) {
      console.warn("Supabase record write optional notice:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: analysis,
      memoId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to execute research synthesis" },
      { status: 500 }
    );
  }
}
