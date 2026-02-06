'use client';

import { createChart, ColorType, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export interface Candle {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export function PriceChart({ data }: { data: Candle[] }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#94a3b8', // text-muted-foreground
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid: {
                vertLines: { visible: false },
                horzLines: { color: '#1e293b' }, // slate-800
            },
            rightPriceScale: {
                borderColor: '#1e293b',
            },
            timeScale: {
                borderColor: '#1e293b',
            }
        });

        const candlestickSeries = (chart as any).addCandlestickSeries({
            upColor: '#22c55e', // green-500
            downColor: '#ef4444', // red-500
            borderVisible: false,
            wickUpColor: '#22c55e',
            wickDownColor: '#ef4444',
        });

        // Ensure data is sorted by time and valid
        const validData = data
            .filter(d => d.time && !isNaN(d.close))
            .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        if (validData.length > 0) {
            candlestickSeries.setData(validData);
        }

        chart.timeScale().fitContent();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div ref={chartContainerRef} className="w-full h-[400px]" />
    );
}