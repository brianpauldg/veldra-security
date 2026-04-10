'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  CryptoSymbol,
  MeanReversionSignal,
  Portfolio,
  BotMode,
  BotLogEntry,
} from '@/lib/types';

const SYMBOLS: CryptoSymbol[] = [
  'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT',
  'XRP/USDT', 'ADA/USDT', 'AVAX/USDT', 'DOGE/USDT',
];

interface DashboardData {
  portfolio: Portfolio;
  signals: MeanReversionSignal[];
  mode: BotMode;
  isRunning: boolean;
  lastCycleAt: string | null;
  cycleCount: number;
  logs: BotLogEntry[];
}

export function TradingDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<CryptoSymbol>('BTC/USDT');
  const [quantity, setQuantity] = useState('0.001');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<'signals' | 'positions' | 'history' | 'logs'>('signals');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/trading');
      const json = await res.json();
      if (res.ok) setData(json);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 5000);
    return () => clearInterval(i);
  }, [fetchData]);

  const botAction = async (action: string, extra: Record<string, unknown> = {}) => {
    const res = await fetch('/api/bot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...extra }) });
    const json = await res.json();
    setMessage(json.message || json.error || '');
    fetchData();
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) return setMessage('Invalid quantity');
    const res = await fetch('/api/trading', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symbol: selectedSymbol, side: orderSide, quantity: qty }) });
    const json = await res.json();
    if (res.ok) { setMessage(`${orderSide.toUpperCase()} ${qty} ${selectedSymbol} @ $${json.order.price.toLocaleString()}`); setData(prev => prev ? { ...prev, portfolio: json.portfolio } : prev); }
    else setMessage(json.error || 'Failed');
  };

  if (loading || !data) return <div style={{ display: 'grid', placeItems: 'center', minHeight: '50vh', color: '#71717a' }}>Loading...</div>;

  const { portfolio, signals, mode, isRunning, lastCycleAt, cycleCount, logs } = data;
  const totalPnl = portfolio.positions.reduce((s, p) => s + p.unrealizedPnl, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Crypto Bot</h1>
          <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#71717a' }}>
            Mean reversion · {cycleCount} cycles{lastCycleAt && ` · ${new Date(lastCycleAt).toLocaleTimeString()}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Pill text={isRunning ? 'LIVE' : 'OFF'} color={isRunning ? '#4ade80' : '#71717a'} />
          <Pill text={mode} color={mode === 'auto' ? '#a78bfa' : mode === 'manual' ? '#facc15' : '#71717a'} />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {!isRunning
          ? <Btn onClick={() => botAction('start')}>Start</Btn>
          : <Btn onClick={() => botAction('stop')} accent>Stop</Btn>}
        <Btn onClick={() => botAction('cycle')}>Cycle</Btn>
        <div style={{ display: 'flex', gap: 2, marginLeft: 4 }}>
          {(['auto', 'manual', 'paused'] as BotMode[]).map(m => (
            <button key={m} onClick={() => botAction('mode', { mode: m })} style={{
              padding: '5px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '0.72rem', fontWeight: 500,
              background: mode === m ? '#27272a' : 'transparent', color: mode === m ? '#fafafa' : '#71717a',
            }}>{m}</button>
          ))}
        </div>
        {message && <span style={{ fontSize: '0.72rem', color: '#a1a1aa', marginLeft: 8 }}>{message}</span>}
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
        <Metric label="Cash" value={`$${portfolio.cash.toLocaleString()}`} />
        <Metric label="Value" value={`$${portfolio.totalValue.toLocaleString()}`} />
        <Metric label="Positions" value={String(portfolio.positions.length)} />
        <Metric label="Trades" value={String(portfolio.history.length)} />
        <Metric label="P&L" value={`${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)}`} color={totalPnl >= 0 ? '#4ade80' : '#f87171'} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #27272a', paddingBottom: 0 }}>
        {(['signals', 'positions', 'history', 'logs'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 14px', border: 'none', borderBottom: tab === t ? '2px solid #a78bfa' : '2px solid transparent',
            background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: '0.75rem', fontWeight: 500, color: tab === t ? '#fafafa' : '#71717a',
          }}>{t} ({t === 'signals' ? signals.length : t === 'positions' ? portfolio.positions.length : t === 'history' ? portfolio.history.length : logs.length})</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 150 }}>
        {tab === 'signals' && (signals.length === 0
          ? <Empty text="No signals. Run a cycle." />
          : signals.map(s => (
            <div key={s.symbol} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.symbol} <span style={{ color: '#71717a', fontWeight: 400 }}>${s.price.toLocaleString()}</span></span>
                <SignalBadge rec={s.recommendation} confidence={s.confidence} />
              </div>
              <div style={{ display: 'flex', gap: 14, fontSize: '0.7rem', color: '#71717a' }}>
                <span>Z {s.zScore}</span><span>RSI {s.rsi}</span><span>SMA ${s.sma.toLocaleString()}</span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#52525b' }}>{s.reason}</p>
            </div>
          ))
        )}

        {tab === 'positions' && (portfolio.positions.length === 0
          ? <Empty text="No open positions." />
          : portfolio.positions.map(p => (
            <div key={p.symbol} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{p.symbol}</span>
                <div style={{ fontSize: '0.7rem', color: '#71717a', marginTop: 2 }}>
                  {p.quantity} @ ${p.avgEntryPrice.toLocaleString()} → ${p.currentPrice.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 500, fontSize: '0.85rem', color: p.unrealizedPnl >= 0 ? '#4ade80' : '#f87171' }}>
                  {p.unrealizedPnl >= 0 ? '+' : ''}{p.unrealizedPnlPct.toFixed(2)}%
                </div>
                <button onClick={() => { setSelectedSymbol(p.symbol); setOrderSide('sell'); setQuantity(String(p.quantity)); }}
                  style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginTop: 2 }}>close</button>
              </div>
            </div>
          ))
        )}

        {tab === 'history' && (portfolio.history.length === 0
          ? <Empty text="No trades yet." />
          : portfolio.history.slice(0, 50).map((t, i) => (
            <div key={`${t.id}-${i}`} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #1e1e21', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span>
                <span style={{ color: t.side === 'buy' ? '#4ade80' : '#f87171', fontWeight: 500 }}>{t.side}</span>
                {' '}{t.quantity} {t.symbol} @ ${t.price.toLocaleString()}
              </span>
              <span style={{ color: '#52525b' }}>
                {t.pnl !== undefined && <span style={{ color: t.pnl >= 0 ? '#4ade80' : '#f87171', marginRight: 8 }}>{t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}</span>}
                {new Date(t.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}

        {tab === 'logs' && (logs.length === 0
          ? <Empty text="No logs." />
          : logs.map((l, i) => (
            <div key={i} style={{ padding: '3px 8px', fontSize: '0.68rem', color: l.level === 'error' ? '#f87171' : l.level === 'trade' ? '#4ade80' : l.level === 'warn' ? '#facc15' : '#52525b' }}>
              <span style={{ opacity: 0.5 }}>{new Date(l.timestamp).toLocaleTimeString()}</span> [{l.level}] {l.message}
            </div>
          ))
        )}
      </div>

      {/* Trade Form */}
      <div style={{ borderTop: '1px solid #27272a', paddingTop: 12, marginTop: 4 }}>
        <form onSubmit={submitOrder} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Field label="Symbol">
            <select value={selectedSymbol} onChange={e => setSelectedSymbol(e.target.value as CryptoSymbol)}
              style={{ width: 130, padding: '6px 8px' }}>
              {SYMBOLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Side">
            <select value={orderSide} onChange={e => setOrderSide(e.target.value as 'buy' | 'sell')}
              style={{ width: 80, padding: '6px 8px' }}>
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
          </Field>
          <Field label="Qty">
            <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)}
              style={{ width: 100, padding: '6px 8px' }} />
          </Field>
          <button type="submit" className="ts-button" style={{ margin: 0, padding: '6px 20px' }}>Execute</button>
        </form>
      </div>
    </div>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113' }}>
      <p style={{ margin: 0, fontSize: '0.65rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ margin: '3px 0 0', fontSize: '1rem', fontWeight: 500, color: color || '#fafafa' }}>{value}</p>
    </div>
  );
}

function Pill({ text, color }: { text: string; color: string }) {
  return <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 600, color, border: `1px solid ${color}33`, background: `${color}11`, textTransform: 'uppercase' }}>{text}</span>;
}

function Btn({ children, onClick, accent }: { children: React.ReactNode; onClick: () => void; accent?: boolean }) {
  return <button className="ts-button" onClick={onClick} style={{ margin: 0, padding: '5px 14px', fontSize: '0.75rem', ...(accent ? { borderColor: '#f8717133', color: '#f87171' } : {}) }}>{children}</button>;
}

function SignalBadge({ rec, confidence }: { rec: string; confidence: number }) {
  const c = rec.includes('buy') ? '#4ade80' : rec.includes('sell') ? '#f87171' : '#71717a';
  return <span style={{ fontSize: '0.65rem', fontWeight: 600, color: c }}>{rec.replace('_', ' ')} {confidence}%</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={{ display: 'block', fontSize: '0.65rem', color: '#71717a', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>{children}</div>;
}

function Empty({ text }: { text: string }) {
  return <p style={{ color: '#52525b', fontSize: '0.78rem', padding: '20px 0', textAlign: 'center' }}>{text}</p>;
}
