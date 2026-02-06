import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { analyzeTicker } from '@/lib/fingpt';
import { getMarketData, getHistoricalData } from '@/lib/market-data';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
      const { ticker } = await req.json();
      if (!ticker) return NextResponse.json({ error: 'Ticker required' }, { status: 400 });

      const upperTicker = ticker.toUpperCase();

      // Get market data (parallel)
      const [marketData, history] = await Promise.all([
          getMarketData(upperTicker),
          getHistoricalData(upperTicker)
      ]);

      // Call FinGPT
      const analysis = await analyzeTicker(upperTicker, marketData);

      // Return combined data
      return NextResponse.json({
        ticker: upperTicker,
        ...analysis,
        marketData: {
          price: marketData.price,
          changePercent: marketData.changePercent,
          volume: marketData.volume,
        },
        history, 
      });
  } catch (error) {
      console.error("API Error", error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
