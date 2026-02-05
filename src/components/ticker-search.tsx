
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TickerSearch() {
  const [ticker, setTicker] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      router.push(`/analyze/${ticker.toUpperCase()}`);
    }
  };

  if (!mounted) {
    return <div className="h-10 w-full max-w-sm bg-muted animate-pulse rounded-md" />;
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search ticker (e.g. AAPL)..."
        className="pl-8"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
    </form>
  );
}
