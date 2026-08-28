"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { ApiData, CoinMarketData } from "@/lib/types";
import { formatPercent, formatUsd } from "@/lib/format";

function Sparkline({ prices, color }: { prices: number[]; color: string }) {
  const data = prices.map((p, i) => ({ i, p }));
  return (
    <div className="h-12 w-24 sm:w-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="p" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CoinCard({ coin, accent, name }: { coin: CoinMarketData; accent: string; name: string }) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <div className="rounded-xl border border-surface-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            <span className="font-mono text-xs uppercase tracking-wide text-muted">
              {name} · {coin.symbol.toUpperCase()}
            </span>
          </div>
          <div className="mt-1 font-mono text-2xl font-bold tabular sm:text-3xl">
            {formatUsd(coin.current_price)}
          </div>
          <div
            className={`mt-1 font-mono text-sm tabular ${up ? "text-up" : "text-down"}`}
          >
            {formatPercent(coin.price_change_percentage_24h)} (24h)
          </div>
        </div>
        {coin.sparkline_in_7d?.price && (
          <Sparkline prices={coin.sparkline_in_7d.price} color={accent} />
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-surface-border pt-4 font-mono text-xs">
        <div>
          <dt className="text-muted">Market Cap</dt>
          <dd className="tabular">{formatUsd(coin.market_cap)}</dd>
        </div>
        <div>
          <dt className="text-muted">24h Volume</dt>
          <dd className="tabular">{formatUsd(coin.total_volume)}</dd>
        </div>
        <div>
          <dt className="text-muted">Circulating Supply</dt>
          <dd className="tabular">
            {coin.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Max Supply</dt>
          <dd className="tabular">
            {coin.max_supply ? coin.max_supply.toLocaleString() : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted">All-Time High</dt>
          <dd className="tabular">{formatUsd(coin.ath)}</dd>
        </div>
        <div>
          <dt className="text-muted">From ATH</dt>
          <dd className="tabular text-down">
            {formatPercent(coin.ath_change_percentage)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function StatCards({ data }: { data: ApiData }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CoinCard coin={data.btc} accent="var(--color-btc)" name="Bitcoin" />
        <CoinCard coin={data.eth} accent="var(--color-eth)" name="Ethereum" />
      </div>
    </section>
  );
}
