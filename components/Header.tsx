"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";

export function Header({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <circle cx="7" cy="7" r="6.5" fill="var(--color-eth)" />
            <circle cx="15" cy="15" r="6.5" fill="var(--color-btc)" />
          </svg>
          <span className="text-lg font-medium tracking-tight text-ink-soft">
            ETH <span className="text-muted font-normal">vs</span> BTC
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden text-muted sm:inline">Ratio right now</span>
          <span className="rounded-full bg-eth-soft px-3 py-1 font-medium tabular text-eth">
            <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
          </span>
        </div>
      </div>
    </header>
  );
}
