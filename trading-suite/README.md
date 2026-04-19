# Trading Suite (Standalone)

A self-contained Next.js trading simulation app built as an AI senior analyst gamified product. This is saved in `trading-suite/` as a separate project from the main Bloom Metabolics platform.

## Overview

- `/app/page.tsx` - landing page with link to trading dashboard
- `/app/trading/page.tsx` - main trading dashboard (uses `components/TradingDashboard`) 
- `/app/api/trading/route.ts` - GET returns portfolio + signals, POST executes simulated trades and updates in-memory portfolio
- `/lib/trading.ts` - core portfolio, trade rules, signals, and strategy insights

## Quick Start

1. `cd trading-suite`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Notes

- State is in-memory only and reset on server restart.
- No external auth required for this demo.
- To connect to real data, replace `SIMULATED_PRICES` with market API feeds and wire broker API in POST.
