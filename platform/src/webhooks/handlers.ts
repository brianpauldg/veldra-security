import { createLogger } from '../logger.js';
import { webhookLeadPayloadSchema, type WebhookLeadPayload, type WebhookSourceType, type JsonValue } from '../core/types.js';

const log = createLogger({ module: 'webhook-handlers' });

/**
 * Source-specific payload normalizers.
 * Each takes raw webhook body and returns a normalized WebhookLeadPayload.
 */
type PayloadNormalizer = (body: Record<string, unknown>) => WebhookLeadPayload;

const normalizers: Record<WebhookSourceType, PayloadNormalizer> = {
  ghl: normalizeGHL,
  form: normalizeForm,
  partner: normalizePartner,
  crm_import: normalizeGeneric,
  manual: normalizeGeneric,
  ad_platform: normalizeAdPlatform,
};

export function normalizeWebhookPayload(
  sourceType: WebhookSourceType,
  body: Record<string, unknown>
): { payload: WebhookLeadPayload | null; errors: string[] } {
  try {
    const normalizer = normalizers[sourceType] ?? normalizeGeneric;
    const raw = normalizer(body);
    const result = webhookLeadPayloadSchema.safeParse(raw);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      log.warn({ sourceType, errors }, 'Webhook payload validation failed');
      return { payload: null, errors };
    }

    return { payload: result.data, errors: [] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error({ sourceType, error: msg }, 'Webhook normalization error');
    return { payload: null, errors: [msg] };
  }
}

// ── GHL webhook format ──
function normalizeGHL(body: Record<string, unknown>): WebhookLeadPayload {
  // GHL sends contact data in a flat structure
  const contact = (body.contact ?? body) as Record<string, any>;
  return {
    source: 'ghl',
    sourceId: contact.id ?? contact.contactId ?? undefined,
    firstName: contact.firstName ?? contact.first_name ?? '',
    lastName: contact.lastName ?? contact.last_name ?? '',
    email: contact.email ?? '',
    phone: contact.phone ?? contact.phoneNumber ?? undefined,
    state: contact.state ?? contact.address?.state ?? undefined,
    age: contact.age ? parseInt(contact.age) : undefined,
    serviceInterest: mapGHLInterest(contact.tags ?? []),
    goals: contact.customField?.goals ?? undefined,
    symptoms: [],
    consent: true, // GHL contacts have opted in via form
    attribution: {
      ghlSource: contact.source ?? null,
      ghlTags: contact.tags ?? [],
      ghlPipelineId: body.pipelineId ?? null,
    },
    metadata: { raw_ghl_id: contact.id },
  };
}

function mapGHLInterest(tags: string[]): 'trt' | 'glp1' | 'peptides' | 'mixed' {
  const lower = tags.map((t: string) => t.toLowerCase());
  if (lower.some((t) => t.includes('trt') || t.includes('testosterone'))) return 'trt';
  if (lower.some((t) => t.includes('glp') || t.includes('weight') || t.includes('semaglutide'))) return 'glp1';
  if (lower.some((t) => t.includes('peptide') || t.includes('bpc'))) return 'peptides';
  return 'mixed';
}

// ── Standard form submission ──
function normalizeForm(body: Record<string, unknown>): WebhookLeadPayload {
  return {
    source: 'form',
    firstName: String(body.firstName ?? body.first_name ?? ''),
    lastName: String(body.lastName ?? body.last_name ?? ''),
    email: String(body.email ?? ''),
    phone: body.phone ? String(body.phone) : undefined,
    state: body.state ? String(body.state) : undefined,
    serviceInterest: (body.serviceInterest as any) ?? 'mixed',
    goals: body.goals ? String(body.goals) : undefined,
    symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
    consent: body.consent === true || body.consent === 'true',
    attribution: { formId: body.formId ?? null, pageUrl: body.pageUrl ?? null },
    metadata: {},
  };
}

// ── Partner referral (gym, clinic) ──
function normalizePartner(body: Record<string, unknown>): WebhookLeadPayload {
  return {
    source: 'partner',
    sourceId: body.partnerId ? String(body.partnerId) : undefined,
    firstName: String(body.firstName ?? ''),
    lastName: String(body.lastName ?? ''),
    email: String(body.email ?? ''),
    phone: body.phone ? String(body.phone) : undefined,
    serviceInterest: (body.serviceInterest as any) ?? 'mixed',
    symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
    consent: body.consent === true,
    attribution: {
      partnerName: body.partnerName ?? null,
      partnerId: body.partnerId ?? null,
      referralCode: body.referralCode ?? null,
    },
    metadata: {},
  };
}

// ── Ad platform (Facebook, Google) ──
function normalizeAdPlatform(body: Record<string, unknown>): WebhookLeadPayload {
  // Facebook Lead Ads format
  const leadData = (body.field_data ?? body) as Record<string, any>;
  return {
    source: 'ad_platform',
    sourceId: body.leadgen_id ? String(body.leadgen_id) : undefined,
    firstName: String(leadData.first_name ?? leadData.firstName ?? ''),
    lastName: String(leadData.last_name ?? leadData.lastName ?? ''),
    email: String(leadData.email ?? ''),
    phone: leadData.phone_number ?? leadData.phone ?? undefined,
    serviceInterest: 'mixed',
    symptoms: [],
    consent: true, // Ad leads consent via platform
    attribution: {
      platform: body.platform ?? 'unknown',
      campaignId: body.campaign_id ?? null,
      adSetId: body.adset_id ?? null,
      adId: body.ad_id ?? null,
    },
    metadata: {},
  };
}

// ── Generic / manual / CRM import ──
function normalizeGeneric(body: Record<string, unknown>): WebhookLeadPayload {
  return {
    source: (body.source as any) ?? 'manual',
    firstName: String(body.firstName ?? ''),
    lastName: String(body.lastName ?? ''),
    email: String(body.email ?? ''),
    phone: body.phone ? String(body.phone) : undefined,
    serviceInterest: (body.serviceInterest as any) ?? 'mixed',
    symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
    consent: body.consent === true,
    attribution: {},
    metadata: (body.metadata as Record<string, unknown>) ?? {},
  };
}
