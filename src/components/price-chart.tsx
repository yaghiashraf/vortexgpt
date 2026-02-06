
'use client';

import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export interface Candle {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export function PriceChart({ data = [] }: { data: Candle[] }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Validation to prevent crash if data is not an array
        if (!Array.isArray(data)) {
            console.error("PriceChart received invalid data:", data);
            return;
        }

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        let chart: any;

        try {
            chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: 'transparent' },
                    textColor: '#94a3b8', 
                },
                width: chartContainerRef.current.clientWidth,
                height: 400,
                grid: {
                    vertLines: { visible: false },
                    horzLines: { color: '#1e293b' },
                },
                rightPriceScale: {
                    borderColor: '#1e293b',
                },
                timeScale: {
                    borderColor: '#1e293b',
                }
            });

            // Check if method exists before calling (runtime safety)
            if (typeof chart.addCandlestickSeries === 'function') {
                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: '#22c55e', 
                    downColor: '#ef4444', 
                    borderVisible: false,
                    wickUpColor: '#22c55e',
                    wickDownColor: '#ef4444',
                });

                const validData = data
                    .filter(d => d && d.time && !isNaN(d.close))
                    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                    // Lightweight charts expects time as string 'YYYY-MM-DD' or unix timestamp
                    .map(d => ({ ...d, time: d.time.split('T')[0] }));

                if (validData.length > 0) {
                    candlestickSeries.setData(validData);
                }
            } else {
                console.warn("addCandlestickSeries not found on chart instance");
            }

            chart.timeScale().fitContent();

            window.addEventListener('resize', handleResize);

        } catch (err) {
            console.error("Failed to initialize chart:", err);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chart) chart.remove();
        };
    }, [data]);

    return (
        <div ref={chartContainerRef} className="w-full h-[400px]" />
    );
}
