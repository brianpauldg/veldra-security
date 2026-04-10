'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="ts-home">
      <h1>Trading Suite</h1>
      <p>Crypto and stock options bots.</p>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440, width: '100%' }}>
        <Link href="/trading" className="section" style={{
          textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', transition: 'border-color 0.15s',
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>Crypto Bot</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#71717a' }}>Mean reversion · Binance · 8 pairs</p>
          </div>
          <span style={{ color: '#71717a', fontSize: '0.85rem' }}>&rarr;</span>
        </Link>

        <Link href="/options" className="section" style={{
          textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', transition: 'border-color 0.15s',
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>Options Bot</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#71717a' }}>Spreads, iron condors, wheel · Alpaca · 10 tickers</p>
          </div>
          <span style={{ color: '#71717a', fontSize: '0.85rem' }}>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
