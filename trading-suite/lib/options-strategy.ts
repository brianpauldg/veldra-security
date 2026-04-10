/**
 * Options Strategy Engine
 *
 * Analyzes stocks and generates options trade signals for:
 * - Basic: long calls, long puts, short calls, short puts
 * - Spreads: bull call spreads, bear put spreads, iron condors, strangles
 * - Wheel: cash-secured puts -> covered calls
 */

import {
  OptionsChain,
  OptionContract,
  OptionsSignal,
  StrategyType,
  OPTIONS_CONFIG,
} from './options-types';

interface StockAnalysis {
  symbol: string;
  price: number;
  sma20: number;
  sma50: number;
  rsi: number;
  iv: number;
  ivRank: number;  // 0-100, where current IV sits vs. past year
  trend: 'bullish' | 'bearish' | 'neutral';
}

/** Analyze a stock from price bars to determine directional bias + IV environment */
export function analyzeStock(
  symbol: string,
  bars: { close: number; high: number; low: number }[],
  currentIv: number
): StockAnalysis {
  const closes = bars.map((b) => b.close);
  const price = closes[closes.length - 1];

  const sma20 = closes.slice(-20).reduce((a, b) => a + b, 0) / Math.min(20, closes.length);
  const sma50 = closes.slice(-50).reduce((a, b) => a + b, 0) / Math.min(50, closes.length);

  // RSI
  let gains = 0, losses = 0;
  const period = Math.min(14, closes.length - 1);
  for (let i = closes.length - period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff; else losses += Math.abs(diff);
  }
  const rs = losses === 0 ? 100 : gains / losses;
  const rsi = 100 - 100 / (1 + rs);

  // Historical volatility as IV rank proxy
  const returns = closes.slice(1).map((c, i) => Math.log(c / closes[i]));
  const hvol = Math.sqrt(returns.reduce((a, r) => a + r * r, 0) / returns.length) * Math.sqrt(252);
  const ivRank = Math.min(100, Math.max(0, ((currentIv - hvol * 0.8) / (hvol * 0.5)) * 100));

  let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral';
  if (price > sma20 && sma20 > sma50 && rsi > 50) trend = 'bullish';
  else if (price < sma20 && sma20 < sma50 && rsi < 50) trend = 'bearish';

  return {
    symbol, price,
    sma20: Number(sma20.toFixed(2)),
    sma50: Number(sma50.toFixed(2)),
    rsi: Number(rsi.toFixed(1)),
    iv: currentIv,
    ivRank: Number(ivRank.toFixed(0)),
    trend,
  };
}

/** Find the best contract near a target strike and expiration range */
function findContract(
  contracts: OptionContract[],
  targetStrike: number,
  minDte: number,
  maxDte: number
): OptionContract | null {
  const now = Date.now();
  const valid = contracts.filter((c) => {
    const dte = (new Date(c.expiration).getTime() - now) / 86400000;
    return dte >= minDte && dte <= maxDte && c.openInterest >= OPTIONS_CONFIG.minOpenInterest;
  });
  if (valid.length === 0) return null;
  valid.sort((a, b) => Math.abs(a.strike - targetStrike) - Math.abs(b.strike - targetStrike));
  return valid[0];
}

/** Generate all applicable strategy signals for a stock */
export function generateSignals(
  analysis: StockAnalysis,
  chain: OptionsChain
): OptionsSignal[] {
  const signals: OptionsSignal[] = [];
  const { price, trend, rsi, ivRank, symbol } = analysis;
  const { minDaysToExpiry, maxDaysToExpiry } = OPTIONS_CONFIG;

  // ---- DIRECTIONAL: Long Calls / Long Puts ----
  if (trend === 'bullish' && rsi < 65 && ivRank < 50) {
    const strike = Math.round(price * 1.02);
    const contract = findContract(chain.calls, strike, minDaysToExpiry, maxDaysToExpiry);
    if (contract) {
      signals.push({
        underlying: symbol,
        underlyingPrice: price,
        strategy: 'long_call',
        description: `Buy ${symbol} $${contract.strike} Call @ $${contract.ask.toFixed(2)}`,
        confidence: 55 + (65 - rsi) * 0.5 + (50 - ivRank) * 0.2,
        expectedReturn: Number(((contract.ask * 1.5 - contract.ask) / contract.ask * 100).toFixed(1)),
        maxRisk: contract.ask * 100,
        legs: [{ type: 'call', side: 'buy', strike: contract.strike, expiration: contract.expiration, price: contract.ask }],
        reason: `Bullish trend (RSI ${rsi}), low IV rank (${ivRank}%) makes long options attractive.`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  if (trend === 'bearish' && rsi > 35 && ivRank < 50) {
    const strike = Math.round(price * 0.98);
    const contract = findContract(chain.puts, strike, minDaysToExpiry, maxDaysToExpiry);
    if (contract) {
      signals.push({
        underlying: symbol,
        underlyingPrice: price,
        strategy: 'long_put',
        description: `Buy ${symbol} $${contract.strike} Put @ $${contract.ask.toFixed(2)}`,
        confidence: 55 + (rsi - 35) * 0.5 + (50 - ivRank) * 0.2,
        expectedReturn: Number(((contract.ask * 1.5 - contract.ask) / contract.ask * 100).toFixed(1)),
        maxRisk: contract.ask * 100,
        legs: [{ type: 'put', side: 'buy', strike: contract.strike, expiration: contract.expiration, price: contract.ask }],
        reason: `Bearish trend (RSI ${rsi}), low IV rank (${ivRank}%) favors buying puts.`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // ---- SPREADS: Bull Call Spread / Bear Put Spread ----
  if (trend === 'bullish') {
    const longStrike = Math.round(price);
    const shortStrike = longStrike + OPTIONS_CONFIG.spreadWidth;
    const longCall = findContract(chain.calls, longStrike, minDaysToExpiry, maxDaysToExpiry);
    const shortCall = findContract(chain.calls, shortStrike, minDaysToExpiry, maxDaysToExpiry);
    if (longCall && shortCall && longCall.expiration === shortCall.expiration) {
      const debit = longCall.ask - shortCall.bid;
      const maxProfit = shortStrike - longStrike - debit;
      if (debit > 0 && maxProfit > 0) {
        signals.push({
          underlying: symbol,
          underlyingPrice: price,
          strategy: 'bull_call_spread',
          description: `Bull Call Spread: Buy $${longStrike}C / Sell $${shortStrike}C @ $${debit.toFixed(2)} debit`,
          confidence: 60 + (ivRank > 30 ? 5 : 0),
          expectedReturn: Number((maxProfit / debit * 100).toFixed(1)),
          maxRisk: debit * 100,
          legs: [
            { type: 'call', side: 'buy', strike: longStrike, expiration: longCall.expiration, price: longCall.ask },
            { type: 'call', side: 'sell', strike: shortStrike, expiration: shortCall.expiration, price: shortCall.bid },
          ],
          reason: `Bullish bias with defined risk. Max profit $${(maxProfit * 100).toFixed(0)} vs max loss $${(debit * 100).toFixed(0)}.`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  if (trend === 'bearish') {
    const longStrike = Math.round(price);
    const shortStrike = longStrike - OPTIONS_CONFIG.spreadWidth;
    const longPut = findContract(chain.puts, longStrike, minDaysToExpiry, maxDaysToExpiry);
    const shortPut = findContract(chain.puts, shortStrike, minDaysToExpiry, maxDaysToExpiry);
    if (longPut && shortPut && longPut.expiration === shortPut.expiration) {
      const debit = longPut.ask - shortPut.bid;
      const maxProfit = longStrike - shortStrike - debit;
      if (debit > 0 && maxProfit > 0) {
        signals.push({
          underlying: symbol,
          underlyingPrice: price,
          strategy: 'bear_put_spread',
          description: `Bear Put Spread: Buy $${longStrike}P / Sell $${shortStrike}P @ $${debit.toFixed(2)} debit`,
          confidence: 60 + (ivRank > 30 ? 5 : 0),
          expectedReturn: Number((maxProfit / debit * 100).toFixed(1)),
          maxRisk: debit * 100,
          legs: [
            { type: 'put', side: 'buy', strike: longStrike, expiration: longPut.expiration, price: longPut.ask },
            { type: 'put', side: 'sell', strike: shortStrike, expiration: shortPut.expiration, price: shortPut.bid },
          ],
          reason: `Bearish bias with defined risk. Max profit $${(maxProfit * 100).toFixed(0)} vs max loss $${(debit * 100).toFixed(0)}.`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  // ---- IRON CONDOR (neutral, high IV) ----
  if (trend === 'neutral' && ivRank > 40) {
    const offset = OPTIONS_CONFIG.ironCondorWingWidth;
    const putShortStrike = Math.round(price * 0.95);
    const putLongStrike = putShortStrike - offset;
    const callShortStrike = Math.round(price * 1.05);
    const callLongStrike = callShortStrike + offset;

    const sellPut = findContract(chain.puts, putShortStrike, minDaysToExpiry, maxDaysToExpiry);
    const buyPut = findContract(chain.puts, putLongStrike, minDaysToExpiry, maxDaysToExpiry);
    const sellCall = findContract(chain.calls, callShortStrike, minDaysToExpiry, maxDaysToExpiry);
    const buyCall = findContract(chain.calls, callLongStrike, minDaysToExpiry, maxDaysToExpiry);

    if (sellPut && buyPut && sellCall && buyCall) {
      const credit = (sellPut.bid - buyPut.ask) + (sellCall.bid - buyCall.ask);
      if (credit > 0) {
        signals.push({
          underlying: symbol,
          underlyingPrice: price,
          strategy: 'iron_condor',
          description: `Iron Condor: $${putLongStrike}/$${putShortStrike}P - $${callShortStrike}/$${callLongStrike}C @ $${credit.toFixed(2)} credit`,
          confidence: 55 + ivRank * 0.2,
          expectedReturn: Number((credit / (offset - credit) * 100).toFixed(1)),
          maxRisk: (offset - credit) * 100,
          legs: [
            { type: 'put', side: 'buy', strike: putLongStrike, expiration: buyPut.expiration, price: buyPut.ask },
            { type: 'put', side: 'sell', strike: putShortStrike, expiration: sellPut.expiration, price: sellPut.bid },
            { type: 'call', side: 'sell', strike: callShortStrike, expiration: sellCall.expiration, price: sellCall.bid },
            { type: 'call', side: 'buy', strike: callLongStrike, expiration: buyCall.expiration, price: buyCall.ask },
          ],
          reason: `Neutral outlook, high IV rank (${ivRank}%). Profit if ${symbol} stays between $${putShortStrike}-$${callShortStrike} by expiry.`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  // ---- STRANGLE (neutral, high IV) ----
  if (ivRank > 50) {
    const putStrike = Math.round(price * 0.94);
    const callStrike = Math.round(price * 1.06);
    const sellPut = findContract(chain.puts, putStrike, minDaysToExpiry, maxDaysToExpiry);
    const sellCall = findContract(chain.calls, callStrike, minDaysToExpiry, maxDaysToExpiry);

    if (sellPut && sellCall) {
      const credit = sellPut.bid + sellCall.bid;
      signals.push({
        underlying: symbol,
        underlyingPrice: price,
        strategy: 'strangle',
        description: `Short Strangle: Sell $${putStrike}P + $${callStrike}C @ $${credit.toFixed(2)} credit`,
        confidence: 50 + ivRank * 0.15,
        expectedReturn: Number((credit / price * 100).toFixed(1)),
        maxRisk: -1, // undefined risk
        legs: [
          { type: 'put', side: 'sell', strike: putStrike, expiration: sellPut.expiration, price: sellPut.bid },
          { type: 'call', side: 'sell', strike: callStrike, expiration: sellCall.expiration, price: sellCall.bid },
        ],
        reason: `High IV rank (${ivRank}%) makes premium selling attractive. Requires margin. Profit if ${symbol} stays between $${putStrike}-$${callStrike}.`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // ---- WHEEL: Cash-Secured Put ----
  if ((trend === 'bullish' || trend === 'neutral') && ivRank > 25) {
    const strike = Math.round(price * (1 - OPTIONS_CONFIG.wheelStrikeOffset));
    const put = findContract(chain.puts, strike, minDaysToExpiry, maxDaysToExpiry);
    if (put) {
      const annReturn = (put.bid / strike) * (365 / Math.max(1, daysUntil(put.expiration))) * 100;
      signals.push({
        underlying: symbol,
        underlyingPrice: price,
        strategy: 'cash_secured_put',
        description: `Cash-Secured Put: Sell $${put.strike}P @ $${put.bid.toFixed(2)} (${annReturn.toFixed(0)}% ann.)`,
        confidence: 65 + (ivRank - 25) * 0.3,
        expectedReturn: Number(annReturn.toFixed(1)),
        maxRisk: put.strike * 100,
        legs: [{ type: 'put', side: 'sell', strike: put.strike, expiration: put.expiration, price: put.bid }],
        reason: `Wheel strategy entry: sell put ${OPTIONS_CONFIG.wheelStrikeOffset * 100}% OTM. If assigned, own ${symbol} at $${put.strike} then sell covered calls.`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // ---- WHEEL: Covered Call (if holding stock) ----
  if (ivRank > 25) {
    const strike = Math.round(price * (1 + OPTIONS_CONFIG.wheelStrikeOffset));
    const call = findContract(chain.calls, strike, minDaysToExpiry, maxDaysToExpiry);
    if (call) {
      const annReturn = (call.bid / price) * (365 / Math.max(1, daysUntil(call.expiration))) * 100;
      signals.push({
        underlying: symbol,
        underlyingPrice: price,
        strategy: 'covered_call',
        description: `Covered Call: Sell $${call.strike}C @ $${call.bid.toFixed(2)} (${annReturn.toFixed(0)}% ann.)`,
        confidence: 60 + (ivRank - 25) * 0.2,
        expectedReturn: Number(annReturn.toFixed(1)),
        maxRisk: price * 100,
        legs: [{ type: 'call', side: 'sell', strike: call.strike, expiration: call.expiration, price: call.bid }],
        reason: `Wheel strategy: sell call ${OPTIONS_CONFIG.wheelStrikeOffset * 100}% OTM against existing ${symbol} shares. Cap upside at $${call.strike}.`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Normalize confidence
  return signals.map((s) => ({ ...s, confidence: Number(Math.min(95, Math.max(30, s.confidence)).toFixed(1)) }));
}

function daysUntil(dateStr: string): number {
  return Math.max(1, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000));
}
