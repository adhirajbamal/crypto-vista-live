
import { store } from '@/lib/store';
import { updatePrices } from '@/features/crypto/cryptoSlice';
import { PriceUpdatePayload } from '@/types/crypto';

class CryptoUpdaterService {
  private intervalId: number | null = null;
  private updateIntervalMs = 2000;
  
  start(): void {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => this.generatePriceUpdates(), this.updateIntervalMs);
      console.log('CryptoUpdaterService started');
    }
  }
  
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('CryptoUpdaterService stopped');
    }
  }
  
  private generatePriceUpdates(): void {
    const currentAssets = store.getState().crypto.assets;
    const updates: PriceUpdatePayload[] = [];
    
    // Generate random updates for each asset
    currentAssets.forEach(asset => {
      // Random price change between -2% and +2%
      const priceChangePct = (Math.random() * 4 - 2) / 100;
      
      // Apply more stability to stablecoins like Tether
      const isStableCoin = asset.symbol === 'USDT';
      const stabilityFactor = isStableCoin ? 0.01 : 1;
      
      const newPrice = asset.price * (1 + priceChangePct * stabilityFactor);
      
      // Change percentages slightly
      const change1h = asset.percentChange1h + (Math.random() * 0.4 - 0.2) * stabilityFactor;
      const change24h = asset.percentChange24h + (Math.random() * 0.6 - 0.3) * stabilityFactor;
      const change7d = asset.percentChange7d + (Math.random() * 0.8 - 0.4) * stabilityFactor;
      
      // Change volume slightly (between -5% and +5%)
      const volumeChange = asset.volume24h * (1 + (Math.random() * 0.1 - 0.05));
      
      updates.push({
        id: asset.id,
        price: newPrice,
        percentChange1h: change1h,
        percentChange24h: change24h,
        percentChange7d: change7d,
        volume24h: volumeChange,
      });
    });
    
    // Dispatch the updates to Redux
    store.dispatch(updatePrices(updates));
  }
}

// Export a singleton instance
export const cryptoUpdater = new CryptoUpdaterService();
