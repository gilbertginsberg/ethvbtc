import type { ApiData, CoinMarketData, GlobalData } from "./types";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

function headers(): HeadersInit {
  const key = process.env.COINGECKO_API_KEY;
  return key ? { "x-cg-demo-api-key": key } : {};
}

// Module-level fallback so a rate-limited/failed upstream call still
// serves the last good response instead of erroring out.
let lastGood: ApiData | null = null;

export async function fetchLiveData(): Promise<ApiData> {
  try {
    const marketsRes = await fetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&sparkline=true&price_change_percentage=1h,24h,7d,30d,1y`,
      { headers: headers(), next: { revalidate: 60 } }
    );
    if (!marketsRes.ok) throw new Error(`markets ${marketsRes.status}`);
    const markets: CoinMarketData[] = await marketsRes.json();

    const btc = markets.find((c) => c.id === "bitcoin");
    const eth = markets.find((c) => c.id === "ethereum");
    if (!btc || !eth) throw new Error("missing btc/eth in markets response");

    let global: GlobalData | null = null;
    try {
      const globalRes = await fetch(`${COINGECKO_BASE}/global`, {
        headers: headers(),
        next: { revalidate: 60 },
      });
      if (globalRes.ok) {
        const json = await globalRes.json();
        global = json.data as GlobalData;
      }
    } catch {
      // global dominance data is nice-to-have; ignore failures
    }

    const data: ApiData = {
      btc,
      eth,
      global,
      ratio: eth.market_cap / btc.market_cap,
      updatedAt: Date.now(),
    };
    lastGood = data;
    return data;
  } catch (err) {
    if (lastGood) {
      return { ...lastGood, stale: true };
    }
    throw err;
  }
}

export interface RatioPoint {
  timestamp: number;
  ratio: number;
}

let lastGoodHistory: RatioPoint[] | null = null;

export async function fetchRatioHistory(days: number | "max" = "max"): Promise<RatioPoint[]> {
  try {
    const [btcRes, ethRes] = await Promise.all([
      fetch(
        `${COINGECKO_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`,
        { headers: headers(), next: { revalidate: 3600 } }
      ),
      fetch(
        `${COINGECKO_BASE}/coins/ethereum/market_chart?vs_currency=usd&days=${days}&interval=daily`,
        { headers: headers(), next: { revalidate: 3600 } }
      ),
    ]);
    if (!btcRes.ok || !ethRes.ok) throw new Error("market_chart fetch failed");

    const btcJson = await btcRes.json();
    const ethJson = await ethRes.json();
    const btcCaps: [number, number][] = btcJson.market_caps;
    const ethCaps: [number, number][] = ethJson.market_caps;

    const ethByDay = new Map<string, number>();
    for (const [ts, cap] of ethCaps) {
      ethByDay.set(dayKey(ts), cap);
    }

    const points: RatioPoint[] = [];
    for (const [ts, btcCap] of btcCaps) {
      const ethCap = ethByDay.get(dayKey(ts));
      if (ethCap && btcCap) {
        points.push({ timestamp: ts, ratio: ethCap / btcCap });
      }
    }
    lastGoodHistory = points;
    return points;
  } catch (err) {
    if (lastGoodHistory) return lastGoodHistory;
    throw err;
  }
}

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}
