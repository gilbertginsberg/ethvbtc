import { ImageResponse } from "next/og";
import { fetchLiveData } from "@/lib/coingecko";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  let ratioPct = "—";
  try {
    const data = await fetchLiveData();
    ratioPct = `${(data.ratio * 100).toFixed(2)}%`;
  } catch {
    // fall back to placeholder text below
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          color: "#f2f2f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, letterSpacing: 4, color: "#8b8b99" }}>
          MARKET CAP RATIO · ETH / BTC
        </div>
        <div style={{ display: "flex", fontSize: 160, fontWeight: 700, marginTop: 20 }}>
          {ratioPct}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 10, color: "#627eea" }}>
          ethvbtc.com — Live Flippening Tracker
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
