export interface MarketData {
  price: number;
  changePercent: number;
  volume: number;
  open: number;
  high: number;
  low: number;
}

export interface Candle {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

/**
 * Fetches market data for a given ticker.
 * Uses Polygon.io if a key is present, otherwise returns realistic mock data.
 */
export async function getMarketData(ticker: string): Promise<MarketData> {
  const symbol = ticker.toUpperCase();

  // 1. Try Real API
  if (POLYGON_API_KEY && POLYGON_API_KEY !== 'placeholder') {
    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const res = data.results[0];
          const change = ((res.c - res.o) / res.o) * 100;
          
          return {
            price: res.c,
            open: res.o,
            high: res.h,
            low: res.l,
            volume: res.v,
            changePercent: change
          };
        }
      }
      console.warn(`Polygon API failed for ${symbol}, falling back to mock.`);
    } catch (error) {
      console.error("Polygon API Error:", error);
    }
  }

  // 2. Fallback / Mock Data
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = (hash % 500) + 10; 
  const volatility = (hash % 5) + 1; 
  
  const changeDir = hash % 2 === 0 ? 1 : -1;
  const changePercent = (Math.random() * volatility) * changeDir;
  const price = basePrice * (1 + changePercent / 100);

  return {
    price: parseFloat(price.toFixed(2)),
    open: parseFloat(basePrice.toFixed(2)),
    high: parseFloat((price * 1.02).toFixed(2)),
    low: parseFloat((price * 0.98).toFixed(2)),
    volume: 1000000 + (hash * 1000),
    changePercent: parseFloat(changePercent.toFixed(2)),
  };
}

export async function getHistoricalData(ticker: string): Promise<Candle[]> {
    // Generate 30 days of mock candles
    const candles: Candle[] = [];
    let price = 100 + (ticker.length * 10);
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const open = price;
        const volatility = (Math.random() * 4) - 2; // -2 to +2%
        const close = open * (1 + volatility / 100);
        const high = Math.max(open, close) * (1 + Math.random() / 100);
        const low = Math.min(open, close) * (1 - Math.random() / 100);
        
        candles.push({
            time: date.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
        });
        
        price = close;
    }
    return candles;
}