
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SentimentGaugeProps {
  value: number; // -1 to 1
}

export function SentimentGauge({ value }: SentimentGaugeProps) {
  // Normalize -1...1 to 0...100
  const percentage = ((value + 1) / 2) * 100;
  
  let colorClass = "bg-yellow-500";
  let label = "Neutral";
  
  if (value > 0.3) {
      colorClass = "bg-green-500";
      label = "Bullish";
  } else if (value < -0.3) {
      colorClass = "bg-red-500";
      label = "Bearish";
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Sentiment Score</span>
        <span className={cn("font-bold", value > 0.3 ? "text-green-500" : value < -0.3 ? "text-red-500" : "text-yellow-500")}>
            {label} ({value.toFixed(2)})
        </span>
      </div>
      <Progress value={percentage} className={cn("h-3", "[&>div]:" + colorClass)} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Bearish (-1.0)</span>
        <span>Bullish (+1.0)</span>
      </div>
    </div>
  )
}
