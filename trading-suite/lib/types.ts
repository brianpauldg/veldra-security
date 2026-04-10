/**
 * Crypto trading bot type definitions
 */

export type CryptoSymbol =
  | 'BTC/USDT'
  | 'ETH/USDT'
  | 'SOL/USDT'
  | 'BNB/USDT'
  | 'XRP/USDT'
  | 'ADA/USDT'
  | 'AVAX/USDT'
  | 'DOGE/USDT';

export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Ticker {
  symbol: CryptoSymbol;
  last: number;
  bid: number;
  ask: number;
  volume: number;
  change24h: number;
  timestamp: number;
}

export interface TradeOrder {
  id: string;
  symbol: CryptoSymbol;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'pending' | 'filled' | 'rejected' | 'cancelled';
  type: 'market' | 'limit';
  createdAt: string;
  filledAt?: string;
  pnl?: number;
}

export interface Position {
  symbol: CryptoSymbol;
  quantity: number;
  avgEntryPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
}

export interface Portfolio {
  cash: number;
  totalValue: number;
  positions: Position[];
  history: TradeOrder[];
  updatedAt: string;
}

export interface MeanReversionSignal {
  symbol: CryptoSymbol;
  price: number;
  sma: number;
  upperBand: number;
  lowerBand: number;
  zScore: number;
  rsi: number;
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
  confidence: number;
  reason: string;
  timestamp: string;
}

export interface BotConfig {
  symbols: CryptoSymbol[];
  /** Lookback period for SMA/Bollinger */
  lookbackPeriod: number;
  /** Number of standard deviations for Bollinger Bands */
  bollingerMultiplier: number;
  /** Z-score threshold to trigger buy */
  buyZScore: number;
  /** Z-score threshold to trigger sell */
  sellZScore: number;
  /** RSI oversold level */
  rsiOversold: number;
  /** RSI overbought level */
  rsiOverbought: number;
  /** Max % of portfolio per position */
  maxPositionPct: number;
  /** Interval in seconds between bot cycles */
  intervalSeconds: number;
  /** Stop-loss percentage */
  stopLossPct: number;
  /** Take-profit percentage */
  takeProfitPct: number;
}

export type BotMode = 'auto' | 'manual' | 'paused';

export interface BotState {
  mode: BotMode;
  isRunning: boolean;
  config: BotConfig;
  signals: MeanReversionSignal[];
  lastCycleAt: string | null;
  cycleCount: number;
  portfolio: Portfolio;
  logs: BotLogEntry[];
}

export interface BotLogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'trade' | 'error';
  message: string;
}

export const DEFAULT_BOT_CONFIG: BotConfig = {
  symbols: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT', 'ADA/USDT', 'AVAX/USDT', 'DOGE/USDT'],
  lookbackPeriod: 20,
  bollingerMultiplier: 2,
  buyZScore: -1.5,
  sellZScore: 1.5,
  rsiOversold: 30,
  rsiOverbought: 70,
  maxPositionPct: 0.15,
  intervalSeconds: 30,
  stopLossPct: 0.03,
  takeProfitPct: 0.05,
};
