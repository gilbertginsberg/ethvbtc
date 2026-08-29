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
          background: "#f7f3ec",
          color: "#1b1a17",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#847d6c", textTransform: "uppercase" }}>
          Today&apos;s reading
        </div>
        <div style={{ display: "flex", fontSize: 180, fontStyle: "italic", marginTop: 12 }}>
          {ratioPct}
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 14, color: "#0e8c74" }}>
          ethvbtc.com — of Bitcoin&apos;s market cap is what Ethereum is worth
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
