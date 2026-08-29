const FAQS = [
  {
    q: "What is the flippening?",
    a: "The \"flippening\" is the hypothetical moment Ethereum's market capitalization overtakes Bitcoin's, making ETH the largest cryptocurrency by market cap. It became a popular narrative during the 2017-2018 bull run and resurfaces whenever the ETH/BTC ratio climbs. It has not happened as of today, though the ratio came closest around November 2021.",
  },
  {
    q: "Why does the ETH/BTC market cap ratio matter?",
    a: "The ratio is a quick read on relative market sentiment between the two largest crypto assets. Bitcoin is generally viewed as a store-of-value / digital-gold asset, while Ethereum is viewed as a programmable settlement layer for DeFi, NFTs, and on-chain applications. A rising ratio suggests capital and attention rotating toward Ethereum's ecosystem; a falling ratio suggests the opposite.",
  },
  {
    q: "How is the market cap ratio calculated?",
    a: "It's simply Ethereum's total market capitalization divided by Bitcoin's total market capitalization, expressed as a percentage: (ETH price × ETH circulating supply) / (BTC price × BTC circulating supply). This site recalculates it live from CoinGecko market data.",
  },
  {
    q: "Has the flippening ever come close to happening?",
    a: "The ETH/BTC ratio reached its highest recorded levels in mid-to-late 2017 and again around late 2021 during peak DeFi and NFT activity, but Bitcoin's market cap has remained larger throughout crypto's history to date.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This site is for informational and educational purposes only. Market cap ratios, hypothetical prices, and trend projections shown here are illustrative, not predictions or investment recommendations. Always do your own research.",
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <p className="font-medium text-xs uppercase tracking-[0.2em] text-muted">
        Background
      </p>
      <h2 className="mt-1 mb-6 font-serif text-2xl italic">Frequently asked</h2>
      <div className="space-y-6">
        {FAQS.map((f) => (
          <div key={f.q} className="border-b border-hairline pb-6 last:border-0">
            <h3 className="font-serif text-lg">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
