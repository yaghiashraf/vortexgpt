'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChatInterface } from '@/components/chat-interface';
import { PriceChart } from '@/components/price-chart';
import { SentimentGauge } from '@/components/sentiment-gauge';
import { AiSummaryCard } from '@/components/ai-summary-card';
import { AnalysisData } from '@/types';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const PriceChart = dynamic(() => import('@/components/price-chart').then(mod => mod.PriceChart), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-muted animate-pulse rounded-md" />
});

export default function AnalyzePage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [data, setData] = useState<AnalysisData | null>(null);
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
      <div className="flex h-full items-center justify-center flex-col space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">Analyzing {ticker} with FinGPT...</p>
      </div>
  );

  if (!data) return <div className="p-8">Failed to load analysis.</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">{data.ticker}</h1>
            <Badge variant="outline" className="text-lg px-2 py-0.5">${data.marketData.price.toFixed(2)}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Vol: {(data.marketData.volume / 1000000).toFixed(1)}M • Change: 
            <span className={data.marketData.changePercent >= 0 ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
                {data.marketData.changePercent > 0 ? "+" : ""}{data.marketData.changePercent.toFixed(2)}%
            </span>
          </p>
        </div>
        <div className="text-right">
             <Badge className="text-md" variant={data.signal === 'bullish' ? 'default' : data.signal === 'bearish' ? 'destructive' : 'secondary'}>
                 {data.signal.toUpperCase()}
             </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Price Action</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pb-4">
                      <PriceChart data={[]} />
                  </CardContent>
              </Card>

              <Card className="h-[400px] flex flex-col">
                   <CardHeader>
                      <CardTitle>Vortex Assistant</CardTitle>
                   </CardHeader>
                   <CardContent className="flex-1 overflow-hidden p-0">
                        <ChatInterface ticker={ticker} />
                   </CardContent>
              </Card>
          </div>

          <div className="space-y-6">
              <AiSummaryCard data={data} />
              
              <Card>
                  <CardHeader>
                      <CardTitle>Market Sentiment</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <SentimentGauge value={data.sentiment} />
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Technical Key Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Resistance</span>
                            <span className="font-mono font-medium">${data.resistance.toFixed(2)}</span>
                        </div>
                        <Progress value={70} className="h-1" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Current</span>
                            <span className="font-mono font-medium">${data.marketData.price.toFixed(2)}</span>
                        </div>
                        <Progress value={40} className="h-1" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Support</span>
                            <span className="font-mono font-medium">${data.support.toFixed(2)}</span>
                        </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}