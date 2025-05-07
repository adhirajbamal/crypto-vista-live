
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCryptos } from './cryptoData';
import { CryptoAsset, PriceUpdatePayload } from '@/types/crypto';

interface CryptoState {
  assets: CryptoAsset[];
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  lastUpdated: string;
}

const initialState: CryptoState = {
  assets: initialCryptos,
  sortColumn: 'rank',
  sortDirection: 'asc',
  lastUpdated: new Date().toISOString(),
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceUpdatePayload[]>) => {
      action.payload.forEach((update) => {
        const asset = state.assets.find((a) => a.id === update.id);
        if (asset) {
          const oldPrice = asset.price;
          
          // Update all provided fields
          asset.price = update.price;
          asset.priceChangeDirection = update.price > oldPrice ? 'up' : update.price < oldPrice ? 'down' : 'unchanged';
          asset.percentChange1h = update.percentChange1h;
          asset.percentChange24h = update.percentChange24h;
          asset.percentChange7d = update.percentChange7d;
          asset.volume24h = update.volume24h;
          
          // Reset the change direction after 1 second (this will be handled by the UI with animations)
          setTimeout(() => {
            const assetIndex = state.assets.findIndex((a) => a.id === update.id);
            if (assetIndex !== -1) {
              state.assets[assetIndex].priceChangeDirection = 'unchanged';
            }
          }, 1000);
        }
      });
      state.lastUpdated = new Date().toISOString();
    },
    updateSorting: (state, action: PayloadAction<{ column: string, direction: 'asc' | 'desc' }>) => {
      state.sortColumn = action.payload.column;
      state.sortDirection = action.payload.direction;
    }
  },
});

export const { updatePrices, updateSorting } = cryptoSlice.actions;
export default cryptoSlice.reducer;
