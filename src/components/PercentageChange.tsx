
import { ArrowDown, ArrowUp } from "lucide-react";

interface PercentageChangeProps {
  value: number;
  timeframe?: string;
}

export function PercentageChange({ value, timeframe }: PercentageChangeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const colorClass = isPositive 
    ? "text-crypto-positive" 
    : isNeutral 
      ? "text-gray-500" 
      : "text-crypto-negative";
  
  return (
    <div className={`flex items-center ${colorClass}`}>
      {isPositive ? (
        <ArrowUp className="h-4 w-4 mr-1" />
      ) : isNeutral ? (
        null
      ) : (
        <ArrowDown className="h-4 w-4 mr-1" />
      )}
      {Math.abs(value).toFixed(2)}%
      {timeframe && <span className="text-xs text-muted-foreground ml-1">{timeframe}</span>}
    </div>
  );
}
