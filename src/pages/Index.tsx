
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { cryptoUpdater } from '@/services/cryptoUpdater';
import { CryptoHeader } from '@/components/CryptoHeader';
import { CryptoTable } from '@/components/CryptoTable';

const CryptoApp = () => {
  useEffect(() => {
    // Start the crypto updater service when the component mounts
    cryptoUpdater.start();
    
    // Stop the crypto updater service when the component unmounts
    return () => {
      cryptoUpdater.stop();
    };
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CryptoHeader />
      <CryptoTable />
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Data updates every 2 seconds. All prices are simulated.</p>
        <p className="mt-2">© 2025 Crypto Vista Live</p>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background text-foreground">
        <CryptoApp />
      </div>
    </Provider>
  );
};

export default Index;
