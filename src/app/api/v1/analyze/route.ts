import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { analyzeTicker } from '@/lib/fingpt';
import { getMarketData } from '@/lib/polygon';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
  
  // Optional: Check auth
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
      const { ticker } = await req.json();
      if (!ticker) return NextResponse.json({ error: 'Ticker required' }, { status: 400 });

      const upperTicker = ticker.toUpperCase();

      // Get market data
      const marketData = await getMarketData(upperTicker);

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
      });
  } catch (error) {
      console.error("API Error", error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}