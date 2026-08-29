"use client";

import type { ReactNode } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { ApiData, CoinMarketData } from "@/lib/types";
import { formatPercent, formatUsd } from "@/lib/format";
import { BitcoinIcon, EthereumIcon } from "./CoinIcon";

function Sparkline({ prices, color }: { prices: number[]; color: string }) {
  const data = prices.map((p, i) => ({ i, p }));
  return (
    <div className="h-10 w-24 sm:w-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="p" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CoinCard({
  coin,
  accent,
  name,
  icon,
}: {
  coin: CoinMarketData;
  accent: string;
  name: string;
  icon: ReactNode;
}) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <div className="elevation-hover rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm text-muted">
              {name} · {coin.symbol.toUpperCase()}
            </span>
          </div>
          <div className="mt-2 text-3xl tabular sm:text-4xl">{formatUsd(coin.current_price)}</div>
          <div className={`mt-1 text-sm tabular ${up ? "text-up" : "text-down"}`}>
            {formatPercent(coin.price_change_percentage_24h)} today
          </div>
        </div>
        {coin.sparkline_in_7d?.price && (
          <Sparkline prices={coin.sparkline_in_7d.price} color={accent} />
        )}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
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
        <CoinCard coin={data.btc} accent="var(--color-btc)" name="Bitcoin" icon={<BitcoinIcon size={22} />} />
        <CoinCard coin={data.eth} accent="var(--color-eth)" name="Ethereum" icon={<EthereumIcon size={22} />} />
      </div>
    </section>
  );
}
