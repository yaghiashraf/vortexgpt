
'use client';

import { createChart, ColorType, ISeriesApi, SeriesType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface ChartData {
    time: string;
    value: number;
}

export function PriceChart({ data, colors: {
    backgroundColor = 'transparent',
    lineColor = '#2962FF',
    textColor = 'black',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
} = {} }: { data: ChartData[], colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
} }) {
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
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            grid: {
                vertLines: { visible: false },
                horzLines: { color: '#334155' }, // Slate-700
            },
        });
        
        // Mock data generation if empty
        const initialData = data.length > 0 ? data : generateMockData();

        const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
        newSeries.setData(initialData);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

    return (
        <div ref={chartContainerRef} className="w-full h-[300px]" />
    );
}

function generateMockData(): ChartData[] {
    const data: ChartData[] = [];
    let price = 150;
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    
    for (let i = 0; i < 30; i++) {
        price = price + (Math.random() * 4 - 2);
        date.setDate(date.getDate() + 1);
        data.push({ time: date.toISOString().split('T')[0], value: price });
    }
    return data;
}
