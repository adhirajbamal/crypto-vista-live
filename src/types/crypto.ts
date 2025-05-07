
export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  priceChangeDirection: 'up' | 'down' | 'unchanged';
  chartData: { time: string; price: number }[];
}

export interface PriceUpdatePayload {
  id: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  volume24h: number;
}
