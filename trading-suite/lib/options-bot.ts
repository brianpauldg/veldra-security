/**
 * Options Trading Bot Engine
 *
 * Manages the options bot lifecycle: analysis cycles, signal generation,
 * and auto/manual execution of options strategies.
 */

import {
  OptionsBotState,
  OptionsBotMode,
  OptionsBotLog,
  OptionsSignal,
  OptionsOrder,
  OptionsPosition,
  DEFAULT_OPTIONS_WATCHLIST,
  OPTIONS_CONFIG,
} from './options-types';
import { getOptionsChain, getStockBars, getStockQuote, placeOptionOrder, placeStockOrder, getAccount } from './alpaca';
import { analyzeStock, generateSignals } from './options-strategy';

const MAX_LOGS = 200;

let state: OptionsBotState = {
  mode: 'manual',
  isRunning: false,
  watchlist: [...DEFAULT_OPTIONS_WATCHLIST],
  signals: [],
  portfolio: {
    cash: 100000,
    stockPositions: [],
    optionsPositions: [],
    totalValue: 100000,
    totalOptionsPnl: 0,
    history: [],
    updatedAt: new Date().toISOString(),
  },
  lastCycleAt: null,
  cycleCount: 0,
  logs: [],
};

let cycleTimer: ReturnType<typeof setInterval> | null = null;

function log(level: OptionsBotLog['level'], message: string) {
  state.logs.unshift({ timestamp: new Date().toISOString(), level, message });
  if (state.logs.length > MAX_LOGS) state.logs = state.logs.slice(0, MAX_LOGS);
}

export function getOptionsBotState(): OptionsBotState {
  return { ...state };
}

export function setOptionsMode(mode: OptionsBotMode) {
  state.mode = mode;
  log('info', `Options bot mode: ${mode}`);
}

export function setOptionsWatchlist(symbols: string[]) {
  state.watchlist = symbols;
  log('info', `Watchlist updated: ${symbols.join(', ')}`);
}

export function setOptionsCash(amount: number) {
  state.portfolio.cash = amount;
  state.portfolio.totalValue = amount;
  log('info', `Portfolio cash set to $${amount.toLocaleString()}`);
}

/** Run one analysis cycle across the watchlist */
export async function runOptionsCycle(): Promise<OptionsSignal[]> {
  const allSignals: OptionsSignal[] = [];
  log('info', `Running options cycle #${state.cycleCount + 1} (${state.watchlist.length} symbols)`);

  // Sync account if connected
  try {
    const acct = await getAccount();
    if (acct.cash !== 100000) { // not simulated default
      state.portfolio.cash = acct.cash;
    }
  } catch { /* ignore */ }

  for (const symbol of state.watchlist) {
    try {
      const [bars, chain] = await Promise.all([
        getStockBars(symbol, 60),
        getOptionsChain(symbol),
      ]);

      const avgIv = chain.calls.length > 0
        ? chain.calls.reduce((s, c) => s + c.impliedVolatility, 0) / chain.calls.length
        : 0.3;

      const analysis = analyzeStock(symbol, bars, avgIv);
      const signals = generateSignals(analysis, chain);
      allSignals.push(...signals);

      if (signals.length > 0) {
        log('info', `${symbol}: ${signals.length} signal(s) — trend: ${analysis.trend}, IV rank: ${analysis.ivRank}%`);
      }
    } catch (err) {
      log('error', `Failed to analyze ${symbol}: ${err}`);
    }
  }

  state.signals = allSignals;

  // Check existing positions for management
  await managePositions();

  // Auto-execute if in auto mode
  if (state.mode === 'auto') {
    await autoExecuteSignals(allSignals);
  }

  state.lastCycleAt = new Date().toISOString();
  state.cycleCount++;
  return allSignals;
}

/** Auto-execute top signals */
async function autoExecuteSignals(signals: OptionsSignal[]) {
  const sorted = [...signals].sort((a, b) => b.confidence - a.confidence);
  const currentPositionCount = state.portfolio.optionsPositions.length;
  const slotsAvailable = OPTIONS_CONFIG.maxConcurrentPositions - currentPositionCount;

  if (slotsAvailable <= 0) {
    log('info', 'Max concurrent positions reached, skipping auto-execution');
    return;
  }

  // Take top signals that fit within budget
  const toExecute = sorted.slice(0, slotsAvailable);

  for (const signal of toExecute) {
    // Check if we already have a position in this underlying
    const hasPosition = state.portfolio.optionsPositions.some((p) => p.underlying === signal.underlying);
    if (hasPosition) continue;

    // Budget check
    const cost = signal.maxRisk > 0 ? signal.maxRisk : Math.abs(signal.legs.reduce((s, l) => s + l.price, 0)) * 100;
    const maxAllocation = state.portfolio.totalValue * OPTIONS_CONFIG.maxPositionPct;
    if (cost > maxAllocation || cost > state.portfolio.cash) continue;

    await executeSignal(signal, `Auto: ${signal.strategy}`);
  }
}

/** Execute a specific signal */
export async function executeSignal(signal: OptionsSignal, reason: string): Promise<OptionsOrder | null> {
  try {
    const orderLegs = signal.legs.map((l) => ({
      symbol: formatOCCFromSignal(signal.underlying, l.expiration, l.type, l.strike),
      side: l.side,
      qty: 1,
    }));

    const result = await placeOptionOrder(orderLegs);

    const order: OptionsOrder = {
      id: result.id,
      strategy: signal.strategy,
      underlying: signal.underlying,
      legs: signal.legs.map((l) => ({
        optionSymbol: formatOCCFromSignal(signal.underlying, l.expiration, l.type, l.strike),
        side: l.side,
        quantity: 1,
        price: l.price,
      })),
      status: result.status === 'filled' ? 'filled' : 'pending',
      totalDebit: signal.legs.filter((l) => l.side === 'buy').reduce((s, l) => s + l.price, 0) * 100,
      totalCredit: signal.legs.filter((l) => l.side === 'sell').reduce((s, l) => s + l.price, 0) * 100,
      createdAt: new Date().toISOString(),
      filledAt: result.status === 'filled' ? new Date().toISOString() : undefined,
    };

    // Update portfolio
    const netDebit = order.totalDebit - order.totalCredit;
    state.portfolio.cash -= netDebit;
    state.portfolio.history.unshift(order);

    // Create position
    const position: OptionsPosition = {
      id: order.id,
      underlying: signal.underlying,
      strategy: signal.strategy,
      legs: signal.legs.map((l) => ({
        optionSymbol: formatOCCFromSignal(signal.underlying, l.expiration, l.type, l.strike),
        type: l.type,
        side: l.side,
        strike: l.strike,
        expiration: l.expiration,
        quantity: 1,
        entryPrice: l.price,
        currentPrice: l.price,
      })),
      netEntryDebit: netDebit,
      currentValue: -netDebit, // for credit trades, this is positive
      unrealizedPnl: 0,
      unrealizedPnlPct: 0,
      openedAt: new Date().toISOString(),
      daysToExpiry: Math.ceil((new Date(signal.legs[0].expiration).getTime() - Date.now()) / 86400000),
    };

    state.portfolio.optionsPositions.push(position);
    log('trade', `${signal.strategy.toUpperCase()} ${signal.underlying}: ${signal.description} — ${reason}`);

    updatePortfolioValue();
    return order;
  } catch (err) {
    log('error', `Failed to execute ${signal.strategy} on ${signal.underlying}: ${err}`);
    return null;
  }
}

/** Manage existing positions (profit targets, stop losses, expiration) */
async function managePositions() {
  for (const pos of [...state.portfolio.optionsPositions]) {
    // Update current prices
    try {
      const chain = await getOptionsChain(pos.underlying);
      for (const leg of pos.legs) {
        const contracts = leg.type === 'call' ? chain.calls : chain.puts;
        const match = contracts.find((c) => Math.abs(c.strike - leg.strike) < 0.01);
        if (match) {
          leg.currentPrice = leg.side === 'buy' ? match.bid : match.ask;
        }
      }
    } catch { /* ignore */ }

    // Calculate current P&L
    const currentValue = pos.legs.reduce((sum, leg) => {
      const mult = leg.side === 'buy' ? 1 : -1;
      return sum + mult * leg.currentPrice * 100 * leg.quantity;
    }, 0);

    const entryValue = pos.legs.reduce((sum, leg) => {
      const mult = leg.side === 'buy' ? -1 : 1;
      return sum + mult * leg.entryPrice * 100 * leg.quantity;
    }, 0);

    pos.currentValue = Number(currentValue.toFixed(2));
    pos.unrealizedPnl = Number((currentValue + entryValue).toFixed(2));
    pos.unrealizedPnlPct = entryValue !== 0 ? Number((pos.unrealizedPnl / Math.abs(entryValue) * 100).toFixed(2)) : 0;
    pos.daysToExpiry = Math.ceil((new Date(pos.legs[0].expiration).getTime() - Date.now()) / 86400000);

    // Check management rules in auto mode
    if (state.mode === 'auto') {
      const isCredit = pos.netEntryDebit < 0;

      // Profit target for credit strategies
      if (isCredit && pos.unrealizedPnlPct >= OPTIONS_CONFIG.profitTargetPct * 100) {
        log('trade', `Closing ${pos.underlying} ${pos.strategy} at ${pos.unrealizedPnlPct}% profit`);
        closePosition(pos.id, 'Profit target hit');
        continue;
      }

      // Stop loss
      if (isCredit && pos.unrealizedPnlPct <= -OPTIONS_CONFIG.stopLossPct * 100) {
        log('warn', `Stop loss triggered for ${pos.underlying} ${pos.strategy} at ${pos.unrealizedPnlPct}%`);
        closePosition(pos.id, 'Stop loss');
        continue;
      }

      // Close near expiration (< 3 days)
      if (pos.daysToExpiry <= 3) {
        log('warn', `Closing ${pos.underlying} ${pos.strategy} — ${pos.daysToExpiry} days to expiry`);
        closePosition(pos.id, 'Near expiration');
        continue;
      }
    }
  }

  updatePortfolioValue();
}

/** Close an options position */
export function closePosition(positionId: string, reason: string) {
  const idx = state.portfolio.optionsPositions.findIndex((p) => p.id === positionId);
  if (idx === -1) return;

  const pos = state.portfolio.optionsPositions[idx];
  state.portfolio.cash += pos.currentValue + pos.netEntryDebit;
  state.portfolio.totalOptionsPnl += pos.unrealizedPnl;

  log('trade', `Closed ${pos.underlying} ${pos.strategy}: P&L $${pos.unrealizedPnl.toFixed(2)} — ${reason}`);

  state.portfolio.optionsPositions.splice(idx, 1);
  updatePortfolioValue();
}

/** Execute a manual trade from a signal */
export async function manualOptionsExecute(signal: OptionsSignal): Promise<OptionsOrder | null> {
  return executeSignal(signal, 'Manual trade');
}

function updatePortfolioValue() {
  const optionsValue = state.portfolio.optionsPositions.reduce((s, p) => s + p.currentValue, 0);
  const stockValue = state.portfolio.stockPositions.reduce((s, p) => s + p.marketValue, 0);
  state.portfolio.totalValue = Number((state.portfolio.cash + optionsValue + stockValue).toFixed(2));
  state.portfolio.updatedAt = new Date().toISOString();
}

/** Start bot loop */
export function startOptionsBot() {
  if (state.isRunning) return;
  state.isRunning = true;
  log('info', 'Options bot started');

  runOptionsCycle().catch((err) => log('error', `Cycle error: ${err}`));
  cycleTimer = setInterval(() => {
    if (state.mode !== 'paused') {
      runOptionsCycle().catch((err) => log('error', `Cycle error: ${err}`));
    }
  }, 60000); // 1 minute interval for options
}

/** Stop bot loop */
export function stopOptionsBot() {
  if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
  state.isRunning = false;
  log('info', 'Options bot stopped');
}

function formatOCCFromSignal(symbol: string, expDate: string, type: 'call' | 'put', strike: number): string {
  const padSymbol = symbol.padEnd(6, ' ');
  const date = expDate.replace(/-/g, '').slice(2);
  const t = type === 'call' ? 'C' : 'P';
  const strikeStr = String(Math.round(strike * 1000)).padStart(8, '0');
  return `${padSymbol}${date}${t}${strikeStr}`;
}
