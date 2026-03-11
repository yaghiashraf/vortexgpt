import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import Link from "next/link";

const INDEX_DATA = [
  { symbol: "SPY", name: "S&P 500", price: 508.45, change: 1.2, status: "bullish" },
  { symbol: "QQQ", name: "Nasdaq 100", price: 435.12, change: -0.5, status: "bearish" },
  { symbol: "DIA", name: "Dow Jones", price: 390.87, change: 0.8, status: "bullish" },
  { symbol: "IWM", name: "Russell 2000", price: 205.34, change: 2.1, status: "bullish" },
];

const TRENDING = [
  { symbol: "NVDA", price: 788.17, change: 4.2 },
  { symbol: "AMD", price: 822.40, change: 3.8 },
  { symbol: "AAPL", price: 182.52, change: -1.1 },
  { symbol: "TSLA", price: 175.22, change: -2.3 },
  { symbol: "META", price: 202.64, change: 5.4 },
];

export default function MarketsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Global Markets</h1>
          <p className="text-muted-foreground mt-2">Real-time macro view and trending assets.</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
          <Activity className="w-4 h-4 mr-2 inline-block" /> Market Open
        </Badge>
      </div>

      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INDEX_DATA.map((idx) => (
          <Link href={`/analyze/${idx.symbol}`} key={idx.symbol}>
            <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{idx.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{idx.name}</p>
                  </div>
                  <Badge variant={idx.change >= 0 ? "default" : "destructive"} className="bg-opacity-20 text-opacity-100">
                    {idx.change >= 0 ? "BULL" : "BEAR"}
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-mono">${idx.price.toFixed(2)}</div>
                  <div className={`flex items-center font-medium ${idx.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {idx.change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {Math.abs(idx.change)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Trending Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Market Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[2/1] w-full bg-zinc-900/50 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1">
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded flex flex-col items-center justify-center text-emerald-400 font-bold transition-all hover:bg-emerald-500/30">
                        <span>Tech</span>
                        <span className="text-sm font-normal opacity-80">+1.2%</span>
                    </div>
                    <div className="bg-rose-500/20 border border-rose-500/30 rounded flex flex-col items-center justify-center text-rose-400 font-bold transition-all hover:bg-rose-500/30">
                        <span>Financials</span>
                        <span className="text-sm font-normal opacity-80">-0.4%</span>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded flex flex-col items-center justify-center text-emerald-300 font-bold transition-all hover:bg-emerald-500/20">
                        <span>Energy</span>
                        <span className="text-sm font-normal opacity-80">+0.8%</span>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded flex flex-col items-center justify-center text-zinc-400 font-bold transition-all hover:bg-zinc-700">
                        <span>Healthcare</span>
                        <span className="text-sm font-normal opacity-80">0.0%</span>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded flex flex-col items-center justify-center text-rose-300 font-bold col-span-2 transition-all hover:bg-rose-500/20">
                        <span>Consumer Discretionary</span>
                        <span className="text-sm font-normal opacity-80">-1.1%</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Trending Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TRENDING.map((stock) => (
                <Link href={`/analyze/${stock.symbol}`} key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-right">
                    <div className="font-mono text-sm">${stock.price.toFixed(2)}</div>
                    <div className={`text-xs font-medium ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}