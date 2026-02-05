
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

export async function getMarketData(ticker: string) {
  if (!POLYGON_API_KEY || POLYGON_API_KEY === 'polygon_placeholder') {
      // Mock data for prototype
      return {
          price: 150.00 + Math.random() * 10,
          open: 148.00,
          high: 160.00,
          low: 145.00,
          volume: 1000000 + Math.floor(Math.random() * 500000),
          changePercent: (Math.random() * 4) - 2,
      };
  }

  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${POLYGON_API_KEY}`
  );
  
  if (!response.ok) {
     console.error("Polygon API Error", await response.text());
     // Fallback to mock on error for stability
     return {
          price: 150.00 + Math.random() * 10,
          open: 148.00,
          high: 160.00,
          low: 145.00,
          volume: 1000000,
          changePercent: 1.5,
      };
  }
  
  const data = await response.json();
  const result = data.results?.[0];
  
  if (!result) {
     return {
        price: 0,
        open: 0,
        high: 0,
        low: 0,
        volume: 0,
        changePercent: 0
     }
  }

  return {
    price: result.c,
    open: result.o,
    high: result.h,
    low: result.l,
    volume: result.v,
    changePercent: ((result.c - result.o) / result.o) * 100,
  };
}
