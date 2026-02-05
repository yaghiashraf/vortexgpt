
export interface AnalysisData {
  ticker: string;
  sentiment: number;
  support: number;
  resistance: number;
  signal: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  catalyst: string;
  warning: string;
  marketData: MarketData;
}

export interface MarketData {
  price: number;
  changePercent: number;
  volume: number;
  open?: number;
  high?: number;
  low?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sentimentScore?: number;
  timestamp: Date;
}

export interface WatchlistItem {
  ticker: string;
  price: number;
  change: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}
