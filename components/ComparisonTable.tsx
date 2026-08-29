import type { ApiData } from "@/lib/types";
import { formatDate, formatPercent, formatUsd } from "@/lib/format";

export function ComparisonTable({ data }: { data: ApiData }) {
  const { btc, eth, global } = data;
  const btcDom = global?.market_cap_percentage?.btc;
  const ethDom = global?.market_cap_percentage?.eth;

  const rows: { label: string; btc: string; eth: string }[] = [
    { label: "Price", btc: formatUsd(btc.current_price), eth: formatUsd(eth.current_price) },
    { label: "Market cap", btc: formatUsd(btc.market_cap), eth: formatUsd(eth.market_cap) },
    { label: "24h volume", btc: formatUsd(btc.total_volume), eth: formatUsd(eth.total_volume) },
    {
      label: "Circulating supply",
      btc: btc.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      eth: eth.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    },
    {
      label: "Market dominance",
      btc: btcDom !== undefined ? `${btcDom.toFixed(2)}%` : "—",
      eth: ethDom !== undefined ? `${ethDom.toFixed(2)}%` : "—",
    },
    { label: "All-time high", btc: formatUsd(btc.ath), eth: formatUsd(eth.ath) },
    { label: "ATH date", btc: formatDate(btc.ath_date), eth: formatDate(eth.ath_date) },
    {
      label: "30D change",
      btc: formatPercent(btc.price_change_percentage_30d_in_currency ?? 0),
      eth: formatPercent(eth.price_change_percentage_30d_in_currency ?? 0),
    },
    {
      label: "1Y change",
      btc: formatPercent(btc.price_change_percentage_1y_in_currency ?? 0),
      eth: formatPercent(eth.price_change_percentage_1y_in_currency ?? 0),
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <h2 className="mb-4 text-lg font-medium text-ink-soft">Head-to-head</h2>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="px-5 py-3 font-medium">Metric</th>
              <th className="px-5 py-3 font-medium text-btc">Bitcoin</th>
              <th className="px-5 py-3 font-medium text-eth">Ethereum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 1 ? "bg-surface-2/60" : ""}>
                <td className="px-5 py-3 text-muted">{row.label}</td>
                <td className="px-5 py-3 tabular text-ink-soft">{row.btc}</td>
                <td className="px-5 py-3 tabular text-ink-soft">{row.eth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
