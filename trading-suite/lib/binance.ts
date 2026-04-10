/**
 * Binance exchange client via ccxt
 * Supports both paper trading (testnet) and live trading
 */

import ccxt, { binance } from 'ccxt';
import { CryptoSymbol, OHLCV, Ticker, TradeOrder } from './types';

let exchange: binance | null = null;

export function getExchange(): binance {
  if (exchange) return exchange;

  const apiKey = process.env.BINANCE_API_KEY || '';
  const secret = process.env.BINANCE_SECRET_KEY || '';
  const testnet = process.env.BINANCE_TESTNET === 'true';

  exchange = new ccxt.binance({
    apiKey,
    secret,
    enableRateLimit: true,
    options: {
      defaultType: 'spot',
    },
  });

  if (testnet) {
    exchange.setSandboxMode(true);
  }

  return exchange;
}

/** Fetch current ticker for a symbol */
export async function getTicker(symbol: CryptoSymbol): Promise<Ticker> {
  const ex = getExchange();
  const ticker = await ex.fetchTicker(symbol);
  return {
    symbol,
    last: ticker.last ?? 0,
    bid: ticker.bid ?? 0,
    ask: ticker.ask ?? 0,
    volume: ticker.baseVolume ?? 0,
    change24h: ticker.percentage ?? 0,
    timestamp: ticker.timestamp ?? Date.now(),
  };
}

/** Fetch tickers for all tracked symbols */
export async function getAllTickers(symbols: CryptoSymbol[]): Promise<Ticker[]> {
  const ex = getExchange();
  const tickers = await ex.fetchTickers(symbols);
  return symbols.map((symbol) => {
    const t = tickers[symbol];
    return {
      symbol,
      last: t?.last ?? 0,
      bid: t?.bid ?? 0,
      ask: t?.ask ?? 0,
      volume: t?.baseVolume ?? 0,
      change24h: t?.percentage ?? 0,
      timestamp: t?.timestamp ?? Date.now(),
    };
  });
}

/** Fetch OHLCV candles for strategy calculations */
export async function getCandles(
  symbol: CryptoSymbol,
  timeframe: string = '1h',
  limit: number = 100
): Promise<OHLCV[]> {
  const ex = getExchange();
  const candles = await ex.fetchOHLCV(symbol, timeframe, undefined, limit);
  return candles.map((c) => ({
    timestamp: c[0] as number,
    open: c[1] as number,
    high: c[2] as number,
    low: c[3] as number,
    close: c[4] as number,
    volume: c[5] as number,
  }));
}

/** Place a market order on Binance */
export async function placeMarketOrder(
  symbol: CryptoSymbol,
  side: 'buy' | 'sell',
  quantity: number
): Promise<TradeOrder> {
  const ex = getExchange();

  // If no API keys, simulate the order
  if (!process.env.BINANCE_API_KEY) {
    const ticker = await getTicker(symbol);
    return {
      id: `sim-${Date.now()}`,
      symbol,
      side,
      quantity,
      price: ticker.last,
      status: 'filled',
      type: 'market',
      createdAt: new Date().toISOString(),
      filledAt: new Date().toISOString(),
    };
  }

  const order = await ex.createMarketOrder(symbol, side, quantity);
  return {
    id: order.id,
    symbol,
    side,
    quantity: order.filled ?? quantity,
    price: order.average ?? order.price ?? 0,
    status: order.status === 'closed' ? 'filled' : (order.status as TradeOrder['status']),
    type: 'market',
    createdAt: new Date(order.timestamp ?? Date.now()).toISOString(),
    filledAt: order.status === 'closed' ? new Date().toISOString() : undefined,
  };
}

/** Fetch account balances from Binance */
export async function getBalances(): Promise<Record<string, number>> {
  if (!process.env.BINANCE_API_KEY) {
    return { USDT: 10000 };
  }
  const ex = getExchange();
  const balance = await ex.fetchBalance();
  const result: Record<string, number> = {};
  for (const [currency, data] of Object.entries(balance.total ?? {})) {
    if (typeof data === 'number' && data > 0) {
      result[currency] = data;
    }
  }
  return result;
}
