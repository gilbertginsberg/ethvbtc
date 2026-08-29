"use client";

import { CountUp } from "./CountUp";
import type { ApiData } from "@/lib/types";

export function Header({ data }: { data: ApiData }) {
  const ratioPct = data.ratio * 100;
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink text-[10px] font-semibold">
            ⇄
          </span>
          <span className="font-serif text-lg font-medium tracking-tight sm:text-xl">
            ETH<span className="text-muted"> / </span>BTC
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="hidden text-muted sm:inline">Ratio right now</span>
          <span className="rounded-full border border-hairline bg-surface px-3 py-1 font-medium tabular">
            <CountUp value={ratioPct} decimals={2} format={(v) => `${v.toFixed(2)}%`} />
          </span>
        </div>
      </div>
    </header>
  );
}
