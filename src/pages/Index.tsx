
import { useEffect } from 'react';
import { cryptoUpdater } from '@/services/cryptoUpdater';
import { CryptoHeader } from '@/components/CryptoHeader';
import { CryptoTable } from '@/components/CryptoTable';

const Index = () => {
  useEffect(() => {
    // Start the crypto updater service when the component mounts
    cryptoUpdater.start();
    
    // Stop the crypto updater service when the component unmounts
    return () => {
      cryptoUpdater.stop();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <CryptoHeader />
        <CryptoTable />
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Data updates every 2 seconds. All prices are simulated.</p>
          <p className="mt-2">© 2025 Crypto Vista Live</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
