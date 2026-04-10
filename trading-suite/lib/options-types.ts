/**
 * Options Trading Type Definitions
 */

export type OptionType = 'call' | 'put';
export type OptionSide = 'buy' | 'sell';

export interface OptionContract {
  symbol: string;           // e.g. "AAPL"
  optionSymbol: string;     // OCC symbol e.g. "AAPL240419C00185000"
  type: OptionType;
  strike: number;
  expiration: string;       // ISO date
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  greeks: OptionGreeks;
  inTheMoney: boolean;
}

export interface OptionGreeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

export interface OptionsChain {
  underlying: string;
  underlyingPrice: number;
  expirations: string[];
  calls: OptionContract[];
  puts: OptionContract[];
  fetchedAt: string;
}

/** ---- Strategy Types ---- */

export type StrategyType =
  | 'long_call'
  | 'long_put'
  | 'short_call'
  | 'short_put'
  | 'bull_call_spread'
  | 'bear_put_spread'
  | 'iron_condor'
  | 'strangle'
  | 'cash_secured_put'
  | 'covered_call';

export interface StrategyLeg {
  contract: OptionContract;
  side: OptionSide;
  quantity: number;
}

export interface OptionsStrategy {
  type: StrategyType;
  name: string;
  legs: StrategyLeg[];
  maxProfit: number;
  maxLoss: number;
  breakeven: number[];
  netDebit: number;        // positive = debit, negative = credit
  collateralRequired: number;
}

export interface OptionsOrder {
  id: string;
  strategy: StrategyType;
  underlying: string;
  legs: {
    optionSymbol: string;
    side: OptionSide;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'filled' | 'partial' | 'rejected' | 'cancelled';
  totalDebit: number;
  totalCredit: number;
  createdAt: string;
  filledAt?: string;
}

export interface OptionsPosition {
  id: string;
  underlying: string;
  strategy: StrategyType;
  legs: {
    optionSymbol: string;
    type: OptionType;
    side: OptionSide;
    strike: number;
    expiration: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
  }[];
  netEntryDebit: number;
  currentValue: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
  openedAt: string;
  daysToExpiry: number;
}

export interface OptionsPortfolio {
  cash: number;
  stockPositions: StockPosition[];
  optionsPositions: OptionsPosition[];
  totalValue: number;
  totalOptionsPnl: number;
  history: OptionsOrder[];
  updatedAt: string;
}

export interface StockPosition {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnl: number;
}

export interface OptionsSignal {
  underlying: string;
  underlyingPrice: number;
  strategy: StrategyType;
  description: string;
  confidence: number;
  expectedReturn: number;
  maxRisk: number;
  legs: {
    type: OptionType;
    side: OptionSide;
    strike: number;
    expiration: string;
    price: number;
  }[];
  reason: string;
  timestamp: string;
}

export type OptionsBotMode = 'auto' | 'manual' | 'paused';

export interface OptionsBotState {
  mode: OptionsBotMode;
  isRunning: boolean;
  watchlist: string[];
  signals: OptionsSignal[];
  portfolio: OptionsPortfolio;
  lastCycleAt: string | null;
  cycleCount: number;
  logs: OptionsBotLog[];
}

export interface OptionsBotLog {
  timestamp: string;
  level: 'info' | 'warn' | 'trade' | 'error';
  message: string;
}

export const DEFAULT_OPTIONS_WATCHLIST = [
  'AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA', 'NVDA', 'META', 'SPY', 'QQQ', 'AMD',
];

export const OPTIONS_CONFIG = {
  maxPositionPct: 0.10,
  minDaysToExpiry: 14,
  maxDaysToExpiry: 60,
  minOpenInterest: 100,
  minVolume: 10,
  wheelStrikeOffset: 0.05,    // 5% OTM for wheel
  spreadWidth: 5,              // $5 wide spreads
  ironCondorWingWidth: 10,     // $10 wide wings
  maxConcurrentPositions: 8,
  profitTargetPct: 0.50,       // close at 50% profit for credit strategies
  stopLossPct: 2.0,            // close at 200% of credit received
};
