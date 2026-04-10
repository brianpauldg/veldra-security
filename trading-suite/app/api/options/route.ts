/**
 * Options Trading API
 * GET:  /api/options -> bot state + signals + portfolio
 * POST: /api/options -> manual trade execution
 */

import { getOptionsBotState, manualOptionsExecute, closePosition } from '@/lib/options-bot';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  try {
    const state = getOptionsBotState();
    return Response.json({
      portfolio: state.portfolio,
      signals: state.signals,
      mode: state.mode,
      isRunning: state.isRunning,
      watchlist: state.watchlist,
      lastCycleAt: state.lastCycleAt,
      cycleCount: state.cycleCount,
      logs: state.logs.slice(0, 50),
    });
  } catch (error) {
    console.error('Options GET error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'execute' && body.signal) {
      const order = await manualOptionsExecute(body.signal);
      if (!order) return Response.json({ error: 'Execution failed' }, { status: 500 });
      const state = getOptionsBotState();
      return Response.json({ success: true, order, portfolio: state.portfolio }, { status: 201 });
    }

    if (action === 'close' && body.positionId) {
      closePosition(body.positionId, body.reason || 'Manual close');
      const state = getOptionsBotState();
      return Response.json({ success: true, portfolio: state.portfolio });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Options POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
