
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { updateSorting } from '@/features/crypto/cryptoSlice';
import { CryptoAsset } from '@/types/crypto';
import { formatLargeNumber, formatSupply } from '@/lib/formatters';
import { PercentageChange } from './PercentageChange';
import { PriceCell } from './PriceCell';
import { MiniChart } from './MiniChart';

export function CryptoTable() {
  const { assets, sortColumn, sortDirection } = useAppSelector(state => state.crypto);
  const dispatch = useAppDispatch();
  const [sortedAssets, setSortedAssets] = useState<CryptoAsset[]>([]);
  
  useEffect(() => {
    const sorted = [...assets].sort((a, b) => {
      let aValue: any = (a as any)[sortColumn];
      let bValue: any = (b as any)[sortColumn];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue === bValue) {
        return 0;
      }
      
      const compareResult = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    
    setSortedAssets(sorted);
  }, [assets, sortColumn, sortDirection]);
  
  const handleSort = (column: string) => {
    const newDirection = column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(updateSorting({ column, direction: newDirection }));
  };
  
  const getSortIcon = (column: string) => {
    if (column !== sortColumn) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-background">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort('rank')}
            >
              # {getSortIcon('rank')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {getSortIcon('name')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer"
              onClick={() => handleSort('price')}
            >
              Price {getSortIcon('price')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('percentChange1h')}
            >
              1h % {getSortIcon('percentChange1h')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('percentChange24h')}
            >
              24h % {getSortIcon('percentChange24h')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('percentChange7d')}
            >
              7d % {getSortIcon('percentChange7d')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('marketCap')}
            >
              Market Cap {getSortIcon('marketCap')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('volume24h')}
            >
              Volume (24h) {getSortIcon('volume24h')}
            </th>
            <th 
              className="px-4 py-3 text-sm font-medium text-muted-foreground text-right cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('circulatingSupply')}
            >
              Circulating Supply {getSortIcon('circulatingSupply')}
            </th>
            <th className="px-4 py-3 text-sm font-medium text-muted-foreground text-right whitespace-nowrap">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <tr key={asset.id} className="border-b border-border hover:bg-accent/50 transition-colors">
              <td className="px-4 py-4 text-sm font-medium">{asset.rank}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <img src={asset.logoUrl} alt={asset.name} className="w-6 h-6" />
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-medium">
                <PriceCell 
                  price={asset.price} 
                  symbol={asset.symbol}
                  direction={asset.priceChangeDirection}
                />
              </td>
              <td className="px-4 py-4 text-right">
                <PercentageChange value={asset.percentChange1h} />
              </td>
              <td className="px-4 py-4 text-right">
                <PercentageChange value={asset.percentChange24h} />
              </td>
              <td className="px-4 py-4 text-right">
                <PercentageChange value={asset.percentChange7d} />
              </td>
              <td className="px-4 py-4 text-right font-medium">
                ${formatLargeNumber(asset.marketCap)}
              </td>
              <td className="px-4 py-4 text-right">
                <div className="font-medium">${formatLargeNumber(asset.volume24h)}</div>
                <div className="text-xs text-muted-foreground">{formatSupply(asset.volume24h / asset.price)} {asset.symbol}</div>
              </td>
              <td className="px-4 py-4 text-right whitespace-nowrap">
                <div className="font-medium">{formatSupply(asset.circulatingSupply)} {asset.symbol}</div>
                {asset.maxSupply && (
                  <div className="text-xs text-muted-foreground">
                    {((asset.circulatingSupply / asset.maxSupply) * 100).toFixed(2)}%
                  </div>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="w-[120px] h-[40px]">
                  <MiniChart 
                    data={asset.chartData}
                    percentChange={asset.percentChange7d}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
