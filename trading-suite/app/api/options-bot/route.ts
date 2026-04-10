/**
 * Options Bot Control API
 * GET:  /api/options-bot -> full bot state
 * POST: /api/options-bot -> control (start, stop, mode, watchlist, cycle, fund)
 */

import {
  getOptionsBotState,
  startOptionsBot,
  stopOptionsBot,
  setOptionsMode,
  setOptionsWatchlist,
  setOptionsCash,
  runOptionsCycle,
} from '@/lib/options-bot';
import { OptionsBotMode } from '@/lib/options-types';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  try {
    return Response.json(getOptionsBotState());
  } catch (error) {
    console.error('Options bot GET error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    switch (body.action) {
      case 'start':
        startOptionsBot();
        return Response.json({ success: true, message: 'Options bot started' });

      case 'stop':
        stopOptionsBot();
        return Response.json({ success: true, message: 'Options bot stopped' });

      case 'mode':
        if (!['auto', 'manual', 'paused'].includes(body.mode)) {
          return Response.json({ error: 'Invalid mode' }, { status: 400 });
        }
        setOptionsMode(body.mode as OptionsBotMode);
        return Response.json({ success: true, message: `Mode set to ${body.mode}` });

      case 'watchlist':
        if (!Array.isArray(body.symbols)) {
          return Response.json({ error: 'symbols must be an array' }, { status: 400 });
        }
        setOptionsWatchlist(body.symbols);
        return Response.json({ success: true, message: 'Watchlist updated' });

      case 'fund':
        if (typeof body.amount !== 'number' || body.amount <= 0) {
          return Response.json({ error: 'Invalid amount' }, { status: 400 });
        }
        setOptionsCash(body.amount);
        return Response.json({ success: true, message: `Funded $${body.amount}` });

      case 'cycle':
        const signals = await runOptionsCycle();
        const state = getOptionsBotState();
        return Response.json({ success: true, signals, portfolio: state.portfolio });

      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Options bot POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
