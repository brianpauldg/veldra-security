/**
 * Mean Reversion Strategy Engine
 *
 * Uses Bollinger Bands + Z-Score + RSI to identify when price has
 * deviated significantly from its mean, betting on reversion.
 *
 * Buy signal:  Price below lower Bollinger Band + RSI oversold + negative Z-score
 * Sell signal: Price above upper Bollinger Band + RSI overbought + positive Z-score
 */

import { OHLCV, MeanReversionSignal, CryptoSymbol, BotConfig } from './types';

/** Calculate Simple Moving Average */
function sma(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** Calculate Standard Deviation */
function stdDev(values: number[], mean: number): number {
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

/** Calculate Z-Score (how many std devs from mean) */
function zScore(value: number, mean: number, sd: number): number {
  if (sd === 0) return 0;
  return (value - mean) / sd;
}

/** Calculate RSI (Relative Strength Index) */
function calculateRSI(closes: number[], period: number = 14): number {
  if (closes.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = closes.length - period; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

/** Analyze a single symbol and generate a mean reversion signal */
export function analyzeSymbol(
  symbol: CryptoSymbol,
  candles: OHLCV[],
  config: BotConfig
): MeanReversionSignal {
  const closes = candles.map((c) => c.close);
  const currentPrice = closes[closes.length - 1];

  // Calculate Bollinger Bands
  const lookback = Math.min(config.lookbackPeriod, closes.length);
  const recentCloses = closes.slice(-lookback);
  const mean = sma(recentCloses);
  const sd = stdDev(recentCloses, mean);
  const upperBand = mean + config.bollingerMultiplier * sd;
  const lowerBand = mean - config.bollingerMultiplier * sd;

  // Calculate Z-Score and RSI
  const z = zScore(currentPrice, mean, sd);
  const rsi = calculateRSI(closes);

  // Determine recommendation based on mean reversion logic
  let recommendation: MeanReversionSignal['recommendation'] = 'hold';
  let confidence = 50;
  let reason = '';

  if (z <= config.buyZScore && rsi <= config.rsiOversold) {
    recommendation = 'strong_buy';
    confidence = Math.min(95, 70 + Math.abs(z) * 10);
    reason = `Price is ${Math.abs(z).toFixed(1)} std devs below mean (Z=${z.toFixed(2)}), RSI at ${rsi.toFixed(0)} indicates oversold. Strong mean reversion buy signal.`;
  } else if (z <= config.buyZScore * 0.7 || rsi <= config.rsiOversold + 5) {
    recommendation = 'buy';
    confidence = Math.min(85, 55 + Math.abs(z) * 8);
    reason = `Price trending below mean (Z=${z.toFixed(2)}), RSI at ${rsi.toFixed(0)}. Moderate buy signal — approaching oversold territory.`;
  } else if (z >= config.sellZScore && rsi >= config.rsiOverbought) {
    recommendation = 'strong_sell';
    confidence = Math.min(95, 70 + Math.abs(z) * 10);
    reason = `Price is ${z.toFixed(1)} std devs above mean (Z=${z.toFixed(2)}), RSI at ${rsi.toFixed(0)} indicates overbought. Strong mean reversion sell signal.`;
  } else if (z >= config.sellZScore * 0.7 || rsi >= config.rsiOverbought - 5) {
    recommendation = 'sell';
    confidence = Math.min(85, 55 + Math.abs(z) * 8);
    reason = `Price trending above mean (Z=${z.toFixed(2)}), RSI at ${rsi.toFixed(0)}. Moderate sell signal — approaching overbought territory.`;
  } else {
    recommendation = 'hold';
    confidence = 40 + Math.random() * 20;
    reason = `Price near mean (Z=${z.toFixed(2)}), RSI at ${rsi.toFixed(0)}. No clear reversion signal — hold current position.`;
  }

  return {
    symbol,
    price: currentPrice,
    sma: Number(mean.toFixed(2)),
    upperBand: Number(upperBand.toFixed(2)),
    lowerBand: Number(lowerBand.toFixed(2)),
    zScore: Number(z.toFixed(3)),
    rsi: Number(rsi.toFixed(1)),
    recommendation,
    confidence: Number(confidence.toFixed(1)),
    reason,
    timestamp: new Date().toISOString(),
  };
}

/** Calculate position size based on Kelly-inspired sizing */
export function calculatePositionSize(
  signal: MeanReversionSignal,
  availableCash: number,
  totalPortfolioValue: number,
  maxPositionPct: number
): number {
  const maxAllocation = totalPortfolioValue * maxPositionPct;
  const cashToUse = Math.min(availableCash, maxAllocation);

  // Scale by confidence
  const confidenceMultiplier = signal.confidence / 100;
  const allocation = cashToUse * confidenceMultiplier * 0.5; // conservative: use half of max

  if (signal.price <= 0) return 0;
  return Number((allocation / signal.price).toFixed(6));
}

/** Check if stop-loss or take-profit should trigger */
export function checkExitConditions(
  entryPrice: number,
  currentPrice: number,
  stopLossPct: number,
  takeProfitPct: number
): 'stop_loss' | 'take_profit' | null {
  const pnlPct = (currentPrice - entryPrice) / entryPrice;

  if (pnlPct <= -stopLossPct) return 'stop_loss';
  if (pnlPct >= takeProfitPct) return 'take_profit';
  return null;
}
