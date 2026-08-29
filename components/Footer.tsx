export function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-10 text-xs text-muted sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Data via CoinGecko, refreshed automatically.</p>
          <div className="flex gap-4">
            <a href="https://www.coingecko.com" className="hover:text-ink" target="_blank" rel="noopener noreferrer">
              CoinGecko
            </a>
            <span className="font-serif italic">ethvbtc.com</span>
          </div>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed">
          Not financial advice. ETH vs BTC market cap ratios, hypothetical prices, and any
          trend projections on this site are for informational purposes only and should not
          be relied on for investment decisions.
        </p>
      </div>
    </footer>
  );
}
