
import { HfInference } from '@huggingface/inference';
import { MarketData } from '@/types';

const hf = new HfInference(process.env.HF_API_TOKEN);

export async function analyzeTicker(ticker: string, marketData: MarketData) {
    if (!process.env.HF_API_TOKEN || process.env.HF_API_TOKEN === 'hf_placeholder') {
        // Mock analysis
        const sentiment = Math.random() * 2 - 1; // -1 to 1
        return {
            sentiment: sentiment,
            support: marketData.price * 0.95,
            resistance: marketData.price * 1.05,
            signal: sentiment > 0.3 ? 'bullish' : sentiment < -0.3 ? 'bearish' : 'neutral',
            confidence: Math.floor(Math.random() * 40) + 60,
            catalyst: "Strong momentum indicators driven by recent sector rotation and volume spikes.",
            warning: "High volatility expected due to upcoming macro reports."
        };
    }

  const prompt = `<s>[INST] <<SYS>>
You are VortexGPT, an AI trading assistant for day traders. Provide concise, actionable analysis.
Analyze ${ticker} considering market data.
<</SYS>>

Current market data for ${ticker}:
- Price: ${marketData.price}
- Change: ${marketData.changePercent.toFixed(2)}%
- Volume: ${marketData.volume}

Provide:
1. Sentiment score (-1 to 1)
2. Key technical levels (support/resistance)
3. Bullish/bearish/neutral signal with confidence (1-100%)
4. One-sentence catalyst summary
5. Risk warning

Format: JSON with keys: sentiment, support, resistance, signal, confidence, catalyst, warning [/INST]`;

  try {
    const response = await hf.textGeneration({
      model: process.env.FINGPT_MODEL || 'AdaptLLM/finance-LLM',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.3,
        return_full_text: false,
      },
    });

    const text = response.generated_text;
    const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (error) {
    console.error('FinGPT analysis error:', error);
    // Fallback
    return {
        sentiment: 0,
        support: marketData.price * 0.98,
        resistance: marketData.price * 1.02,
        signal: 'neutral',
        confidence: 50,
        catalyst: "Analysis unavailable, market consolidation observed.",
        warning: "API connection failed."
    };
  }
}
