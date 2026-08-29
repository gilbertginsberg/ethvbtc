# ethvbtc

Live BTC vs ETH market cap comparison tracker: flippening ratio, prices, and other metrics.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Recharts
- CoinGecko API (server-side, cached via ISR)
- Vercel Analytics

## Development

```bash
npm install
npm run dev
```

Optionally set `COINGECKO_API_KEY` in `.env.local` (see `.env.example`) to use a CoinGecko
Demo API key and raise rate limits.

## Data & caching

- `/api/data` — live BTC/ETH price, market cap, volume, supply, ATH. Revalidates every 60s.
- `/api/history` — historical ETH/BTC market cap ratio (`?range=30|90|365|max`). Revalidates
  hourly.

Both routes keep the last successful response in memory and serve it (marked `stale`) if
CoinGecko is temporarily unavailable or rate-limited, so the site never shows a broken page.

## Build

```bash
npm run build
```
