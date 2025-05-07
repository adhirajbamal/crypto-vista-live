
import { CryptoAsset } from '@/types/crypto';

// Sample chart data for the 7-day charts
const generateRandomChartData = (trend: 'up' | 'down' | 'stable', pointCount = 20) => {
  const data: {time: string, price: number}[] = [];
  let basePrice = trend === 'up' ? 100 : 120;
  const now = new Date();
  
  for (let i = 0; i < pointCount; i++) {
    const time = new Date(now.getTime() - (pointCount - i) * 8.4 * 60 * 60 * 1000).toISOString();
    let randomFactor = Math.random() * 5;
    
    if (trend === 'up') {
      basePrice = basePrice + (randomFactor - 1.5);
    } else if (trend === 'down') {
      basePrice = basePrice - (randomFactor - 2);
    } else {
      basePrice = basePrice + (randomFactor - 2.5);
    }
    
    data.push({
      time,
      price: Math.max(basePrice, 0),
    });
  }
  
  return data;
};

export const initialCryptos: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: '/lovable-uploads/1833a19b-862e-4115-b0bb-dd33ce7645cb.png',
    price: 93759.48,
    percentChange1h: 0.43,
    percentChange24h: 0.93,
    percentChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('up'),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 1802.46,
    percentChange1h: 0.60,
    percentChange24h: 3.21,
    percentChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('up'),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    price: 1.00,
    percentChange1h: 0.00,
    percentChange24h: 0.00,
    percentChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('stable'),
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    price: 2.22,
    percentChange1h: 0.46,
    percentChange24h: 0.54,
    percentChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('up'),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 606.65,
    percentChange1h: 0.09,
    percentChange24h: -1.20,
    percentChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('up'),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 151.51,
    percentChange1h: 0.53,
    percentChange24h: 1.26,
    percentChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    priceChangeDirection: 'unchanged',
    chartData: generateRandomChartData('up'),
  }
];
