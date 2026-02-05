
'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

const watchlistMock = [
    { ticker: 'AAPL', price: 150.25, change: 1.2, sentiment: 'bullish' },
    { ticker: 'TSLA', price: 240.50, change: -2.1, sentiment: 'bearish' },
    { ticker: 'NVDA', price: 480.00, change: 0.5, sentiment: 'neutral' },
];

export function WatchlistSidebar() {
    return (
        <div className="w-64 border-r h-[calc(100vh-64px)] hidden md:block bg-muted/10">
            <div className="p-4 flex items-center justify-between border-b">
                <h3 className="font-semibold">Watchlist</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-2 space-y-1">
                {watchlistMock.map((item) => (
                    <div key={item.ticker} className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                        <div>
                            <div className="font-bold text-sm">{item.ticker}</div>
                            <div className="text-xs text-muted-foreground">Vol: 12M</div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium text-sm">${item.price.toFixed(2)}</div>
                            <div className={`text-xs flex items-center justify-end ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {item.change}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
