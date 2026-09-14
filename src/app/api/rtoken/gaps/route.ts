import { NextResponse } from "next/server";
import { getLiveStockGaps } from "@/services/rTokenService";

export async function GET() {
  try {
    const gaps = await getLiveStockGaps();
    return NextResponse.json({
      success: true,
      data: gaps,
      marketStatus: "US_NATIVE_CLOSED_RTOKEN_24_7_ACTIVE",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch stock gaps" },
      { status: 500 }
    );
  }
}
