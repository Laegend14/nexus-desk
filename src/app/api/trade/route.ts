import { NextResponse } from "next/server";
import { executeBitgetPaperOrder } from "@/services/bitgetTradeService";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { symbol = "NVDAUSDT", side = "buy", orderType = "market", price, size = 10, reasoningTag } = body;

    const result = await executeBitgetPaperOrder({
      symbol,
      side,
      orderType,
      price,
      size,
      reasoningTag,
    });

    // Try to record execution in Supabase paper_trade_journal
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.from("paper_trade_journal").insert([
          {
            order_id: result.orderId,
            symbol: result.symbol,
            side: result.side.toLowerCase(),
            order_type: orderType,
            price: result.executedPrice,
            size: result.executedSize,
            status: result.status.toLowerCase(),
            reasoning_tag: reasoningTag || "NexusDesk Qwen Gap Signal",
          },
        ]);
      }
    } catch (dbErr) {
      console.warn("Supabase trade record write optional notice:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to execute paper order" },
      { status: 500 }
    );
  }
}
