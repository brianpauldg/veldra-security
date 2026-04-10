'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  OptionsSignal,
  OptionsPortfolio,
  OptionsBotMode,
  OptionsBotLog,
  StrategyType,
} from '@/lib/options-types';

interface DashboardData {
  portfolio: OptionsPortfolio;
  signals: OptionsSignal[];
  mode: OptionsBotMode;
  isRunning: boolean;
  watchlist: string[];
  lastCycleAt: string | null;
  cycleCount: number;
  logs: OptionsBotLog[];
}

const STRAT_COLOR: Record<StrategyType, string> = {
  long_call: '#4ade80', long_put: '#f87171', short_call: '#fb923c', short_put: '#a78bfa',
  bull_call_spread: '#4ade80', bear_put_spread: '#f87171', iron_condor: '#818cf8',
  strangle: '#22d3ee', cash_secured_put: '#c084fc', covered_call: '#60a5fa',
};

const STRAT_LABEL: Record<StrategyType, string> = {
  long_call: 'Long Call', long_put: 'Long Put', short_call: 'Short Call', short_put: 'Short Put',
  bull_call_spread: 'Bull Call Spread', bear_put_spread: 'Bear Put Spread', iron_condor: 'Iron Condor',
  strangle: 'Strangle', cash_secured_put: 'CSP', covered_call: 'Covered Call',
};

export function OptionsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<'signals' | 'positions' | 'history' | 'logs'>('signals');
  const [filter, setFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/options');
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
    const res = await fetch('/api/options-bot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...extra }) });
    const json = await res.json();
    setMessage(json.message || json.error || '');
    fetchData();
  };

  const executeSignal = async (signal: OptionsSignal) => {
    const res = await fetch('/api/options', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'execute', signal }) });
    const json = await res.json();
    setMessage(res.ok ? `Executed: ${signal.description}` : (json.error || 'Failed'));
    fetchData();
  };

  const closePosition = async (id: string) => {
    await fetch('/api/options', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'close', positionId: id }) });
    setMessage('Position closed');
    fetchData();
  };

  if (loading || !data) return <div style={{ display: 'grid', placeItems: 'center', minHeight: '50vh', color: '#71717a' }}>Loading...</div>;

  const { portfolio, signals, mode, isRunning, lastCycleAt, cycleCount, logs } = data;
  const filtered = filter === 'all' ? signals : signals.filter(s => s.strategy === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Options Bot</h1>
          <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#71717a' }}>
            Alpaca · {cycleCount} cycles{lastCycleAt && ` · ${new Date(lastCycleAt).toLocaleTimeString()}`}
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
          {(['auto', 'manual', 'paused'] as OptionsBotMode[]).map(m => (
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
        <Metric label="Positions" value={String(portfolio.optionsPositions.length)} />
        <Metric label="Signals" value={String(signals.length)} />
        <Metric label="Total P&L" value={`${portfolio.totalOptionsPnl >= 0 ? '+' : ''}$${portfolio.totalOptionsPnl.toFixed(2)}`} color={portfolio.totalOptionsPnl >= 0 ? '#4ade80' : '#f87171'} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #27272a' }}>
        {(['signals', 'positions', 'history', 'logs'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 14px', border: 'none', borderBottom: tab === t ? '2px solid #a78bfa' : '2px solid transparent',
            background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: '0.75rem', fontWeight: 500, color: tab === t ? '#fafafa' : '#71717a',
          }}>{t} ({t === 'signals' ? signals.length : t === 'positions' ? portfolio.optionsPositions.length : t === 'history' ? portfolio.history.length : logs.length})</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 150 }}>

        {tab === 'signals' && <>
          {/* Strategy filter chips */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
            <Chip label="all" active={filter === 'all'} onClick={() => setFilter('all')} />
            {Object.entries(STRAT_LABEL).map(([key, label]) => {
              const n = signals.filter(s => s.strategy === key).length;
              return n > 0 ? <Chip key={key} label={`${label} ${n}`} active={filter === key} onClick={() => setFilter(key)} /> : null;
            })}
          </div>

          {filtered.length === 0 ? <Empty text="No signals. Run a cycle." /> : filtered.map((s, i) => (
            <div key={`${s.underlying}-${s.strategy}-${i}`} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.underlying}</span>
                  <span style={{ fontSize: '0.68rem', color: '#71717a' }}>${s.underlyingPrice.toLocaleString()}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 600, color: STRAT_COLOR[s.strategy] || '#71717a', textTransform: 'uppercase' }}>
                    {STRAT_LABEL[s.strategy]}
                  </span>
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 500, color: s.confidence >= 70 ? '#4ade80' : s.confidence >= 50 ? '#facc15' : '#71717a' }}>{s.confidence}%</span>
              </div>

              <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#a1a1aa' }}>{s.description}</p>

              {/* Legs */}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                {s.legs.map((leg, j) => (
                  <span key={j} style={{
                    padding: '2px 6px', borderRadius: 3, fontSize: '0.65rem', fontWeight: 500,
                    color: leg.side === 'buy' ? '#4ade80' : '#f87171',
                    background: leg.side === 'buy' ? '#4ade8011' : '#f8717111',
                    border: `1px solid ${leg.side === 'buy' ? '#4ade8022' : '#f8717122'}`,
                  }}>
                    {leg.side} ${leg.strike}{leg.type === 'call' ? 'C' : 'P'} @{leg.price.toFixed(2)}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#52525b' }}>
                  exp return {s.expectedReturn}% · max risk {s.maxRisk > 0 ? `$${s.maxRisk.toLocaleString()}` : '∞'}
                </span>
                <button onClick={() => executeSignal(s)} style={{
                  background: 'none', border: '1px solid #27272a', borderRadius: 4, padding: '3px 12px',
                  color: '#a78bfa', fontSize: '0.68rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}>execute</button>
              </div>

              <p style={{ margin: '4px 0 0', fontSize: '0.65rem', color: '#3f3f46' }}>{s.reason}</p>
            </div>
          ))}
        </>}

        {tab === 'positions' && (portfolio.optionsPositions.length === 0
          ? <Empty text="No open positions." />
          : portfolio.optionsPositions.map(pos => (
            <div key={pos.id} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 500 }}>{pos.underlying}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 600, color: STRAT_COLOR[pos.strategy], textTransform: 'uppercase' }}>{STRAT_LABEL[pos.strategy]}</span>
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.85rem', color: pos.unrealizedPnl >= 0 ? '#4ade80' : '#f87171' }}>
                  {pos.unrealizedPnl >= 0 ? '+' : ''}${pos.unrealizedPnl.toFixed(2)} ({pos.unrealizedPnlPct}%)
                </span>
              </div>

              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                {pos.legs.map((leg, j) => (
                  <span key={j} style={{ padding: '2px 6px', borderRadius: 3, fontSize: '0.65rem', color: '#a1a1aa', background: '#18181b', border: '1px solid #27272a' }}>
                    {leg.side} ${leg.strike}{leg.type === 'call' ? 'C' : 'P'} | {leg.entryPrice.toFixed(2)} → {leg.currentPrice.toFixed(2)}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#52525b' }}>DTE {pos.daysToExpiry} · net ${pos.netEntryDebit.toFixed(2)}</span>
                <button onClick={() => closePosition(pos.id)} style={{
                  background: 'none', border: 'none', color: '#f87171', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit', padding: 0,
                }}>close</button>
              </div>
            </div>
          ))
        )}

        {tab === 'history' && (portfolio.history.length === 0
          ? <Empty text="No trades yet." />
          : portfolio.history.slice(0, 50).map((o, i) => (
            <div key={`${o.id}-${i}`} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #1e1e21', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span>
                <span style={{ color: STRAT_COLOR[o.strategy], fontWeight: 500, fontSize: '0.68rem', marginRight: 6 }}>{STRAT_LABEL[o.strategy]}</span>
                {o.underlying} · {o.legs.length} leg(s)
              </span>
              <span style={{ color: '#52525b' }}>
                <span style={{ color: o.totalCredit > o.totalDebit ? '#4ade80' : '#a1a1aa', marginRight: 8 }}>
                  {o.totalCredit > o.totalDebit ? `+$${(o.totalCredit - o.totalDebit).toFixed(2)}` : `-$${(o.totalDebit - o.totalCredit).toFixed(2)}`}
                </span>
                {new Date(o.createdAt).toLocaleTimeString()}
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
    </div>
  );
}

/* Subcomponents */

function Metric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #27272a', background: '#111113' }}>
      <p style={{ margin: 0, fontSize: '0.62rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
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

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} style={{
    padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    fontSize: '0.65rem', fontWeight: 500,
    background: active ? '#27272a' : 'transparent', color: active ? '#fafafa' : '#52525b',
  }}>{label}</button>;
}

function Empty({ text }: { text: string }) {
  return <p style={{ color: '#52525b', fontSize: '0.78rem', padding: '20px 0', textAlign: 'center' }}>{text}</p>;
}
