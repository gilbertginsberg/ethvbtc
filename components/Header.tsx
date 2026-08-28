"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";

export function Header({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-bold tracking-tight sm:text-base">
            <span className="text-btc">ETH</span>
            <span className="text-muted"> vs </span>
            <span className="text-eth">BTC</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
          <span className="hidden text-muted sm:inline">Live ratio</span>
          <span className="rounded-full border border-surface-border bg-surface px-3 py-1 tabular">
            <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
          </span>
        </div>
      </div>
    </header>
  );
}
