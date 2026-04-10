/**
 * Trading Bot Engine
 *
 * Manages the bot lifecycle: runs analysis cycles, generates signals,
 * and optionally auto-executes trades based on mean reversion strategy.
 */

import {
  BotState,
  BotMode,
  BotConfig,
  BotLogEntry,
  CryptoSymbol,
  MeanReversionSignal,
  Portfolio,
  Position,
  TradeOrder,
  DEFAULT_BOT_CONFIG,
} from './types';
import { getCandles, getAllTickers, placeMarketOrder } from './binance';
import { analyzeSymbol, calculatePositionSize, checkExitConditions } from './strategy';

const MAX_LOGS = 200;

/** In-memory bot state (server-side singleton) */
let botState: BotState = {
  mode: 'manual',
  isRunning: false,
  config: { ...DEFAULT_BOT_CONFIG },
  signals: [],
  lastCycleAt: null,
  cycleCount: 0,
  portfolio: {
    cash: 10000,
    totalValue: 10000,
    positions: [],
    history: [],
    updatedAt: new Date().toISOString(),
  },
  logs: [],
};

let cycleInterval: ReturnType<typeof setInterval> | null = null;

function addLog(level: BotLogEntry['level'], message: string) {
  botState.logs.unshift({
    timestamp: new Date().toISOString(),
    level,
    message,
  });
  if (botState.logs.length > MAX_LOGS) {
    botState.logs = botState.logs.slice(0, MAX_LOGS);
  }
}

/** Get current bot state */
export function getBotState(): BotState {
  return { ...botState };
}

/** Update bot mode */
export function setBotMode(mode: BotMode) {
  botState.mode = mode;
  addLog('info', `Bot mode changed to: ${mode}`);
}

/** Update bot config */
export function updateBotConfig(config: Partial<BotConfig>) {
  botState.config = { ...botState.config, ...config };
  addLog('info', 'Bot configuration updated');
}

/** Update portfolio cash (for initial funding) */
export function setPortfolioCash(amount: number) {
  botState.portfolio.cash = amount;
  botState.portfolio.totalValue = amount + botState.portfolio.positions.reduce((s, p) => s + p.marketValue, 0);
  addLog('info', `Portfolio cash set to $${amount.toLocaleString()}`);
}

/** Refresh portfolio positions with current prices */
async function refreshPortfolio() {
  const symbols = botState.portfolio.positions.map((p) => p.symbol);
  if (symbols.length === 0) {
    botState.portfolio.totalValue = botState.portfolio.cash;
    botState.portfolio.updatedAt = new Date().toISOString();
    return;
  }

  try {
    const tickers = await getAllTickers(symbols);
    const tickerMap = new Map(tickers.map((t) => [t.symbol, t]));

    botState.portfolio.positions = botState.portfolio.positions.map((pos) => {
      const ticker = tickerMap.get(pos.symbol);
      const currentPrice = ticker?.last ?? pos.currentPrice;
      const marketValue = pos.quantity * currentPrice;
      const costBasis = pos.quantity * pos.avgEntryPrice;
      const unrealizedPnl = marketValue - costBasis;
      const unrealizedPnlPct = costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0;

      return {
        ...pos,
        currentPrice,
        marketValue: Number(marketValue.toFixed(2)),
        unrealizedPnl: Number(unrealizedPnl.toFixed(2)),
        unrealizedPnlPct: Number(unrealizedPnlPct.toFixed(2)),
      };
    });

    const positionValue = botState.portfolio.positions.reduce((s, p) => s + p.marketValue, 0);
    botState.portfolio.totalValue = Number((botState.portfolio.cash + positionValue).toFixed(2));
    botState.portfolio.updatedAt = new Date().toISOString();
  } catch (err) {
    addLog('error', `Failed to refresh portfolio: ${err}`);
  }
}

/** Execute a trade and update portfolio */
async function executeTrade(
  symbol: CryptoSymbol,
  side: 'buy' | 'sell',
  quantity: number,
  reason: string
): Promise<TradeOrder | null> {
  try {
    const order = await placeMarketOrder(symbol, side, quantity);

    if (order.status === 'filled') {
      if (side === 'buy') {
        const cost = order.price * order.quantity;
        botState.portfolio.cash = Number((botState.portfolio.cash - cost).toFixed(2));

        const existing = botState.portfolio.positions.find((p) => p.symbol === symbol);
        if (existing) {
          const totalCost = existing.avgEntryPrice * existing.quantity + cost;
          const totalQty = existing.quantity + order.quantity;
          existing.quantity = Number(totalQty.toFixed(6));
          existing.avgEntryPrice = Number((totalCost / totalQty).toFixed(2));
          existing.currentPrice = order.price;
          existing.marketValue = Number((totalQty * order.price).toFixed(2));
        } else {
          botState.portfolio.positions.push({
            symbol,
            quantity: order.quantity,
            avgEntryPrice: order.price,
            currentPrice: order.price,
            marketValue: Number((order.quantity * order.price).toFixed(2)),
            unrealizedPnl: 0,
            unrealizedPnlPct: 0,
          });
        }
      } else {
        const proceeds = order.price * order.quantity;
        botState.portfolio.cash = Number((botState.portfolio.cash + proceeds).toFixed(2));

        const existing = botState.portfolio.positions.find((p) => p.symbol === symbol);
        if (existing) {
          const pnl = (order.price - existing.avgEntryPrice) * order.quantity;
          order.pnl = Number(pnl.toFixed(2));
          existing.quantity = Number((existing.quantity - order.quantity).toFixed(6));
          if (existing.quantity <= 0.000001) {
            botState.portfolio.positions = botState.portfolio.positions.filter((p) => p.symbol !== symbol);
          }
        }
      }

      botState.portfolio.history.unshift(order);
      addLog('trade', `${side.toUpperCase()} ${quantity} ${symbol} @ $${order.price.toLocaleString()} — ${reason}`);
    }

    await refreshPortfolio();
    return order;
  } catch (err) {
    addLog('error', `Trade execution failed for ${symbol}: ${err}`);
    return null;
  }
}

/** Run one analysis + trading cycle */
export async function runCycle(): Promise<MeanReversionSignal[]> {
  const { config, mode } = botState;
  const signals: MeanReversionSignal[] = [];

  addLog('info', `Running cycle #${botState.cycleCount + 1} (mode: ${mode})`);

  // 1. Fetch candles and analyze each symbol
  for (const symbol of config.symbols) {
    try {
      const candles = await getCandles(symbol, '1h', config.lookbackPeriod + 20);
      const signal = analyzeSymbol(symbol, candles, config);
      signals.push(signal);
    } catch (err) {
      addLog('error', `Failed to analyze ${symbol}: ${err}`);
    }
  }

  botState.signals = signals;

  // 2. Check existing positions for stop-loss / take-profit
  await refreshPortfolio();
  for (const position of [...botState.portfolio.positions]) {
    const exitCondition = checkExitConditions(
      position.avgEntryPrice,
      position.currentPrice,
      config.stopLossPct,
      config.takeProfitPct
    );

    if (exitCondition && mode === 'auto') {
      addLog('warn', `${exitCondition.replace('_', ' ').toUpperCase()} triggered for ${position.symbol}`);
      await executeTrade(position.symbol, 'sell', position.quantity, exitCondition);
    } else if (exitCondition) {
      addLog('warn', `${exitCondition.replace('_', ' ').toUpperCase()} triggered for ${position.symbol} — manual mode, not executing`);
    }
  }

  // 3. Execute trades based on signals (auto mode only)
  if (mode === 'auto') {
    for (const signal of signals) {
      const hasPosition = botState.portfolio.positions.find((p) => p.symbol === signal.symbol);

      if ((signal.recommendation === 'strong_buy' || signal.recommendation === 'buy') && !hasPosition) {
        const qty = calculatePositionSize(
          signal,
          botState.portfolio.cash,
          botState.portfolio.totalValue,
          config.maxPositionPct
        );
        if (qty > 0 && botState.portfolio.cash >= signal.price * qty) {
          await executeTrade(signal.symbol, 'buy', qty, `Mean reversion ${signal.recommendation} (Z=${signal.zScore})`);
        }
      }

      if ((signal.recommendation === 'strong_sell' || signal.recommendation === 'sell') && hasPosition) {
        await executeTrade(
          signal.symbol,
          'sell',
          hasPosition.quantity,
          `Mean reversion ${signal.recommendation} (Z=${signal.zScore})`
        );
      }
    }
  }

  botState.lastCycleAt = new Date().toISOString();
  botState.cycleCount++;
  return signals;
}

/** Start the bot loop */
export function startBot() {
  if (botState.isRunning) return;

  botState.isRunning = true;
  addLog('info', `Bot started (interval: ${botState.config.intervalSeconds}s)`);

  // Run immediately, then on interval
  runCycle().catch((err) => addLog('error', `Cycle error: ${err}`));

  cycleInterval = setInterval(() => {
    if (botState.mode !== 'paused') {
      runCycle().catch((err) => addLog('error', `Cycle error: ${err}`));
    }
  }, botState.config.intervalSeconds * 1000);
}

/** Stop the bot loop */
export function stopBot() {
  if (cycleInterval) {
    clearInterval(cycleInterval);
    cycleInterval = null;
  }
  botState.isRunning = false;
  addLog('info', 'Bot stopped');
}

/** Manual trade (used from dashboard in manual mode) */
export async function manualTrade(
  symbol: CryptoSymbol,
  side: 'buy' | 'sell',
  quantity: number
): Promise<TradeOrder | null> {
  return executeTrade(symbol, side, quantity, 'Manual trade');
}
