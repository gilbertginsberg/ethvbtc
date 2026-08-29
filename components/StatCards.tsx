"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { ApiData, CoinMarketData } from "@/lib/types";
import { formatPercent, formatUsd } from "@/lib/format";

function Sparkline({ prices, color }: { prices: number[]; color: string }) {
  const data = prices.map((p, i) => ({ i, p }));
  return (
    <div className="h-10 w-24 sm:w-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="p" stroke={color} strokeWidth={1.75} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CoinCard({
  coin,
  accent,
  accentSoft,
  name,
}: {
  coin: CoinMarketData;
  accent: string;
  accentSoft: string;
  name: string;
}) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <div
      className="rounded-2xl border border-hairline bg-surface p-6"
      style={{ borderTopColor: accent, borderTopWidth: 3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
            style={{ background: accentSoft, color: accent }}
          >
            {name} · {coin.symbol.toUpperCase()}
          </span>
          <div className="mt-2 font-serif text-3xl tabular sm:text-4xl">
            {formatUsd(coin.current_price)}
          </div>
          <div className={`mt-1 text-sm tabular ${up ? "text-up" : "text-down"}`}>
            {formatPercent(coin.price_change_percentage_24h)} today
          </div>
        </div>
        {coin.sparkline_in_7d?.price && (
          <Sparkline prices={coin.sparkline_in_7d.price} color={accent} />
        )}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-hairline pt-4 text-xs">
        <div>
          <dt className="text-muted">Market cap</dt>
          <dd className="tabular text-ink-soft">{formatUsd(coin.market_cap)}</dd>
        </div>
        <div>
          <dt className="text-muted">24h volume</dt>
          <dd className="tabular text-ink-soft">{formatUsd(coin.total_volume)}</dd>
        </div>
        <div>
          <dt className="text-muted">Circulating supply</dt>
          <dd className="tabular text-ink-soft">
            {coin.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Max supply</dt>
          <dd className="tabular text-ink-soft">
            {coin.max_supply ? coin.max_supply.toLocaleString() : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted">All-time high</dt>
          <dd className="tabular text-ink-soft">{formatUsd(coin.ath)}</dd>
        </div>
        <div>
          <dt className="text-muted">From ATH</dt>
          <dd className="tabular text-down">{formatPercent(coin.ath_change_percentage)}</dd>
        </div>
      </dl>
    </div>
  );
}

export function StatCards({ data }: { data: ApiData }) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CoinCard coin={data.btc} accent="var(--color-btc)" accentSoft="var(--color-btc-soft)" name="Bitcoin" />
        <CoinCard coin={data.eth} accent="var(--color-eth)" accentSoft="var(--color-eth-soft)" name="Ethereum" />
      </div>
    </section>
  );
}
