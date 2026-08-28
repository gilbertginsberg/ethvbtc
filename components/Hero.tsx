"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";
import { formatUsd } from "@/lib/format";

export function Hero({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  const btcShare = 100 - ratioPct;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center sm:px-6 sm:pt-16">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Market Cap Ratio · ETH / BTC
      </p>
      <div className="mt-3 font-mono text-6xl font-bold tabular sm:text-8xl">
        <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
      </div>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
        Ethereum&rsquo;s market cap is currently{" "}
        <span className="font-semibold text-foreground">{ratioPct.toFixed(2)}%</span> of
        Bitcoin&rsquo;s. If that ratio ever crosses 100%, the &ldquo;flippening&rdquo; has
        happened.
      </p>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="flex h-10 w-full overflow-hidden rounded-full border border-surface-border bg-surface">
          <div
            className="flex items-center justify-start bg-btc px-3 font-mono text-xs font-bold text-black transition-all duration-700"
            style={{ width: `${Math.max(btcShare, 6)}%` }}
          >
            BTC {btcShare.toFixed(1)}%
          </div>
          <div
            className="flex items-center justify-end bg-eth px-3 font-mono text-xs font-bold text-black transition-all duration-700"
            style={{ width: `${Math.max(ratioPct, 6)}%` }}
          >
            ETH {ratioPct.toFixed(1)}%
          </div>
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-muted">
          <span>{formatUsd(data.btc.market_cap)}</span>
          <span>{formatUsd(data.eth.market_cap)}</span>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] text-muted">
        Last updated {new Date(data.updatedAt).toLocaleTimeString()}
        {data.stale ? " · showing cached data (live feed temporarily delayed)" : ""}
      </p>
    </section>
  );
}
