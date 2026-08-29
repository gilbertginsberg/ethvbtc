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
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <p className="font-medium text-xs uppercase tracking-[0.2em] text-muted">
        Worth knowing
      </p>
      <h2 className="mt-1 mb-5 font-serif text-2xl italic">A few extras</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-xs uppercase tracking-wide text-muted">
            ETH price, if it flipped today
          </p>
          <p className="mt-2 font-serif text-3xl tabular text-eth">
            {formatUsd(flippeningPrice)}
          </p>
          <p className="mt-2 text-xs text-muted">
            {priceUpside >= 0 ? "+" : ""}
            {priceUpside.toFixed(1)}% from today&rsquo;s price — a hypothetical, not a forecast.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-xs uppercase tracking-wide text-muted">
            24h volume, ETH vs BTC
          </p>
          <p className="mt-2 font-serif text-3xl tabular">{(volumeRatio * 100).toFixed(1)}%</p>
          <p className="mt-2 text-xs text-muted">
            ETH moved {formatUsd(eth.total_volume)} against BTC&rsquo;s{" "}
            {formatUsd(btc.total_volume)} in the last day.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-xs uppercase tracking-wide text-muted">
            Share of the whole crypto market
          </p>
          {global ? (
            <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div className="bg-btc" style={{ width: `${global.market_cap_percentage?.btc ?? 0}%` }} />
              <div className="bg-eth" style={{ width: `${global.market_cap_percentage?.eth ?? 0}%` }} />
              <div className="flex-1 bg-hairline" />
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted">Data unavailable</p>
          )}
          <p className="mt-2 text-xs text-muted">
            BTC {(global?.market_cap_percentage?.btc ?? 0).toFixed(1)}% · ETH{" "}
            {(global?.market_cap_percentage?.eth ?? 0).toFixed(1)}%
            {restDominance !== null ? ` · everything else ${restDominance.toFixed(1)}%` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
