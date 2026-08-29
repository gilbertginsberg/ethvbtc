"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";
import { formatUsd } from "@/lib/format";

const TICKS = [0, 25, 50, 75, 100];

export function Hero({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  const markerPos = Math.min(100, ratioPct);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
      <p className="font-medium text-xs uppercase tracking-[0.2em] text-muted">
        Today&rsquo;s reading
      </p>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="font-serif text-7xl italic leading-none tracking-tight text-ink sm:text-8xl">
          <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
        </h1>
        <p className="max-w-sm text-sm text-ink-soft sm:text-base">
          of Bitcoin&rsquo;s market cap is what Ethereum is worth right now.
        </p>
      </div>

      {/* Meter: where today's reading sits on the road to parity */}
      <div className="mt-10 max-w-2xl">
        <div className="relative h-2 rounded-full bg-surface-2">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-eth/70 transition-all duration-700"
            style={{ width: `${markerPos}%` }}
          />
          {TICKS.map((t) => (
            <div
              key={t}
              className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-hairline"
              style={{ left: `${t}%` }}
            />
          ))}
          <div
            className="absolute top-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center transition-all duration-700"
            style={{ left: `${markerPos}%` }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-paper bg-accent shadow-sm" />
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted">
          <span>0 — all Bitcoin</span>
          <span>100 — flippening</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted">
        <span>
          <span className="inline-block h-2 w-2 rounded-full bg-btc align-middle" />{" "}
          BTC {formatUsd(data.btc.market_cap)}
        </span>
        <span>
          <span className="inline-block h-2 w-2 rounded-full bg-eth align-middle" />{" "}
          ETH {formatUsd(data.eth.market_cap)}
        </span>
        <span>
          Updated {new Date(data.updatedAt).toLocaleTimeString()}
          {data.stale ? " · cached" : ""}
        </span>
      </div>
    </section>
  );
}
