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
          background: "#ffffff",
          color: "#202124",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={{ display: "flex", width: 22, height: 22, borderRadius: 11, background: "#1a73e8" }} />
          <div style={{ display: "flex", width: 22, height: 22, borderRadius: 11, background: "#ea4335" }} />
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5f6368" }}>Market cap ratio</div>
        <div style={{ display: "flex", fontSize: 170, fontWeight: 400, marginTop: 6 }}>{ratioPct}</div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 10, color: "#1a73e8" }}>
          ethvbtc.com — live flippening tracker
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
