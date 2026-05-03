/**
 * Bloom Metabolics — Payment Provider Types
 * Shared types for the payment abstraction layer.
 */

export interface CheckoutSessionParams {
  mode: 'payment' | 'subscription'
  customerEmail: string
  priceId: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
  couponAmountOff?: number // cents
}

export interface CheckoutSessionResult {
  sessionId: string
  url: string | null
}

export interface InvoiceParams {
  customerId: string
  customerEmail: string
  lineItems: { description: string; amountCents: number }[]
  metadata?: Record<string, string>
  sendToCustomer: boolean
  markAsPaid: boolean
}

export interface InvoiceResult {
  invoiceId: string
  invoiceUrl: string | null
  status: string
}

export interface CustomerResult {
  customerId: string
  email: string
}

export interface PaymentProvider {
  name: string

  findOrCreateCustomer(email: string, name?: string, metadata?: Record<string, string>): Promise<CustomerResult>
  createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSessionResult>
  retrieveSession(sessionId: string): Promise<Record<string, unknown>>
  createInvoice(params: InvoiceParams): Promise<InvoiceResult>
  cancelSubscription(subscriptionId: string): Promise<{ cancelAt: string }>
  constructWebhookEvent(payload: Buffer, signature: string, secret: string): unknown
}
