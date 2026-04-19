#!/usr/bin/env npx tsx
/**
 * Bloom Metabolics — OpenClaw Pipeline Test Run
 *
 * Exercises the full lead workflow in-memory:
 *   webhook intake → normalization → qualification → outreach decision → booking handoff
 *
 * Uses the real Anthropic API for the qualifier agent.
 * No Docker/Postgres/Redis required — all in-memory.
 */

import Anthropic from '@anthropic-ai/sdk';
import { webhookLeadPayloadSchema, type WebhookLeadPayload, type LeadQualification } from './src/core/types.js';
import { normalizeWebhookPayload } from './src/webhooks/handlers.js';

// ── Load env ──
import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config({ path: path.join(path.dirname(process.argv[1] ?? '.'), '..', '.env.local') });

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not found in .env.local');
  process.exit(1);
}

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ── Colors ──
const G = '\x1b[32m';  // green
const Y = '\x1b[33m';  // yellow
const R = '\x1b[31m';  // red
const C = '\x1b[36m';  // cyan
const B = '\x1b[1m';   // bold
const D = '\x1b[2m';   // dim
const X = '\x1b[0m';   // reset

function log(icon: string, msg: string, detail?: string) {
  console.log(`  ${icon}  ${msg}${detail ? `  ${D}${detail}${X}` : ''}`);
}

function header(title: string) {
  console.log(`\n${B}${C}━━━ ${title} ━━━${X}`);
}

function pass(msg: string) { log('✅', `${G}${msg}${X}`); }
function fail(msg: string, err?: string) { log('❌', `${R}${msg}${X}`, err); }
function info(msg: string, detail?: string) { log('→', msg, detail); }
function warn(msg: string) { log('⚠️', `${Y}${msg}${X}`); }

// ── Test Leads ──
const TEST_LEADS: { name: string; data: Record<string, unknown>; source: string; expected: string }[] = [
  {
    name: 'HOT TRT Lead (Marcus)',
    source: 'form',
    expected: 'book_consult',
    data: {
      firstName: 'Marcus',
      lastName: 'Johnson',
      email: 'marcus.johnson@test.bloommetabolics.com',
      phone: '5125551234',
      state: 'TX',
      age: 38,
      serviceInterest: 'trt',
      goals: 'I want to improve my energy levels, focus, and get back to feeling strong. Experiencing fatigue, brain fog, and low libido.',
      symptoms: ['fatigue', 'low energy', 'brain fog', 'low libido', 'muscle loss'],
      consent: true,
      attribution: { utm_source: 'google', utm_campaign: 'trt_search' },
    },
  },
  {
    name: 'WARM GLP-1 Lead (Sarah)',
    source: 'ad_platform',
    expected: 'nurture_sequence',
    data: {
      first_name: 'Sarah',
      last_name: 'Chen',
      email: 'sarah.chen@test.bloommetabolics.com',
      phone_number: '3105559876',
      platform: 'facebook',
      campaign_id: 'glp1_spring',
    },
  },
  {
    name: 'COLD No-Consent Lead (Alex)',
    source: 'partner',
    expected: 'manual_review',
    data: {
      firstName: 'alex',
      lastName: 'rivera',
      email: 'ALEX.RIVERA@test.bloommetabolics.com',
      consent: false,
      partnerName: 'Equinox Downtown',
    },
  },
  {
    name: 'GHL Webhook Lead (David)',
    source: 'ghl',
    expected: 'book_consult',
    data: {
      contact: {
        id: 'ghl-test-abc-123',
        firstName: 'David',
        lastName: 'Park',
        email: 'david.park@test.bloommetabolics.com',
        phone: '+14155551234',
        state: 'CA',
        tags: ['trt-interest', 'high-intent'],
        source: 'Website Form',
        customField: { goals: 'Build muscle, improve energy, optimize hormones for peak performance' },
      },
      pipelineId: 'm57zaE23IRPcQ3EflzDV',
    },
  },
  {
    name: 'Disqualified Under-18 (Jake)',
    source: 'form',
    expected: 'disqualify',
    data: {
      firstName: 'Jake',
      lastName: 'Young',
      email: 'jake.young@test.bloommetabolics.com',
      state: 'FL',
      age: 16,
      serviceInterest: 'trt',
      consent: true,
    },
  },
];

// ── Qualifier Agent System Prompt (from lib/agents.ts) ──
const QUALIFIER_SYSTEM = `You are the Bloom Metabolics Qualifier Agent.

Your job:
1. Score inbound leads on a 1-100 scale based on ICP fit
2. Segment them: HOT (80-100), WARM (50-79), COLD (0-49)
3. Extract key data: name, email, phone, state, symptoms, goals
4. Flag disqualifiers: under 18, prohibited state, contraindications

ICP for Bloom Metabolics (TRT / GLP-1 telehealth):
- Male 25-60 for TRT, Male/Female 25-65 for GLP-1
- US-based (licensed states only)
- Symptoms: fatigue, low libido, weight gain, brain fog, muscle loss
- Has insurance or willing to pay cash ($149-299/mo)
- BMI > 27 for GLP-1 candidates

Return ONLY a JSON object (no markdown, no explanation):
{
  "score": number,
  "segment": "HOT" | "WARM" | "COLD",
  "name": string,
  "email": string,
  "phone": string,
  "state": string,
  "primary_interest": "TRT" | "GLP-1" | "BOTH",
  "symptoms": string[],
  "disqualifiers": string[],
  "next_action": "book_consult" | "nurture_sequence" | "disqualify",
  "reasoning": string
}`;

// ── Pipeline Steps ──

interface PipelineResult {
  step: string;
  status: 'pass' | 'fail' | 'skip';
  data: Record<string, unknown>;
  durationMs: number;
}

async function runPipeline(testCase: typeof TEST_LEADS[0]): Promise<PipelineResult[]> {
  const results: PipelineResult[] = [];

  // ── Step 1: Webhook Normalization ──
  const t1 = Date.now();
  const { payload, errors } = normalizeWebhookPayload(
    testCase.source as any,
    testCase.data
  );
  results.push({
    step: 'webhook_normalize',
    status: payload ? 'pass' : 'fail',
    data: payload ? { email: payload.email, source: payload.source } : { errors },
    durationMs: Date.now() - t1,
  });

  if (!payload) return results;

  // ── Step 2: Lead Intake (in-memory) ──
  const t2 = Date.now();
  const normalizedPhone = payload.phone?.replace(/\D/g, '');
  const lead = {
    id: crypto.randomUUID(),
    firstName: payload.firstName.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
    lastName: payload.lastName.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
    email: payload.email.toLowerCase().trim(),
    phone: normalizedPhone && normalizedPhone.length >= 10 ? `+1${normalizedPhone.slice(-10)}` : null,
    state: payload.state ?? null,
    age: payload.age ?? null,
    serviceInterest: payload.serviceInterest,
    goals: payload.goals ?? null,
    symptoms: payload.symptoms ?? [],
    consent: payload.consent,
    source: payload.source,
  };
  results.push({
    step: 'lead_intake',
    status: 'pass',
    data: { id: lead.id, name: `${lead.firstName} ${lead.lastName}`, email: lead.email, phone: lead.phone },
    durationMs: Date.now() - t2,
  });

  // ── Step 3: Qualification via Anthropic API (OpenClaw Skill Execution) ──
  const t3 = Date.now();
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: QUALIFIER_SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Qualify this lead:\n${JSON.stringify(lead, null, 2)}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const qualification = JSON.parse(jsonMatch[0]) as {
      score: number;
      segment: string;
      next_action: string;
      disqualifiers: string[];
      reasoning: string;
      symptoms: string[];
    };

    results.push({
      step: 'qualification_openclaw',
      status: 'pass',
      data: {
        score: qualification.score,
        segment: qualification.segment,
        next_action: qualification.next_action,
        disqualifiers: qualification.disqualifiers,
        reasoning: qualification.reasoning,
        model: 'claude-sonnet-4-20250514',
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
      durationMs: Date.now() - t3,
    });

    // ── Step 4: Outreach Decision ──
    const t4 = Date.now();
    if (!lead.consent) {
      results.push({
        step: 'outreach_decision',
        status: 'skip',
        data: { reason: 'Consent not opted in — outreach held', approvalRequired: false },
        durationMs: Date.now() - t4,
      });
    } else if (qualification.next_action === 'disqualify') {
      results.push({
        step: 'outreach_decision',
        status: 'skip',
        data: { reason: 'Lead disqualified — no outreach', disqualifiers: qualification.disqualifiers },
        durationMs: Date.now() - t4,
      });
    } else {
      const interest = lead.serviceInterest === 'trt' ? 'testosterone optimization'
        : lead.serviceInterest === 'glp1' ? 'medical weight management' : 'health optimization';
      const isBookConsult = qualification.next_action === 'book_consult';

      const outreach = {
        channel: 'email' as const,
        messageType: isBookConsult ? 'welcome_book_consult' : 'welcome_nurture',
        subject: isBookConsult
          ? `${lead.firstName}, your ${interest} consultation is ready`
          : `Welcome to Bloom Metabolics, ${lead.firstName}`,
        approvalRequired: true,
        approvalPolicy: 'auto_after_delay (30 min)',
      };

      results.push({
        step: 'outreach_decision',
        status: 'pass',
        data: outreach,
        durationMs: Date.now() - t4,
      });

      // ── Step 5: Booking Handoff ──
      if (isBookConsult) {
        const t5 = Date.now();
        const bookingUrl = `https://bloommetabolics.com/booking?name=${encodeURIComponent(lead.firstName)}&email=${encodeURIComponent(lead.email)}&service=${lead.serviceInterest}`;
        results.push({
          step: 'booking_handoff',
          status: 'pass',
          data: {
            bookingType: 'immediate',
            handoffMethod: 'booking_link',
            bookingUrl,
            ghlAppointmentCreated: false,
            note: 'GHL API not configured — using booking link fallback',
          },
          durationMs: Date.now() - t5,
        });
      }
    }
  } catch (err) {
    results.push({
      step: 'qualification_openclaw',
      status: 'fail',
      data: { error: err instanceof Error ? err.message : String(err) },
      durationMs: Date.now() - t3,
    });
  }

  return results;
}

// ── Main ──
async function main() {
  console.log(`\n${B}╔══════════════════════════════════════════════════════════╗${X}`);
  console.log(`${B}║  ${C}Bloom Metabolics — OpenClaw Pipeline Test Run${X}${B}                ║${X}`);
  console.log(`${B}║  ${D}Lead Intake → Qualify → Outreach → Booking${X}${B}              ║${X}`);
  console.log(`${B}╚══════════════════════════════════════════════════════════╝${X}\n`);

  info('Anthropic API Key', `${ANTHROPIC_API_KEY!.slice(0, 12)}...${ANTHROPIC_API_KEY!.slice(-4)}`);
  info('Model', 'claude-sonnet-4-20250514');
  info('Test leads', `${TEST_LEADS.length} scenarios`);

  let totalPass = 0;
  let totalFail = 0;
  let totalSkip = 0;
  const allResults: { name: string; results: PipelineResult[] }[] = [];

  for (const testCase of TEST_LEADS) {
    header(`${testCase.name}`);
    info('Source', testCase.source);
    info('Expected routing', testCase.expected);

    const results = await runPipeline(testCase);
    allResults.push({ name: testCase.name, results });

    for (const r of results) {
      const dur = `${r.durationMs}ms`;
      if (r.status === 'pass') {
        pass(`${r.step} ${D}(${dur})${X}`);
        totalPass++;
      } else if (r.status === 'fail') {
        fail(`${r.step} ${D}(${dur})${X}`, JSON.stringify(r.data));
        totalFail++;
      } else {
        warn(`${r.step} — SKIPPED ${D}(${dur})${X}`);
        info('Reason', JSON.stringify(r.data));
        totalSkip++;
      }

      // Print key data points
      if (r.data.score !== undefined) info('Score', `${r.data.score}/100 (${r.data.segment})`);
      if (r.data.next_action) info('Routing', String(r.data.next_action));
      if (r.data.reasoning) info('Reasoning', String(r.data.reasoning).slice(0, 120));
      if (r.data.disqualifiers && (r.data.disqualifiers as string[]).length > 0) warn(`Disqualifiers: ${(r.data.disqualifiers as string[]).join(', ')}`);
      if (r.data.subject) info('Email subject', String(r.data.subject));
      if (r.data.bookingUrl) info('Booking URL', String(r.data.bookingUrl));
      if (r.data.inputTokens) info('Tokens', `in=${r.data.inputTokens} out=${r.data.outputTokens}`);
    }
  }

  // ── Summary ──
  header('TEST RUN SUMMARY');
  console.log(`
  ${G}Passed:  ${totalPass}${X}
  ${R}Failed:  ${totalFail}${X}
  ${Y}Skipped: ${totalSkip}${X}
  ${D}Total:   ${totalPass + totalFail + totalSkip}${X}
`);

  // ── Audit Trail (simulated) ──
  header('AUDIT TRAIL');
  for (const { name, results } of allResults) {
    console.log(`\n  ${B}${name}${X}`);
    for (const r of results) {
      const icon = r.status === 'pass' ? '✓' : r.status === 'fail' ? '✗' : '○';
      const color = r.status === 'pass' ? G : r.status === 'fail' ? R : Y;
      console.log(`    ${color}${icon}${X} ${r.step} ${D}(${r.durationMs}ms)${X}`);
    }
  }

  console.log(`\n${B}${C}━━━ Test run complete ━━━${X}\n`);

  if (totalFail > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
