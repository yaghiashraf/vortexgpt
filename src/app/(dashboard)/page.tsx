
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TickerSearch } from "@/components/ticker-search";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
       <div className="text-center space-y-2">
         <h1 className="text-4xl font-bold tracking-tight">VortexGPT</h1>
         <p className="text-muted-foreground text-lg">Real-time AI Trading Assistant for Day Traders</p>
       </div>
       
       <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle>Market Analysis</CardTitle>
           <CardDescription>Enter a ticker to get instant AI-powered signals.</CardDescription>
         </CardHeader>
         <CardContent>
           <TickerSearch />
         </CardContent>
       </Card>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <FeatureCard 
            title="Real-Time Sentiment" 
            desc="AI analyzes news & social sentiment instantly." 
            icon="⚡"
          />
          <FeatureCard 
            title="Technical Levels" 
            desc="Auto-generated support & resistance levels." 
            icon="bw_thin"
          />
          <FeatureCard 
            title="Trade Signals" 
            desc="Clear bullish/bearish signals with confidence scores." 
            icon="🎯"
          />
       </div>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="text-2xl mb-2">{icon}</div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
        </Card>
    )
}
