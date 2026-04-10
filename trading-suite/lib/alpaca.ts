/**
 * Alpaca API Client for Stocks + Options
 * Supports paper trading (default) and live trading
 */

import { OptionContract, OptionsChain, OptionGreeks, StockPosition } from './options-types';

const PAPER_BASE = 'https://paper-api.alpaca.markets';
const LIVE_BASE = 'https://api.alpaca.markets';
const DATA_BASE = 'https://data.alpaca.markets';

function getBaseUrl(): string {
  return process.env.ALPACA_PAPER === 'false' ? LIVE_BASE : PAPER_BASE;
}

function getHeaders(): Record<string, string> {
  return {
    'APCA-API-KEY-ID': process.env.ALPACA_API_KEY || '',
    'APCA-API-SECRET-KEY': process.env.ALPACA_SECRET_KEY || '',
    'Content-Type': 'application/json',
  };
}

function hasKeys(): boolean {
  return !!(process.env.ALPACA_API_KEY && process.env.ALPACA_SECRET_KEY);
}

/** ---- Account ---- */

export async function getAccount(): Promise<{ cash: number; portfolioValue: number; buyingPower: number }> {
  if (!hasKeys()) {
    return { cash: 100000, portfolioValue: 100000, buyingPower: 100000 };
  }
  const res = await fetch(`${getBaseUrl()}/v2/account`, { headers: getHeaders() });
  const data = await res.json();
  return {
    cash: parseFloat(data.cash),
    portfolioValue: parseFloat(data.portfolio_value),
    buyingPower: parseFloat(data.buying_power),
  };
}

/** ---- Stock Quotes ---- */

export async function getStockQuote(symbol: string): Promise<{ price: number; change: number }> {
  if (!hasKeys()) {
    return simulateStockPrice(symbol);
  }
  const res = await fetch(`${DATA_BASE}/v2/stocks/${symbol}/quotes/latest`, { headers: getHeaders() });
  const data = await res.json();
  const mid = (parseFloat(data.quote?.ap || '0') + parseFloat(data.quote?.bp || '0')) / 2;
  return { price: mid, change: 0 };
}

export async function getStockBars(symbol: string, days: number = 30): Promise<{ close: number; high: number; low: number; volume: number; timestamp: string }[]> {
  if (!hasKeys()) {
    return simulateStockBars(symbol, days);
  }
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const res = await fetch(
    `${DATA_BASE}/v2/stocks/${symbol}/bars?timeframe=1Day&start=${start.toISOString()}&end=${end.toISOString()}&limit=${days}`,
    { headers: getHeaders() }
  );
  const data = await res.json();
  return (data.bars || []).map((b: any) => ({
    close: b.c,
    high: b.h,
    low: b.l,
    volume: b.v,
    timestamp: b.t,
  }));
}

/** ---- Options Chain ---- */

export async function getOptionsChain(underlying: string, expiration?: string): Promise<OptionsChain> {
  const quote = await getStockQuote(underlying);

  if (!hasKeys()) {
    return simulateOptionsChain(underlying, quote.price, expiration);
  }

  // Fetch options contracts from Alpaca
  const params = new URLSearchParams({
    underlying_symbols: underlying,
    status: 'active',
    limit: '100',
    type: 'call',
  });
  if (expiration) params.set('expiration_date', expiration);

  const [callsRes, putsRes] = await Promise.all([
    fetch(`${getBaseUrl()}/v2/options/contracts?${params.toString()}`, { headers: getHeaders() }),
    fetch(`${getBaseUrl()}/v2/options/contracts?${new URLSearchParams({ ...Object.fromEntries(params), type: 'put' }).toString()}`, { headers: getHeaders() }),
  ]);

  const callsData = await callsRes.json();
  const putsData = await putsRes.json();

  const mapContract = (c: any, type: 'call' | 'put'): OptionContract => ({
    symbol: underlying,
    optionSymbol: c.symbol || c.id,
    type,
    strike: parseFloat(c.strike_price),
    expiration: c.expiration_date,
    bid: parseFloat(c.close_price || '0') * 0.98,
    ask: parseFloat(c.close_price || '0') * 1.02,
    last: parseFloat(c.close_price || '0'),
    volume: 0,
    openInterest: parseInt(c.open_interest || '0'),
    impliedVolatility: 0.3,
    greeks: estimateGreeks(type, parseFloat(c.strike_price), quote.price, daysUntil(c.expiration_date), 0.3),
    inTheMoney: type === 'call' ? quote.price > parseFloat(c.strike_price) : quote.price < parseFloat(c.strike_price),
  });

  const calls = (callsData.option_contracts || []).map((c: any) => mapContract(c, 'call'));
  const puts = (putsData.option_contracts || []).map((c: any) => mapContract(c, 'put'));
  const expirations = [...new Set([...calls, ...puts].map((c) => c.expiration))].sort();

  return {
    underlying,
    underlyingPrice: quote.price,
    expirations,
    calls,
    puts,
    fetchedAt: new Date().toISOString(),
  };
}

/** ---- Order Execution ---- */

export async function placeStockOrder(symbol: string, side: 'buy' | 'sell', qty: number): Promise<{ id: string; price: number; status: string }> {
  if (!hasKeys()) {
    const quote = await getStockQuote(symbol);
    return { id: `sim-stk-${Date.now()}`, price: quote.price, status: 'filled' };
  }

  const res = await fetch(`${getBaseUrl()}/v2/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      symbol,
      qty: String(qty),
      side,
      type: 'market',
      time_in_force: 'day',
    }),
  });
  const data = await res.json();
  return { id: data.id, price: parseFloat(data.filled_avg_price || '0'), status: data.status };
}

export async function placeOptionOrder(
  legs: { symbol: string; side: 'buy' | 'sell'; qty: number }[]
): Promise<{ id: string; status: string }> {
  if (!hasKeys()) {
    return { id: `sim-opt-${Date.now()}`, status: 'filled' };
  }

  if (legs.length === 1) {
    const leg = legs[0];
    const res = await fetch(`${getBaseUrl()}/v2/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        symbol: leg.symbol,
        qty: String(leg.qty),
        side: leg.side === 'buy' ? 'buy_to_open' : 'sell_to_open',
        type: 'market',
        time_in_force: 'day',
      }),
    });
    const data = await res.json();
    return { id: data.id, status: data.status };
  }

  // Multi-leg order
  const res = await fetch(`${getBaseUrl()}/v2/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      symbol: legs[0].symbol.substring(0, legs[0].symbol.length > 5 ? legs[0].symbol.indexOf(' ') : undefined),
      qty: String(legs[0].qty),
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
      order_class: 'mleg',
      legs: legs.map((l) => ({
        symbol: l.symbol,
        side: l.side === 'buy' ? 'buy_to_open' : 'sell_to_open',
        qty: String(l.qty),
      })),
    }),
  });
  const data = await res.json();
  return { id: data.id, status: data.status };
}

export async function getPositions(): Promise<StockPosition[]> {
  if (!hasKeys()) return [];
  const res = await fetch(`${getBaseUrl()}/v2/positions`, { headers: getHeaders() });
  const data = await res.json();
  return (data || []).map((p: any) => ({
    symbol: p.symbol,
    quantity: parseInt(p.qty),
    avgPrice: parseFloat(p.avg_entry_price),
    currentPrice: parseFloat(p.current_price),
    marketValue: parseFloat(p.market_value),
    unrealizedPnl: parseFloat(p.unrealized_pl),
  }));
}

/** ---- Simulation Helpers ---- */

const STOCK_PRICES: Record<string, number> = {
  AAPL: 195, MSFT: 420, GOOG: 175, AMZN: 185, TSLA: 245,
  NVDA: 880, META: 510, SPY: 520, QQQ: 445, AMD: 160,
};

function simulateStockPrice(symbol: string): { price: number; change: number } {
  const base = STOCK_PRICES[symbol] || 100;
  const drift = (Math.random() - 0.5) * base * 0.02;
  return { price: Number((base + drift).toFixed(2)), change: Number((drift / base * 100).toFixed(2)) };
}

function simulateStockBars(symbol: string, days: number) {
  const base = STOCK_PRICES[symbol] || 100;
  const bars = [];
  let price = base * 0.95;
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.48) * price * 0.025;
    price = Math.max(price * 0.8, price + change);
    const high = price * (1 + Math.random() * 0.015);
    const low = price * (1 - Math.random() * 0.015);
    bars.push({
      close: Number(price.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      volume: Math.floor(5000000 + Math.random() * 20000000),
      timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    });
  }
  return bars;
}

function simulateOptionsChain(underlying: string, price: number, expiration?: string): OptionsChain {
  const expirations: string[] = [];
  const now = new Date();
  for (let w = 1; w <= 8; w++) {
    const d = new Date(now.getTime() + w * 7 * 86400000);
    // Fridays
    d.setDate(d.getDate() + (5 - d.getDay()));
    expirations.push(d.toISOString().split('T')[0]);
  }

  const targetExp = expiration || expirations[2]; // ~3 weeks out
  const dte = daysUntil(targetExp);
  const iv = 0.25 + Math.random() * 0.2;

  const strikes: number[] = [];
  const step = price > 500 ? 10 : price > 100 ? 5 : price > 50 ? 2.5 : 1;
  const center = Math.round(price / step) * step;
  for (let i = -8; i <= 8; i++) {
    strikes.push(Number((center + i * step).toFixed(2)));
  }

  const calls: OptionContract[] = strikes.map((strike) => {
    const cp = blackScholesPrice('call', price, strike, dte / 365, 0.05, iv);
    const greeks = estimateGreeks('call', strike, price, dte, iv);
    return {
      symbol: underlying,
      optionSymbol: formatOCC(underlying, targetExp, 'C', strike),
      type: 'call' as const,
      strike,
      expiration: targetExp,
      bid: Number((cp * 0.95).toFixed(2)),
      ask: Number((cp * 1.05).toFixed(2)),
      last: Number(cp.toFixed(2)),
      volume: Math.floor(50 + Math.random() * 2000),
      openInterest: Math.floor(200 + Math.random() * 10000),
      impliedVolatility: Number(iv.toFixed(3)),
      greeks,
      inTheMoney: price > strike,
    };
  });

  const puts: OptionContract[] = strikes.map((strike) => {
    const pp = blackScholesPrice('put', price, strike, dte / 365, 0.05, iv);
    const greeks = estimateGreeks('put', strike, price, dte, iv);
    return {
      symbol: underlying,
      optionSymbol: formatOCC(underlying, targetExp, 'P', strike),
      type: 'put' as const,
      strike,
      expiration: targetExp,
      bid: Number((pp * 0.95).toFixed(2)),
      ask: Number((pp * 1.05).toFixed(2)),
      last: Number(pp.toFixed(2)),
      volume: Math.floor(50 + Math.random() * 2000),
      openInterest: Math.floor(200 + Math.random() * 10000),
      impliedVolatility: Number(iv.toFixed(3)),
      greeks,
      inTheMoney: price < strike,
    };
  });

  return { underlying, underlyingPrice: price, expirations, calls, puts, fetchedAt: new Date().toISOString() };
}

/** ---- Black-Scholes & Greeks ---- */

function normalCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function blackScholesPrice(type: 'call' | 'put', S: number, K: number, T: number, r: number, sigma: number): number {
  if (T <= 0) return Math.max(0, type === 'call' ? S - K : K - S);
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  if (type === 'call') {
    return S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  }
  return K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
}

function estimateGreeks(type: 'call' | 'put', strike: number, price: number, dte: number, iv: number): OptionGreeks {
  const T = Math.max(dte / 365, 0.001);
  const r = 0.05;
  const d1 = (Math.log(price / strike) + (r + iv * iv / 2) * T) / (iv * Math.sqrt(T));
  const d2 = d1 - iv * Math.sqrt(T);

  const delta = type === 'call' ? normalCDF(d1) : normalCDF(d1) - 1;
  const gamma = normalPDF(d1) / (price * iv * Math.sqrt(T));
  const theta = (-(price * normalPDF(d1) * iv) / (2 * Math.sqrt(T)) - r * strike * Math.exp(-r * T) * (type === 'call' ? normalCDF(d2) : normalCDF(-d2))) / 365;
  const vega = price * normalPDF(d1) * Math.sqrt(T) / 100;
  const rho = (type === 'call' ? 1 : -1) * strike * T * Math.exp(-r * T) * normalCDF(type === 'call' ? d2 : -d2) / 100;

  return {
    delta: Number(delta.toFixed(4)),
    gamma: Number(gamma.toFixed(6)),
    theta: Number(theta.toFixed(4)),
    vega: Number(vega.toFixed(4)),
    rho: Number(rho.toFixed(4)),
  };
}

function daysUntil(dateStr: string): number {
  return Math.max(1, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000));
}

function formatOCC(symbol: string, expDate: string, type: string, strike: number): string {
  const padSymbol = symbol.padEnd(6, ' ');
  const date = expDate.replace(/-/g, '').slice(2);
  const strikeStr = String(Math.round(strike * 1000)).padStart(8, '0');
  return `${padSymbol}${date}${type}${strikeStr}`;
}
