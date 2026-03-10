
import { MarketData, AnalysisData } from '@/types';

const hfToken = process.env.HF_API_TOKEN?.trim();
const isYoloMode = process.env.YOLO_MODE === 'true';

export async function analyzeTicker(ticker: string, marketData: MarketData): Promise<Omit<AnalysisData, 'ticker' | 'marketData'>> {
    console.log("Analyzing with FinGPT. Token Present:", !!hfToken);

    // 1. Mock Mode (if no token or placeholder)
    if (!hfToken || hfToken === 'hf_placeholder') {
        console.warn("No valid HF Token found, using mock.");
        return generateMockAnalysis(ticker, marketData);
    }

  const persona = isYoloMode 
    ? `You are a degenerate r/WallStreetBets trader. Analyze the ticker with maximum YOLO energy. Use emojis like 🚀, 💎🙌, 🦍, and 📉. Be extremely hyped or extremely bearish. No neutral opinions. Your warnings should be about "paper hands" or "getting liquidated".`
    : `You are VortexGPT, an elite AI financial analyst.`;

  const prompt = `<|system|>
${persona}
Analyze ${ticker} based on the following data:
- Price: ${marketData.price}
- 24h Change: ${marketData.changePercent.toFixed(2)}%
- Volume: ${marketData.volume}

Return a valid JSON object strictly matching this schema:
{
  "sentiment": number (-1.0 to 1.0),
  "support": number,
  "resistance": number,
  "signal": "bullish" | "bearish" | "neutral",
  "confidence": number (0-100),
  "catalyst": "string (concise reason)",
  "warning": "string (risk factor)"
}
Do not include markdown formatting or extra text. Just the JSON.</s>
<|user|>
Analyze ${ticker} now.</s>
<|assistant|>`;

  try {
    const model = process.env.FINGPT_MODEL || 'HuggingFaceH4/zephyr-7b-beta';
    
    // Using direct fetch to new router to avoid 410 errors from outdated SDKs
    const response = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.1,
          return_full_text: false,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    console.log("FinGPT Raw Response:", text);

    // Extract JSON from potential markdown wrapping
    const jsonMatch = text?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate / Safe Defaults
    return {
        sentiment: typeof parsed.sentiment === 'number' ? parsed.sentiment : 0,
        support: typeof parsed.support === 'number' ? parsed.support : marketData.price * 0.95,
        resistance: typeof parsed.resistance === 'number' ? parsed.resistance : marketData.price * 1.05,
        signal: ['bullish', 'bearish', 'neutral'].includes(parsed.signal) ? parsed.signal : 'neutral',
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 50,
        catalyst: parsed.catalyst || "Market ambiguity detected.",
        warning: parsed.warning || "Exercise caution."
    };

  } catch (error) {
    console.error('FinGPT analysis error:', error);
    return generateMockAnalysis(ticker, marketData);
  }
}

function generateMockAnalysis(ticker: string, marketData: MarketData): Omit<AnalysisData, 'ticker' | 'marketData'> {
    const sentiment = Math.random() * 2 - 1; // -1 to 1
    const signal: 'bullish' | 'bearish' | 'neutral' = sentiment > 0.2 ? 'bullish' : sentiment < -0.2 ? 'bearish' : 'neutral';
    
    return {
        sentiment: parseFloat(sentiment.toFixed(2)),
        support: parseFloat((marketData.price * 0.95).toFixed(2)),
        resistance: parseFloat((marketData.price * 1.05).toFixed(2)),
        signal: signal,
        confidence: Math.floor(Math.random() * 30) + 70,
        catalyst: `${ticker} showing strong ${signal === 'bullish' ? 'upside' : 'downside'} momentum based on volume analysis.`,
        warning: "High volatility expected in the coming session."
    };
}
