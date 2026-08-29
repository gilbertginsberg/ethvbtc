import { NextResponse } from "next/server";
import { fetchLiveData } from "@/lib/coingecko";

export const revalidate = 60;

export async function GET() {
  try {
    const data = await fetchLiveData();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch live data" },
      { status: 502 }
    );
  }
}
