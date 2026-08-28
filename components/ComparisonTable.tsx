import type { ApiData } from "@/lib/types";
import { formatDate, formatPercent, formatUsd } from "@/lib/format";

export function ComparisonTable({ data }: { data: ApiData }) {
  const { btc, eth, global } = data;
  const btcDom = global?.market_cap_percentage?.btc;
  const ethDom = global?.market_cap_percentage?.eth;

  const rows: { label: string; btc: string; eth: string }[] = [
    { label: "Price", btc: formatUsd(btc.current_price), eth: formatUsd(eth.current_price) },
    { label: "Market Cap", btc: formatUsd(btc.market_cap), eth: formatUsd(eth.market_cap) },
    { label: "24h Volume", btc: formatUsd(btc.total_volume), eth: formatUsd(eth.total_volume) },
    {
      label: "Circulating Supply",
      btc: btc.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      eth: eth.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    },
    {
      label: "Market Dominance",
      btc: btcDom !== undefined ? `${btcDom.toFixed(2)}%` : "—",
      eth: ethDom !== undefined ? `${ethDom.toFixed(2)}%` : "—",
    },
    { label: "All-Time High", btc: formatUsd(btc.ath), eth: formatUsd(eth.ath) },
    { label: "ATH Date", btc: formatDate(btc.ath_date), eth: formatDate(eth.ath_date) },
    {
      label: "30D Change",
      btc: formatPercent(btc.price_change_percentage_30d_in_currency ?? 0),
      eth: formatPercent(eth.price_change_percentage_30d_in_currency ?? 0),
    },
    {
      label: "1Y Change",
      btc: formatPercent(btc.price_change_percentage_1y_in_currency ?? 0),
      eth: formatPercent(eth.price_change_percentage_1y_in_currency ?? 0),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted">
        Head-to-Head Comparison
      </h2>
      <div className="overflow-x-auto rounded-xl border border-surface-border">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-surface font-mono text-xs uppercase text-muted">
              <th className="px-4 py-3 font-medium">Metric</th>
              <th className="px-4 py-3 font-medium text-btc">Bitcoin</th>
              <th className="px-4 py-3 font-medium text-eth">Ethereum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-surface-border last:border-0">
                <td className="px-4 py-3 text-muted">{row.label}</td>
                <td className="px-4 py-3 font-mono tabular">{row.btc}</td>
                <td className="px-4 py-3 font-mono tabular">{row.eth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
