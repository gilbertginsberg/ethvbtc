import type { ApiData } from "@/lib/types";
import { formatUsd } from "@/lib/format";

export function FunStats({ data }: { data: ApiData }) {
  const { btc, eth, global } = data;

  const flippeningPrice = btc.market_cap / eth.circulating_supply;
  const priceUpside = (flippeningPrice / eth.current_price - 1) * 100;
  const volumeRatio = eth.total_volume / btc.total_volume;
  const restDominance = global
    ? 100 -
      (global.market_cap_percentage?.btc ?? 0) -
      (global.market_cap_percentage?.eth ?? 0)
    : null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted">
        Flippening Extras
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-surface-border bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            ETH Price If Flippening Happened Today
          </p>
          <p className="mt-2 font-mono text-2xl font-bold tabular text-eth">
            {formatUsd(flippeningPrice)}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            {priceUpside >= 0 ? "+" : ""}
            {priceUpside.toFixed(1)}% from current price — hypothetical only, not financial
            advice.
          </p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            24h Volume Ratio (ETH / BTC)
          </p>
          <p className="mt-2 font-mono text-2xl font-bold tabular">
            {(volumeRatio * 100).toFixed(1)}%
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            ETH trades {formatUsd(eth.total_volume)} vs BTC&rsquo;s {formatUsd(btc.total_volume)}{" "}
            in the last 24h.
          </p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            Crypto Market Dominance
          </p>
          {global ? (
            <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-black/30">
              <div
                className="bg-btc"
                style={{ width: `${global.market_cap_percentage?.btc ?? 0}%` }}
              />
              <div
                className="bg-eth"
                style={{ width: `${global.market_cap_percentage?.eth ?? 0}%` }}
              />
              <div className="flex-1 bg-surface-border" />
            </div>
          ) : (
            <p className="mt-2 font-mono text-xs text-muted">Data unavailable</p>
          )}
          <p className="mt-2 font-mono text-xs text-muted">
            BTC {(global?.market_cap_percentage?.btc ?? 0).toFixed(1)}% · ETH{" "}
            {(global?.market_cap_percentage?.eth ?? 0).toFixed(1)}%
            {restDominance !== null ? ` · Rest ${restDominance.toFixed(1)}%` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
