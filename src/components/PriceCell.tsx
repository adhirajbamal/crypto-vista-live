
import { useEffect, useState } from 'react';

interface PriceCellProps {
  price: number;
  symbol: string;
  direction: 'up' | 'down' | 'unchanged';
}

export function PriceCell({ price, symbol, direction }: PriceCellProps) {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (direction === 'up') {
      setAnimationClass('animate-pulse-price-up');
    } else if (direction === 'down') {
      setAnimationClass('animate-pulse-price-down');
    } else {
      setAnimationClass('');
    }
    
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [direction, price]);
  
  // Format price properly based on value
  const formattedPrice = price >= 1 
    ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price.toFixed(6);
  
  return (
    <div className={`rounded p-1 ${animationClass}`}>
      ${formattedPrice}
    </div>
  );
}
