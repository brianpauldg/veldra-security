/**
 * Trading API
 * GET:  /api/trading -> bot state + signals + portfolio
 * POST: /api/trading -> manual trade order
 */

import { getBotState, manualTrade } from '@/lib/bot';
import { CryptoSymbol } from '@/lib/types';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  try {
    const state = getBotState();
    return Response.json({
      portfolio: state.portfolio,
      signals: state.signals,
      mode: state.mode,
      isRunning: state.isRunning,
      lastCycleAt: state.lastCycleAt,
      cycleCount: state.cycleCount,
      logs: state.logs.slice(0, 50),
    });
  } catch (error) {
    console.error('Trading GET error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { symbol, side, quantity } = body;

    if (!symbol || !side || !quantity) {
      return Response.json({ error: 'Missing symbol, side, or quantity' }, { status: 400 });
    }

    const order = await manualTrade(symbol as CryptoSymbol, side, Number(quantity));

    if (!order) {
      return Response.json({ error: 'Trade execution failed' }, { status: 500 });
    }

    const state = getBotState();
    return Response.json({ success: true, order, portfolio: state.portfolio }, { status: 201 });
  } catch (error) {
    console.error('Trading POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
