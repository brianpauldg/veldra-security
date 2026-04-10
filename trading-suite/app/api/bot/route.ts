/**
 * Bot Control API
 * GET:  /api/bot -> bot status
 * POST: /api/bot -> control bot (start, stop, mode, config, cycle)
 */

import {
  getBotState,
  startBot,
  stopBot,
  setBotMode,
  updateBotConfig,
  setPortfolioCash,
  runCycle,
} from '@/lib/bot';
import { BotMode } from '@/lib/types';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  try {
    const state = getBotState();
    return Response.json(state);
  } catch (error) {
    console.error('Bot GET error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'start':
        startBot();
        return Response.json({ success: true, message: 'Bot started' });

      case 'stop':
        stopBot();
        return Response.json({ success: true, message: 'Bot stopped' });

      case 'mode':
        if (!body.mode || !['auto', 'manual', 'paused'].includes(body.mode)) {
          return Response.json({ error: 'Invalid mode' }, { status: 400 });
        }
        setBotMode(body.mode as BotMode);
        return Response.json({ success: true, message: `Mode set to ${body.mode}` });

      case 'config':
        if (body.config) updateBotConfig(body.config);
        return Response.json({ success: true, message: 'Config updated' });

      case 'fund':
        if (typeof body.amount !== 'number' || body.amount <= 0) {
          return Response.json({ error: 'Invalid amount' }, { status: 400 });
        }
        setPortfolioCash(body.amount);
        return Response.json({ success: true, message: `Portfolio funded with $${body.amount}` });

      case 'cycle':
        const signals = await runCycle();
        const state = getBotState();
        return Response.json({ success: true, signals, portfolio: state.portfolio });

      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Bot POST error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
