
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisData {
    sentiment: number;
    signal: string;
    confidence: number;
    catalyst: string;
    warning: string;
    support: number;
    resistance: number;
}

export function AiSummaryCard({ data }: { data: AnalysisData }) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">VortexGPT Analysis</CardTitle>
                <Badge variant={data.signal === 'bullish' ? 'default' : data.signal === 'bearish' ? 'destructive' : 'secondary'}>
                    {data.signal.toUpperCase()} ({data.confidence}%)
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <div>
                    <h4 className="text-sm font-semibold mb-1">Catalyst</h4>
                    <p className="text-sm text-muted-foreground">{data.catalyst}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-md text-center">
                        <div className="text-xs text-muted-foreground uppercase">Support</div>
                        <div className="font-mono font-bold">${data.support.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-muted rounded-md text-center">
                        <div className="text-xs text-muted-foreground uppercase">Resistance</div>
                        <div className="font-mono font-bold">${data.resistance.toFixed(2)}</div>
                    </div>
                </div>

                {data.warning && (
                    <div className="text-xs text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">
                        ⚠️ {data.warning}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
