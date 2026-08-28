import { NextResponse } from "next/server";
import { fetchRatioHistory } from "@/lib/coingecko";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "max";
  const days: number | "max" =
    range === "30" ? 30 : range === "90" ? 90 : range === "365" ? 365 : "max";

  try {
    const points = await fetchRatioHistory(days);
    return NextResponse.json(
      { points },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 502 });
  }
}
