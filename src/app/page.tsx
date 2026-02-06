import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TickerSearch } from "@/components/ticker-search";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Bot, Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32">
        <div className="space-y-4 max-w-3xl">
          <Badge variant="secondary" className="mb-4">v1.0 Public Beta</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            AI-Powered Alpha. <br/> Instantly.
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl">
            VortexGPT analyzes market sentiment, technicals, and momentum in milliseconds. Stop guessing, start executing.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative border-zinc-800 bg-black/50 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium text-muted-foreground">Analyze Ticker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TickerSearch />
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container grid grid-cols-1 gap-8 md:grid-cols-3 py-12">
        <FeatureCard 
            title="Real-Time Sentiment" 
            desc="Our LLM scrapes news & social signals to gauge market fear & greed instantly." 
            icon={<Zap className="h-10 w-10 text-yellow-500" />}
        />
        <FeatureCard 
            title="Technical Confluence" 
            desc="Auto-detected support & resistance levels combined with volume profile analysis." 
            icon={<BarChart3 className="h-10 w-10 text-blue-500" />}
        />
        <FeatureCard 
            title="Institutional Grade" 
            desc="Built on FinGPT architecture, trained on millions of financial data points." 
            icon={<Bot className="h-10 w-10 text-purple-500" />}
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
                <div className="mb-4">{icon}</div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </CardContent>
        </Card>
    )
}