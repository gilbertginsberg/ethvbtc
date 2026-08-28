export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_date: string;
  ath_change_percentage: number;
  atl: number;
  atl_date: string;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
}

export interface GlobalData {
  total_market_cap: Record<string, number>;
  market_cap_percentage: Record<string, number>;
}

export interface ApiData {
  btc: CoinMarketData;
  eth: CoinMarketData;
  global: GlobalData | null;
  ratio: number;
  updatedAt: number;
  stale?: boolean;
}
