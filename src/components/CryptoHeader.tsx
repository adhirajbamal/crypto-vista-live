
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';

export function CryptoHeader() {
  const lastUpdated = useAppSelector(state => state.crypto.lastUpdated);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-6 px-4 py-6">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold">Crypto Vista Live</h1>
        <p className="text-gray-500">Real-time cryptocurrency price tracker</p>
      </div>
      <div className="flex flex-col items-end text-sm">
        <div className="text-gray-500">
          Last Updated: <span className="text-primary">{new Date(lastUpdated).toLocaleTimeString()}</span>
        </div>
        <div className="text-gray-500">
          Current Time: <span className="text-primary">{currentTime}</span>
        </div>
      </div>
    </header>
  );
}
