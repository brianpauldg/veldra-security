import './globals.css';
import type { ReactNode } from 'react';
import { Nav } from '@/components/Nav';

export const metadata = {
  title: 'Trading Suite - Crypto & Options Bot',
  description: 'Automated trading bots for crypto (Binance) and stock options (Alpaca).',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="ts-wrap">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
