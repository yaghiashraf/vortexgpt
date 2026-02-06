'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChatInterface } from '@/components/chat-interface';
import { SentimentGauge } from '@/components/sentiment-gauge';
import { AiSummaryCard } from '@/components/ai-summary-card';
import { AnalysisData } from '@/types';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Candle } from '@/components/price-chart';

// Dynamic import for client-side charting library
const PriceChart = dynamic(() => import('@/components/price-chart').then(mod => mod.PriceChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-md border border-border/50" />
});

interface ExtendedAnalysisData extends AnalysisData {
    history: Candle[];
}

export default function AnalyzePage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [data, setData] = useState<ExtendedAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
        try {
            const res = await fetch('/api/v1/analyze', {
            method: 'POST',
            body: JSON.stringify({ ticker }),
            });
            
            if (res.ok) {
            setData(await res.json());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    if (ticker) {
        fetchAnalysis();
    }
  }, [ticker]);

  if (loading) return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center flex-col space-y-4">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
             <div className="relative animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground animate-pulse font-mono">Initializing Vortex Core for {ticker}...</p>
      </div>
  );

  if (!data) return <div className="p-8 text-center text-destructive">Failed to load analysis.</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">{data.ticker}</h1>
            <Badge variant="outline" className="text-xl px-3 py-1 bg-background/50 backdrop-blur">${data.marketData.price.toFixed(2)}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
             <span className="text-muted-foreground">Vol: {(data.marketData.volume / 1000000).toFixed(1)}M</span>
             <span className="h-4 w-[1px] bg-border"></span>
             <span className={data.marketData.changePercent >= 0 ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"}>
                {data.marketData.changePercent > 0 ? "+" : ""}{data.marketData.changePercent.toFixed(2)}%
             </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                 <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">AI Signal</div>
                 <div className="font-bold text-lg">{data.signal.toUpperCase()}</div>
             </div>
             <Badge className="text-lg px-4 py-2" variant={data.signal === 'bullish' ? 'default' : data.signal === 'bearish' ? 'destructive' : 'secondary'}>
                 {data.confidence}% CONFIDENCE
             </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        Price Action & Technicals
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pb-4">
                      <PriceChart data={data.history} />
                  </CardContent>
              </Card>

              <Card className="h-[500px] flex flex-col bg-card/50 backdrop-blur border-border/50">
                   <CardHeader>
                      <CardTitle>Vortex Assistant</CardTitle>
                   </CardHeader>
                   <CardContent className="flex-1 overflow-hidden p-0">
                        <ChatInterface ticker={ticker} />
                   </CardContent>
              </Card>
          </div>

          {/* Sidebar Analysis */}
          <div className="space-y-6">
              <AiSummaryCard data={data} />
              
              <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                      <CardTitle>Sentiment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <SentimentGauge value={data.sentiment} />
                  </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                      <CardTitle>Key Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-rose-500 font-medium">Resistance</span>
                                <span className="font-mono">${data.resistance.toFixed(2)}</span>
                            </div>
                            <Progress value={85} className="h-1.5 bg-muted [&>div]:bg-rose-500" />
                        </div>
                        
                        <div className="space-y-2">
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Current Price</span>
                                <span className="font-mono text-primary">${data.marketData.price.toFixed(2)}</span>
                            </div>
                            <Progress value={50} className="h-1.5 bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-emerald-500 font-medium">Support</span>
                                <span className="font-mono">${data.support.toFixed(2)}</span>
                            </div>
                            <Progress value={15} className="h-1.5 bg-muted [&>div]:bg-emerald-500" />
                        </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}
