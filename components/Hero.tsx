"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";
import { formatUsd } from "@/lib/format";

export function Hero({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  const btcShare = 100 - ratioPct;

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 text-center sm:px-8 sm:pt-16">
      <p className="text-sm text-muted">Market cap ratio</p>
      <h1 className="mt-2 text-6xl font-normal tracking-tight text-ink tabular sm:text-7xl">
        <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base text-muted">
        Ethereum is worth {ratioPct.toFixed(2)}% of Bitcoin&rsquo;s market cap right now.
      </p>

      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-surface p-5 elevation-1">
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="bg-btc transition-all duration-700"
            style={{ width: `${Math.max(btcShare, 4)}%` }}
          />
          <div className="w-0.5 bg-surface" />
          <div
            className="bg-eth transition-all duration-700"
            style={{ width: `${Math.max(ratioPct, 4)}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-btc" />
            <span className="text-ink-soft">Bitcoin</span>
            <span className="tabular text-muted">{formatUsd(data.btc.market_cap)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="tabular text-muted">{formatUsd(data.eth.market_cap)}</span>
            <span className="text-ink-soft">Ethereum</span>
            <span className="h-2.5 w-2.5 rounded-full bg-eth" />
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">
        Updated {new Date(data.updatedAt).toLocaleTimeString()}
        {data.stale ? " · showing cached data" : ""}
      </p>
    </section>
  );
}
