import type { WebhookLeadPayload } from '../../src/core/types.js';

export const HOT_TRT_LEAD: WebhookLeadPayload = {
  source: 'form',
  firstName: 'Marcus',
  lastName: 'Johnson',
  email: 'marcus.johnson@example.com',
  phone: '5125551234',
  state: 'TX',
  age: 38,
  serviceInterest: 'trt',
  goals: 'I want to improve my energy levels, focus, and get back to feeling like I did in my 20s. Experiencing fatigue and brain fog.',
  symptoms: ['fatigue', 'low energy', 'brain fog', 'low libido'],
  consent: true,
  attribution: { utm_source: 'google', utm_campaign: 'trt_search', landingPage: '/trt' },
  metadata: {},
};

export const WARM_GLP1_LEAD: WebhookLeadPayload = {
  source: 'ad_platform',
  firstName: 'Sarah',
  lastName: 'Chen',
  email: 'sarah.chen@example.com',
  phone: '3105559876',
  state: 'CA',
  age: 42,
  serviceInterest: 'glp1',
  goals: 'Weight management',
  symptoms: ['weight gain'],
  consent: true,
  attribution: { platform: 'facebook', campaignId: 'glp1_spring_2024' },
  metadata: {},
};

export const COLD_NO_CONSENT_LEAD: WebhookLeadPayload = {
  source: 'partner',
  sourceId: 'gym-equinox-001',
  firstName: 'alex',
  lastName: 'rivera',
  email: 'ALEX.RIVERA@example.com',
  serviceInterest: 'mixed',
  consent: false,
  attribution: { partnerName: 'Equinox Downtown' },
  metadata: {},
};

export const DISQUALIFIED_UNDER_18: WebhookLeadPayload = {
  source: 'form',
  firstName: 'Jake',
  lastName: 'Young',
  email: 'jake.young@example.com',
  state: 'FL',
  age: 16,
  serviceInterest: 'trt',
  consent: true,
  attribution: {},
  metadata: {},
};

export const DISQUALIFIED_BAD_STATE: WebhookLeadPayload = {
  source: 'form',
  firstName: 'Test',
  lastName: 'Lead',
  email: 'test.lead@example.com',
  state: 'PR',
  age: 35,
  serviceInterest: 'trt',
  consent: true,
  attribution: {},
  metadata: {},
};

export const DUPLICATE_EMAIL_LEAD: WebhookLeadPayload = {
  source: 'ghl',
  sourceId: 'ghl-contact-12345',
  firstName: 'Marcus',
  lastName: 'Johnson',
  email: 'marcus.johnson@example.com',
  phone: '5125551234',
  state: 'TX',
  serviceInterest: 'trt',
  consent: true,
  attribution: { ghlSource: 'pipeline' },
  metadata: {},
};

export const GHL_WEBHOOK_RAW = {
  contact: {
    id: 'ghl-abc-123',
    firstName: 'David',
    lastName: 'Park',
    email: 'david.park@example.com',
    phone: '+14155551234',
    state: 'CA',
    tags: ['trt-interest', 'high-intent'],
    source: 'Website Form',
    customField: { goals: 'Build muscle and improve energy' },
  },
  pipelineId: 'm57zaE23IRPcQ3EflzDV',
};

export const INVALID_PAYLOAD = {
  firstName: '',
  email: 'not-an-email',
};
