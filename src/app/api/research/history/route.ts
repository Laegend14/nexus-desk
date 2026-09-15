import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ticker = searchParams.get("ticker");
    const limit = parseInt(searchParams.get("limit") || "60", 10);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true, data: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    let queryBuilder = supabase
      .from("research_memos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (ticker && ticker.toUpperCase() !== "ALL") {
      queryBuilder = queryBuilder.eq("ticker", ticker.toUpperCase());
    }

    const { data, error } = await queryBuilder;
    if (error) {
      console.error("Supabase fetch history error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("History API GET exception:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (clearAll) {
      const { error } = await supabase
        .from("research_memos")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      if (error) throw error;
      return NextResponse.json({ success: true, cleared: true });
    }

    if (id) {
      const { error } = await supabase.from("research_memos").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ success: false, error: "Missing memo id" }, { status: 400 });
  } catch (err: any) {
    console.error("History API DELETE exception:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to delete" },
      { status: 500 }
    );
  }
}
